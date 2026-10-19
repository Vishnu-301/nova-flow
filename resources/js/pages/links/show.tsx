import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Check,
    Copy,
    Image as ImageIcon,
    PackageSearch,
    Search,
    Share2,
    Tag,
    X,
} from 'lucide-react';
import { useMemo, useState, useSyncExternalStore } from 'react';
import { toast } from 'sonner';
import AppLogo from '@/components/app-logo';
import { formatCurrency } from '@/lib/utils';

interface CategoryProps {
    id: number;
    name: string;
}

interface ProductProps {
    id: number;
    name: string;
    slug?: string;
    description: string | null;
    price: number | string;
    discount?: number | string | null;
    stock_quantity: number;
    image: string | null;
    categories?: CategoryProps[];
}

interface PaginatedProducts {
    data: ProductProps[];
    current_page?: number;
    last_page?: number;
    total?: number;
    next_page_url?: string | null;
    prev_page_url?: string | null;
}

interface ShowLinkProps {
    link: {
        id: number;
        name: string;
        slug: string;
        directory?: string;
    };
    categories: CategoryProps[];
    selectedProduct?: ProductProps | null;
    products: ProductProps[] | PaginatedProducts;
}

const subscribe = () => () => { };
const getCanShare = () => typeof navigator !== 'undefined' && typeof navigator.share === 'function';
const getServerSnapshot = () => false;

export default function ShowLink({
    link,
    categories = [],
    selectedProduct = null,
    products,
}: ShowLinkProps) {
    const productList = useMemo(() => {
        if (Array.isArray(products)) {
            return products;
        }

        return products?.data ?? [];
    }, [products]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'all'>('all');
    const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
    const [copiedProductId, setCopiedProductId] = useState<number | null>(null);
    const canShare = useSyncExternalStore(
        subscribe,
        getCanShare,
        getServerSnapshot,
    );

    const handleImageError = (productId: number) => {
        setFailedImages((prev) => ({ ...prev, [productId]: true }));
    };

    const getProductSlug = (product: ProductProps): string => {
        if (product.slug && product.slug.trim() !== '') {
            return product.slug;
        }

        return product.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const getProductShareUrl = (product: ProductProps) => {
        const productSlug = getProductSlug(product);

        if (typeof window === 'undefined') {
            return `/${link.slug}/${productSlug}`;
        }

        return `${window.location.origin}/${link.slug}/${productSlug}`;
    };

    const getProductImageUrl = (imagePath: string | null) => {
        if (!imagePath) {
            return null;
        }

        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }

        if (typeof window === 'undefined') {
            return imagePath;
        }

        const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

        return `${window.location.origin}${cleanPath}`;
    };

    const handleCopyProduct = async (product: ProductProps) => {
        const shareUrl = getProductShareUrl(product);
        const imageUrl = getProductImageUrl(product.image);
        const priceText = `₦${formatCurrency(product.price)}`;
        const discountText =
            product.discount && Number(product.discount) > 0
                ? ` (Original: ₦${formatCurrency(product.discount)})`
                : '';
        const categoryText =
            product.categories && product.categories.length > 0
                ? `Category: ${product.categories.map((c) => c.name).join(', ')}`
                : '';

        const plainTextLines = [
            `${product.name}`,
            `Price: ${priceText}${discountText}`,
            categoryText,
            product.description ? `${product.description}` : '',
            imageUrl ? `Picture: ${imageUrl}` : '',
            `🔗 View Product: ${shareUrl}`,
        ].filter(Boolean);

        const plainText = plainTextLines.join('\n\n');

        const htmlText = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff;">
    ${imageUrl ? `<div style="margin-bottom: 12px;"><img src="${imageUrl}" alt="${product.name}" style="width: 100%; max-height: 280px; object-fit: cover; border-radius: 8px;" /></div>` : ''}
    <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 700; color: #111827;">${product.name}</h2>
    <p style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #047857;">
        ${priceText}
        ${product.discount && Number(product.discount) > 0 ? `<span style="font-size: 13px; color: #9ca3af; text-decoration: line-through; font-weight: normal; margin-left: 6px;">₦${formatCurrency(product.discount)}</span>` : ''}
    </p>
    ${product.description ? `<p style="margin: 0 0 12px 0; font-size: 14px; color: #4b5563; line-height: 1.5;">${product.description}</p>` : ''}
    <p style="margin: 0;"><a href="${shareUrl}" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">View Product</a></p>
</div>`.trim();

        let copied = false;

        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            try {
                if (typeof ClipboardItem !== 'undefined') {
                    const clipboardItem = new ClipboardItem({
                        'text/plain': new Blob([plainText], { type: 'text/plain' }),
                        'text/html': new Blob([htmlText], { type: 'text/html' }),
                    });
                    await navigator.clipboard.write([clipboardItem]);
                    copied = true;
                } else {
                    await navigator.clipboard.writeText(plainText);
                    copied = true;
                }
            } catch {
                try {
                    await navigator.clipboard.writeText(plainText);
                    copied = true;
                } catch {
                    copied = false;
                }
            }
        }

        if (!copied && typeof document !== 'undefined') {
            const textarea = document.createElement('textarea');
            textarea.value = plainText;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();

            try {
                document.execCommand('copy');
                copied = true;
            } catch {
                copied = false;
            }

            document.body.removeChild(textarea);
        }

        setCopiedProductId(product.id);
        setTimeout(() => {
            setCopiedProductId((prev) => (prev === product.id ? null : prev));
        }, 2500);

        toast.success('Product copied! Link, picture, and details are ready to share.');
    };

    const handleShareProduct = async (product: ProductProps) => {
        const shareUrl = getProductShareUrl(product);
        const priceText = `₦${formatCurrency(product.price)}`;

        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: `${product.name} - ${priceText}${product.description ? `\n${product.description}` : ''}`,
                    url: shareUrl,
                });
            } catch {
                // User cancelled or unsupported, fallback to copy
                handleCopyProduct(product);
            }
        } else {
            handleCopyProduct(product);
        }
    };

    const filteredProducts = useMemo(() => {
        return productList.filter((product) => {
            const matchesSearch =
                searchQuery === '' ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description &&
                    product.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()));

            const matchesCategory =
                selectedCategoryId === 'all' ||
                (product.categories &&
                    product.categories.some(
                        (cat) => cat.id === selectedCategoryId,
                    ));

            return matchesSearch && matchesCategory;
        });
    }, [productList, searchQuery, selectedCategoryId]);

    // Single Product View Mode
    if (selectedProduct) {
        const isImageFailed = failedImages[selectedProduct.id];
        const hasValidImage = selectedProduct.image && !isImageFailed;
        const isLowStock =
            selectedProduct.stock_quantity > 0 &&
            selectedProduct.stock_quantity <= 5;
        const isOutOfStock = selectedProduct.stock_quantity <= 0;
        const isCopied = copiedProductId === selectedProduct.id;
        const shareUrl = getProductShareUrl(selectedProduct);
        const imageUrl = getProductImageUrl(selectedProduct.image);

        return (
            <>
                <Head title={`${selectedProduct.name} - ${link.name}`}>
                    <meta property="og:title" content={`${selectedProduct.name} - ${link.name}`} />
                    <meta
                        property="og:description"
                        content={
                            selectedProduct.description ||
                            `₦${formatCurrency(selectedProduct.price)} - Available in ${link.name}`
                        }
                    />
                    {imageUrl && <meta property="og:image" content={imageUrl} />}
                    <meta property="og:url" content={shareUrl} />
                    <meta property="og:type" content="product" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={`${selectedProduct.name} - ${link.name}`} />
                    <meta
                        name="twitter:description"
                        content={
                            selectedProduct.description ||
                            `₦${formatCurrency(selectedProduct.price)} - Available in ${link.name}`
                        }
                    />
                    {imageUrl && <meta name="twitter:image" content={imageUrl} />}
                </Head>

                <div className="min-h-screen bg-nf-bg text-nf-text">
                    {/* Header */}
                    <header className="sticky top-0 z-30 border-b border-nf-line/70 bg-white/95 backdrop-blur-md">
                        <div className="mx-auto flex max-w-7xl min-w-0 items-center justify-between gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
                            <div className="flex min-w-0 items-center gap-3">
                                <AppLogo />
                                <span className="min-w-0 truncate font-extrabold tracking-tight text-nf-ink">
                                    {link.name}
                                </span>
                            </div>

                            <Link
                                href={`/${link.slug}`}
                                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-nf-line bg-white px-3.5 py-2 text-xs font-bold text-nf-ink shadow-xs transition-all hover:border-nf-dark-green hover:bg-nf-bg sm:text-sm"
                            >
                                <ArrowLeft className="size-3.5 sm:size-4" />
                                <span>Browse collection</span>
                            </Link>
                        </div>
                    </header>

                    <main className="mx-auto max-w-5xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
                        {/* Navigation pill */}
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <Link
                                href={`/${link.slug}`}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-nf-muted transition-colors hover:text-nf-ink sm:text-sm"
                            >
                                <ArrowLeft className="size-4" />
                                <span>All products in {link.name}</span>
                            </Link>

                            <span className="rounded-full bg-nf-green-light/80 px-3 py-1 text-xs font-bold text-nf-dark-green">
                                Single product view
                            </span>
                        </div>

                        {/* Product Card */}
                        <div className="overflow-hidden rounded-3xl border border-nf-line/70 bg-white shadow-[0_12px_32px_rgba(20,18,27,.06)] lg:grid lg:grid-cols-12">
                            {/* Product Image Column */}
                            <div className="relative aspect-square w-full overflow-hidden bg-nf-green-light/30 lg:col-span-5 lg:aspect-auto lg:min-h-[460px]">
                                {hasValidImage ? (
                                    <img
                                        src={selectedProduct.image!}
                                        alt={selectedProduct.name}
                                        onError={() => handleImageError(selectedProduct.id)}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full min-h-[300px] w-full flex-col items-center justify-center bg-linear-to-br from-nf-green-light/60 to-emerald-100/40 p-6 text-nf-dark-green">
                                        <div className="flex size-16 items-center justify-center rounded-2xl bg-white text-nf-dark-green shadow-xs">
                                            <ImageIcon className="size-8 opacity-75" />
                                        </div>
                                        <span className="mt-3 text-sm font-semibold text-nf-muted">
                                            No image available
                                        </span>
                                    </div>
                                )}

                                {/* Stock status overlay */}
                                <div className="absolute right-4 top-4">
                                    {isOutOfStock ? (
                                        <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-extrabold text-white shadow-xs">
                                            Out of stock
                                        </span>
                                    ) : isLowStock ? (
                                        <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-extrabold text-white shadow-xs">
                                            Only {selectedProduct.stock_quantity} left
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-extrabold text-white shadow-xs">
                                            In stock
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Product Details Column */}
                            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7 lg:p-10">
                                <div>
                                    {/* Categories */}
                                    {selectedProduct.categories &&
                                        selectedProduct.categories.length > 0 && (
                                            <div className="mb-4 flex flex-wrap items-center gap-2">
                                                {selectedProduct.categories.map((cat) => (
                                                    <span
                                                        key={cat.id}
                                                        className="inline-flex items-center gap-1.5 rounded-full border border-nf-line/80 bg-nf-bg px-3 py-1 text-xs font-bold text-nf-ink"
                                                    >
                                                        <Tag className="size-3 text-nf-dark-green" />
                                                        <span>{cat.name}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                    {/* Title */}
                                    <h1 className="text-2xl font-extrabold tracking-tight text-nf-ink sm:text-3xl">
                                        {selectedProduct.name}
                                    </h1>

                                    {/* Pricing & Savings */}
                                    <div className="mt-4 flex flex-wrap items-baseline gap-3">
                                        <span className="text-3xl font-black tracking-tight text-nf-ink sm:text-4xl">
                                            ₦{formatCurrency(selectedProduct.price)}
                                        </span>
                                        {selectedProduct.discount &&
                                            Number(selectedProduct.discount) > 0 && (
                                                <>
                                                    <span className="text-base font-bold text-nf-muted line-through sm:text-lg">
                                                        ₦{formatCurrency(selectedProduct.discount)}
                                                    </span>
                                                    {Number(selectedProduct.discount) > Number(selectedProduct.price) && (
                                                        <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                                                            Save ₦{formatCurrency(Number(selectedProduct.discount) - Number(selectedProduct.price))}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                    </div>

                                    {/* Description */}
                                    {selectedProduct.description && (
                                        <div className="mt-6 border-t border-nf-line/60 pt-6">
                                            <h2 className="text-xs font-bold uppercase tracking-wider text-nf-muted">
                                                Description
                                            </h2>
                                            <p className="mt-2 text-sm leading-relaxed text-nf-text whitespace-pre-line sm:text-base">
                                                {selectedProduct.description}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 border-t border-nf-line/60 pt-6">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleCopyProduct(selectedProduct)}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-nf-ink px-6 py-3.5 text-sm font-bold text-white shadow-xs transition-all hover:bg-nf-dark-green focus:outline-none focus:ring-2 focus:ring-nf-green/60"
                                        >
                                            {isCopied ? (
                                                <>
                                                    <Check className="size-4 text-emerald-400" />
                                                    <span>Product Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="size-4" />
                                                    <span>Copy Product</span>
                                                </>
                                            )}
                                        </button>

                                        {canShare && (
                                            <button
                                                type="button"
                                                onClick={() => handleShareProduct(selectedProduct)}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-nf-line bg-white px-5 py-3.5 text-sm font-bold text-nf-text shadow-xs transition-all hover:border-nf-dark-green hover:text-nf-ink"
                                            >
                                                <Share2 className="size-4 text-nf-muted" />
                                                <span>Share</span>
                                            </button>
                                        )}

                                        <Link
                                            href={`/${link.slug}`}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-transparent px-4 py-3.5 text-sm font-bold text-nf-muted transition-all hover:text-nf-ink sm:ml-auto"
                                        >
                                            Browse collection →
                                        </Link>
                                    </div>

                                    {isCopied && (
                                        <p className="mt-3 text-xs font-semibold text-emerald-600">
                                            ✓ Product link, picture, and details copied to clipboard! Ready to share.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    // Collection Grid View Mode (All products in the link collection)
    return (
        <>
            <Head title={link.name} />

            <div className="min-h-screen bg-nf-bg text-nf-text">
                {/* Public Header */}
                <header className="sticky top-0 z-30 border-b border-nf-line/70 bg-white/95 backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl min-w-0 items-center gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
                        <AppLogo />
                        <span className="min-w-0 truncate font-extrabold tracking-tight text-nf-ink">
                            {link.name}
                        </span>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
                    {/* Filter & Search Bar */}
                    <div className="mb-6 flex min-w-0 flex-col gap-4 sm:mb-8 lg:flex-row lg:items-center lg:justify-between">
                        {/* Search Input */}
                        <div className="relative w-full max-w-full lg:max-w-md">
                            <Search className="pointer-events-none absolute inset-y-0 left-3.5 my-auto size-4 text-nf-muted" />
                            <input
                                type="text"
                                placeholder="Search products in this collection..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-11 w-full rounded-xl border border-nf-line bg-white pl-10 pr-9 text-sm text-nf-text outline-none placeholder:text-nf-muted transition-all focus:border-nf-dark-green focus:ring-2 focus:ring-nf-green/60"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-3 my-auto flex size-5 items-center justify-center rounded-full text-nf-muted hover:text-nf-text"
                                >
                                    <X className="size-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Category Filter Pills if more than 1 category */}
                        {categories.length > 1 && (
                            <div className="flex min-w-0 flex-wrap items-center gap-2 pb-1 sm:pb-0">
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategoryId('all')}
                                    className={
                                        selectedCategoryId === 'all'
                                            ? 'rounded-full bg-nf-ink px-4 py-2 text-xs font-extrabold text-white shadow-xs transition-all'
                                            : 'rounded-full border border-nf-line bg-white px-4 py-2 text-xs font-bold text-nf-text transition-all hover:border-nf-dark-green'
                                    }
                                >
                                    All ({productList.length})
                                </button>
                                {categories.map((cat) => {
                                    const isSelected = selectedCategoryId === cat.id;
                                    const count = productList.filter(
                                        (p) =>
                                            p.categories &&
                                            p.categories.some((c) => c.id === cat.id),
                                    ).length;

                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => setSelectedCategoryId(cat.id)}
                                            className={
                                                isSelected
                                                    ? 'rounded-full bg-nf-ink px-4 py-2 text-xs font-extrabold text-white shadow-xs transition-all'
                                                    : 'rounded-full border border-nf-line bg-white px-4 py-2 text-xs font-bold text-nf-text transition-all hover:border-nf-dark-green'
                                            }
                                        >
                                            {cat.name} ({count})
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
                        <section className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
                            {filteredProducts.map((product) => {
                                const isImageFailed = failedImages[product.id];
                                const hasValidImage = product.image && !isImageFailed;
                                const isLowStock =
                                    product.stock_quantity > 0 &&
                                    product.stock_quantity <= 5;
                                const isOutOfStock = product.stock_quantity <= 0;
                                const isCopied = copiedProductId === product.id;
                                const productSlug = getProductSlug(product);
                                const singleProductUrl = `/${link.slug}/${productSlug}`;

                                return (
                                    <article
                                        key={product.id}
                                        className="group relative flex min-w-0 flex-col overflow-hidden rounded-[var(--radius)] border border-nf-line/50 bg-white shadow-[0_10px_24px_rgba(20,18,27,.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(20,18,27,.08)]"
                                    >
                                        {/* Product Image Container */}
                                        <Link
                                            href={singleProductUrl}
                                            className="relative aspect-[4/3] w-full overflow-hidden bg-nf-green-light/40"
                                        >
                                            {hasValidImage ? (
                                                <img
                                                    src={product.image!}
                                                    alt={product.name}
                                                    onError={() =>
                                                        handleImageError(product.id)
                                                    }
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-nf-green-light/60 to-emerald-100/40 p-4 text-nf-dark-green">
                                                    <div className="flex size-14 items-center justify-center rounded-2xl bg-white text-nf-dark-green shadow-xs">
                                                        <ImageIcon className="size-7 opacity-75" />
                                                    </div>
                                                    <span className="mt-2 text-xs font-semibold text-nf-muted">
                                                        No image available
                                                    </span>
                                                </div>
                                            )}

                                            {/* Status Badges */}
                                            <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                                                {product.categories &&
                                                    product.categories.length > 0 && (
                                                        <span className="inline-flex max-w-[130px] items-center gap-1 truncate rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-nf-text shadow-xs backdrop-blur-md">
                                                            <Tag className="size-3 shrink-0 text-nf-dark-green" />
                                                            <span className="truncate">
                                                                {product.categories[0].name}
                                                            </span>
                                                        </span>
                                                    )}

                                                <div className="ml-auto flex items-center gap-1">
                                                    {isOutOfStock ? (
                                                        <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-extrabold text-white shadow-xs">
                                                            Out of stock
                                                        </span>
                                                    ) : isLowStock ? (
                                                        <span className="rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-extrabold text-white shadow-xs">
                                                            Only {product.stock_quantity} left
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex flex-1 flex-col p-4 sm:p-5">
                                            <Link
                                                href={singleProductUrl}
                                                className="line-clamp-1 font-bold text-nf-ink transition-colors group-hover:text-nf-dark-green"
                                            >
                                                {product.name}
                                            </Link>

                                            {product.description && (
                                                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-nf-muted">
                                                    {product.description}
                                                </p>
                                            )}

                                            {/* Price & Copy Button Bar */}
                                            <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-nf-line/40">
                                                <div className="flex flex-col">
                                                    <span className="text-base font-black tracking-tight text-nf-ink sm:text-lg">
                                                        ₦{formatCurrency(product.price)}
                                                    </span>
                                                    {product.discount &&
                                                        Number(product.discount) > 0 && (
                                                            <span className="text-xs font-bold text-nf-muted line-through">
                                                                ₦{formatCurrency(product.discount)}
                                                            </span>
                                                        )}
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleCopyProduct(product)}
                                                    aria-label={`Copy ${product.name}`}
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-nf-line bg-white px-3 py-1.5 text-xs font-bold text-nf-ink shadow-xs transition-all hover:border-nf-dark-green hover:bg-nf-green-light/30 focus:outline-none"
                                                >
                                                    {isCopied ? (
                                                        <>
                                                            <Check className="size-3.5 text-emerald-600" />
                                                            <span className="text-emerald-700">Copied!</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="size-3.5 text-nf-muted" />
                                                            <span>Copy Product</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </section>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-nf-line bg-white p-12 text-center shadow-xs">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-nf-bg text-nf-muted">
                                <PackageSearch className="size-7" />
                            </div>
                            <h2 className="mt-4 text-lg font-bold text-nf-ink">
                                No products found
                            </h2>
                            <p className="mt-1 max-w-sm text-sm text-nf-muted">
                                {searchQuery || selectedCategoryId !== 'all'
                                    ? 'No products matched your search or category filter.'
                                    : 'There are currently no products available in the selected categories for this link.'}
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
