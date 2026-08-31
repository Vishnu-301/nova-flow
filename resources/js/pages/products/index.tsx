import { Head, Link } from '@inertiajs/react';
import {
    Plus,
    Search,
    Package,
    PackageSearch,
    Tag,
    Image as ImageIcon,
    AlertCircle,
    X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { create as productsCreate } from '@/routes/products';

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

export default function Products({
    categories = [],
    products = [],
}: {
    categories: CategoryProps[];
    products: ProductProps[];
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<
        number | 'all'
    >('all');
    const [failedImages, setFailedImages] = useState<Record<number, boolean>>(
        {},
    );

    const handleImageError = (productId: number) => {
        setFailedImages((prev) => ({ ...prev, [productId]: true }));
    };

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
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
    }, [products, searchQuery, selectedCategoryId]);

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
            <Head title="Products" />
            <main className="flex flex-1 flex-col gap-6 p-5 sm:p-7 lg:p-10">
                {/* Header section */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-nf-text">
                            Products
                        </h1>
                        <p className="mt-1 text-sm text-nf-muted">
                            Manage your store inventory, stock, and product catalog.
                        </p>
                    </div>
                    <Link
                        href={productsCreate()}
                        className="inline-flex items-center gap-2 rounded-xl bg-nf-ink px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-nf-dark-green shadow-sm"
                    >
                        <Plus className="size-4" /> Add product
                    </Link>
                </div>

                {/* Search & Category Filter Section */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full max-w-full lg:max-w-md">
                        <Search className="pointer-events-none absolute inset-y-0 left-3.5 my-auto size-4 text-nf-muted" />
                        <input
                            type="text"
                            placeholder="Search products by name or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-11 w-full rounded-xl border border-nf-line bg-white pl-10 pr-9 text-sm text-nf-text outline-none placeholder:text-nf-muted focus:border-nf-dark-green focus:ring-2 focus:ring-nf-green/60 transition-all"
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

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                        <button
                            type="button"
                            onClick={() => setSelectedCategoryId('all')}
                            className={
                                selectedCategoryId === 'all'
                                    ? 'rounded-full bg-nf-ink px-4 py-2 text-sm font-bold text-white shadow-xs transition-all'
                                    : 'rounded-full border border-nf-line bg-white px-4 py-2 text-sm font-bold text-nf-text hover:border-nf-green transition-all'
                            }
                        >
                            All ({products.length})
                        </button>
                        {categories.map((category) => {
                            const isSelected = selectedCategoryId === category.id;
                            const count = products.filter(
                                (p) =>
                                    p.categories &&
                                    p.categories.some((c) => c.id === category.id),
                            ).length;

                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => setSelectedCategoryId(category.id)}
                                    className={
                                        isSelected
                                            ? 'rounded-full bg-nf-ink px-4 py-2 text-sm font-bold text-white shadow-xs transition-all'
                                            : 'rounded-full border border-nf-line bg-white px-4 py-2 text-sm font-bold text-nf-text hover:border-nf-green transition-all'
                                    }
                                >
                                    {category.name} ({count})
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Product Grid */}
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
                                    className="group relative flex flex-col overflow-hidden rounded-[var(--radius)] bg-white shadow-[0_10px_24px_rgba(20,18,27,.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(20,18,27,.08)] border border-nf-line/50"
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
                                            <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-nf-green-light/60 to-emerald-100/40 text-nf-dark-green p-4">
                                                <div className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-xs text-nf-dark-green">
                                                    <ImageIcon className="size-7 opacity-75" />
                                                </div>
                                                <span className="mt-2 text-xs font-semibold text-nf-muted">
                                                    No image available
                                                </span>
                                            </div>
                                        )}

                                        {/* Status & Discount Overlay Badges */}
                                        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                                            {/* Category Tag */}
                                            {product.categories &&
                                                product.categories.length > 0 && (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-nf-text backdrop-blur-md shadow-xs truncate max-w-[130px]">
                                                        <Tag className="size-3 text-nf-dark-green shrink-0" />
                                                        <span className="truncate">
                                                            {product.categories[0].name}
                                                        </span>
                                                    </span>
                                                )}

                                            {/* Stock Status Badge */}
                                            <div className="ml-auto flex items-center gap-1">
                                                {isOutOfStock ? (
                                                    <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-extrabold text-white shadow-xs">
                                                        Out of stock
                                                    </span>
                                                ) : isLowStock ? (
                                                    <span className="rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-extrabold text-white shadow-xs">
                                                        Low stock ({product.stock_quantity})
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex flex-1 flex-col justify-between p-5">
                                        <div className="flex flex-col gap-1.5">
                                            <h2 className="font-extrabold text-nf-text text-base group-hover:text-nf-dark-green transition-colors line-clamp-1">
                                                {product.name}
                                            </h2>
                                            {product.description && (
                                                <p className="text-xs text-nf-muted line-clamp-2 leading-relaxed">
                                                    {product.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-4 flex items-end justify-between border-t border-nf-line/60 pt-4">
                                            <div>
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-nf-muted block">
                                                    Price
                                                </span>
                                                <p className="text-lg font-black text-nf-dark-green">
                                                    ₦{formatCurrency(product.price)}
                                                </p>
                                            </div>

                                            {/* Stock count label */}
                                            {!isOutOfStock && (
                                                <span className="text-xs font-semibold text-nf-muted flex items-center gap-1">
                                                    <span className="size-2 rounded-full bg-emerald-500 inline-block" />
                                                    {product.stock_quantity} in stock
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                ) : (
                    /* Empty State */
                    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[var(--radius)] border-2 border-dashed border-nf-line bg-white p-8 text-center shadow-xs">
                        <div className="flex size-16 items-center justify-center rounded-2xl bg-nf-green-light text-nf-dark-green">
                            <PackageSearch className="size-8" />
                        </div>
                        <h3 className="mt-4 text-lg font-extrabold text-nf-text">
                            No products found
                        </h3>
                        <p className="mt-1 max-w-sm text-sm text-nf-muted">
                            {searchQuery || selectedCategoryId !== 'all'
                                ? "No products match your current search query or category filter. Try clearing filters."
                                : "You haven't added any products yet. Get started by creating your first product listing."}
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            {(searchQuery || selectedCategoryId !== 'all') && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategoryId('all');
                                    }}
                                    className="inline-flex items-center gap-2 rounded-xl border border-nf-line bg-white px-4 py-2.5 text-sm font-bold text-nf-text hover:bg-nf-bg transition-colors"
                                >
                                    Clear filters
                                </button>
                            )}
                            <Link
                                href={productsCreate()}
                                className="inline-flex items-center gap-2 rounded-xl bg-nf-ink px-4 py-2.5 text-sm font-bold text-white hover:bg-nf-dark-green transition-colors"
                            >
                                <Plus className="size-4" /> Add product
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

Products.layout = { breadcrumbs: [{ title: 'Products', href: '/products' }] };

