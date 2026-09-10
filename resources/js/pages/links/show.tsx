import { Head, Link, usePage } from '@inertiajs/react';
import {
    BoxesIcon,
    Image as ImageIcon,
    PackageSearch,
    Search,
    Tag,
    X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import AppLogo from '@/components/app-logo';
import { dashboard } from '@/routes';

interface CategoryProps {
    id: number;
    name: string;
}

interface ProductProps {
    id: number;
    name: string;
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
    };
    categories: CategoryProps[];
    products: ProductProps[] | PaginatedProducts;
}

export default function ShowLink({
    link,
    categories = [],
    products,
}: ShowLinkProps) {
    const { auth } = usePage().props as { auth?: { user?: unknown } };

    const productList = useMemo(() => {
        if (Array.isArray(products)) {
            return products;
        }

        return products?.data ?? [];
    }, [products]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'all'>('all');
    const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

    const handleImageError = (productId: number) => {
        setFailedImages((prev) => ({ ...prev, [productId]: true }));
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

    const formatCurrency = (val: number | string) => {
        const num = typeof val === 'string' ? parseFloat(val) : val;

        return isNaN(num)
            ? '0.00'
            : num.toLocaleString('en-NG', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
    };

    return (
        <>
            <Head title={link.name} />

            <div className="min-h-screen bg-nf-bg text-nf-text">
                {/* Public Header */}
                <header className="sticky top-0 z-30 border-b border-nf-line/70 bg-white/95 backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3">
                            <AppLogo />
                            <span className="hidden font-extrabold tracking-tight text-nf-ink sm:inline">
                                {link.name}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center gap-2 rounded-xl border border-nf-line bg-white px-4 py-2 text-xs font-bold text-nf-text shadow-xs transition-colors hover:bg-nf-bg"
                                >
                                    <BoxesIcon className="size-4" />
                                    Dashboard
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Filter & Search Bar */}
                    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
                            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
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
                        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredProducts.map((product) => {
                                const isImageFailed = failedImages[product.id];
                                const hasValidImage = product.image && !isImageFailed;
                                const isLowStock =
                                    product.stock_quantity > 0 &&
                                    product.stock_quantity <= 5;
                                const isOutOfStock = product.stock_quantity <= 0;

                                return (
                                    <article
                                        key={product.id}
                                        className="group relative flex flex-col overflow-hidden rounded-[var(--radius)] border border-nf-line/50 bg-white shadow-[0_10px_24px_rgba(20,18,27,.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(20,18,27,.08)]"
                                    >
                                        {/* Product Image Container */}
                                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-nf-green-light/40">
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
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex flex-1 flex-col p-4 sm:p-5">
                                            <h3 className="line-clamp-1 font-bold text-nf-ink group-hover:text-nf-dark-green">
                                                {product.name}
                                            </h3>

                                            {product.description && (
                                                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-nf-muted">
                                                    {product.description}
                                                </p>
                                            )}

                                            <div className="mt-auto pt-4">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-lg font-black tracking-tight text-nf-ink">
                                                        ₦{formatCurrency(product.price)}
                                                    </span>
                                                    {product.discount &&
                                                        Number(product.discount) > 0 && (
                                                            <span className="text-xs font-bold text-nf-muted line-through">
                                                                ₦{formatCurrency(product.discount)}
                                                            </span>
                                                        )}
                                                </div>
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
