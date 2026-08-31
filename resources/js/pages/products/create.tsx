import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, Check, ImagePlus, PackagePlus, Tag, X } from 'lucide-react';
import { useState } from 'react';
import { store } from '@/actions/App/Http/Controllers/ProductController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index as productsIndex } from '@/routes/products';

type Category = { id: number; name: string };

type CreateProductProps = { categories: Category[] };

const fieldClassName =
    'h-12 rounded-xl border-nf-line bg-nf-bg px-4 text-nf-text shadow-none placeholder:text-nf-muted focus-visible:border-nf-green-dark focus-visible:ring-nf-green/70';

export default function CreateProduct({ categories }: CreateProductProps) {
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(
        [],
    );
    const [imageName, setImageName] = useState<string | null>(null);

    function toggleCategory(categoryId: number): void {
        setSelectedCategoryIds((selectedIds) =>
            selectedIds.includes(categoryId)
                ? selectedIds.filter((id) => id !== categoryId)
                : [...selectedIds, categoryId],
        );
    }

    return (
        <>
            <Head title="Add product" />
            <main className="flex flex-1 flex-col gap-6 p-5 sm:p-7 lg:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <Link
                            href={productsIndex()}
                            className="mt-1 inline-flex size-10 items-center justify-center rounded-xl border border-nf-line bg-white text-nf-text transition-colors hover:border-nf-green-dark hover:text-nf-dark-green"
                            aria-label="Back to products"
                        >
                            <ArrowLeft className="size-5" />
                        </Link>
                        <div>
                            <p className="mb-1 text-sm font-bold text-nf-dark-green">
                                Inventory
                            </p>
                            <h1 className="text-3xl font-extrabold tracking-tight text-nf-text">
                                Add a new product
                            </h1>
                            <p className="mt-2 text-sm text-nf-muted">
                                Add the details customers need to find and buy
                                it.
                            </p>
                        </div>
                    </div>
                    <div className="hidden items-center gap-2 rounded-full bg-nf-green-light px-4 py-2 text-sm font-bold text-nf-dark-green sm:flex">
                        <PackagePlus className="size-4" /> New listing
                    </div>
                </div>

                <Form
                    {...store.form()}
                    className="grid max-w-6xl gap-6 xl:grid-cols-[minmax(0,1fr)_330px]"
                >
                    {({ errors, processing }) => (
                        <>
                            <section className="flex flex-col gap-6 rounded-[var(--radius)] bg-white p-5 shadow-[0_10px_24px_rgba(20,18,27,.05)] sm:p-7">
                                <div className="border-b border-nf-line pb-5">
                                    <h2 className="text-lg font-extrabold text-nf-text">
                                        Product information
                                    </h2>
                                    <p className="mt-1 text-sm text-nf-muted">
                                        Keep it clear and specific so your
                                        product is easy to recognize.
                                    </p>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="flex flex-col gap-2 sm:col-span-2">
                                        <Label
                                            htmlFor="name"
                                            className="font-bold text-nf-text"
                                        >
                                            Product name
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="e.g. Wireless Earbuds Pro"
                                            className={fieldClassName}
                                            autoFocus
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="flex flex-col gap-2 sm:col-span-2">
                                        <Label
                                            htmlFor="description"
                                            className="font-bold text-nf-text"
                                        >
                                            Description
                                        </Label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={5}
                                            placeholder="Describe the product, its features, and what makes it useful."
                                            className="min-h-32 w-full resize-y rounded-xl border border-nf-line bg-nf-bg px-4 py-3 text-sm text-nf-text transition outline-none placeholder:text-nf-muted focus:border-nf-green-dark focus:ring-3 focus:ring-nf-green/70"
                                        />
                                        <InputError
                                            message={errors.description}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label
                                            htmlFor="price"
                                            className="font-bold text-nf-text"
                                        >
                                            Price
                                        </Label>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm font-bold text-nf-muted">
                                                ₦
                                            </span>
                                            <Input
                                                id="price"
                                                name="price"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                className={`${fieldClassName} pl-8`}
                                            />
                                        </div>
                                        <InputError message={errors.price} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label
                                            htmlFor="discount"
                                            className="font-bold text-nf-text"
                                        >
                                            Discount{' '}
                                            <span className="font-medium text-nf-muted">
                                                (optional)
                                            </span>
                                        </Label>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm font-bold text-nf-muted">
                                                ₦
                                            </span>
                                            <Input
                                                id="discount"
                                                name="discount"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                className={`${fieldClassName} pl-8`}
                                            />
                                        </div>
                                        <InputError message={errors.discount} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label
                                            htmlFor="stock_quantity"
                                            className="font-bold text-nf-text"
                                        >
                                            Stock quantity
                                        </Label>
                                        <Input
                                            id="stock_quantity"
                                            name="stock_quantity"
                                            type="number"
                                            min="0"
                                            step="1"
                                            placeholder="0"
                                            className={fieldClassName}
                                        />
                                        <InputError
                                            message={errors.stock_quantity}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 border-t border-nf-line pt-6">
                                    <div>
                                        <Label className="font-bold text-nf-text">
                                            Categories
                                        </Label>
                                        <p className="mt-1 text-sm text-nf-muted">
                                            Choose every category that fits this
                                            product.
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category) => {
                                            const isSelected =
                                                selectedCategoryIds.includes(
                                                    category.id,
                                                );

                                            return (
                                                <button
                                                    key={category.id}
                                                    type="button"
                                                    onClick={() =>
                                                        toggleCategory(
                                                            category.id,
                                                        )
                                                    }
                                                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-bold transition-colors ${isSelected ? 'border-nf-ink bg-nf-ink text-white' : 'border-nf-line bg-white text-nf-text hover:border-nf-green-dark'}`}
                                                >
                                                    {isSelected && (
                                                        <Check className="size-3.5" />
                                                    )}
                                                    {category.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {selectedCategoryIds.map((categoryId) => (
                                        <input
                                            key={categoryId}
                                            type="hidden"
                                            name="category_ids[]"
                                            value={categoryId}
                                        />
                                    ))}
                                    <InputError message={errors.category_ids} />
                                    <div className="mt-1 rounded-xl border border-dashed border-nf-green-dark/40 bg-nf-green-light/60 p-4">
                                        <Label
                                            htmlFor="new_category"
                                            className="flex items-center gap-2 font-bold text-nf-dark-green"
                                        >
                                            <Tag className="size-4" /> Add a new
                                            category
                                        </Label>
                                        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                                            <Input
                                                id="new_category"
                                                name="new_category"
                                                placeholder="e.g. Phone accessories"
                                                className="h-11 rounded-lg border-white bg-white px-3.5 shadow-none focus-visible:border-nf-green-dark focus-visible:ring-nf-green/70"
                                            />
                                            <span className="flex items-center text-xs font-medium whitespace-nowrap text-nf-dark-green">
                                                It will be added with this
                                                product.
                                            </span>
                                        </div>
                                        <InputError
                                            message={errors.new_category}
                                        />
                                    </div>
                                </div>
                            </section>

                            <aside className="flex flex-col gap-5">
                                <section className="rounded-[var(--radius)] bg-white p-5 shadow-[0_10px_24px_rgba(20,18,27,.05)]">
                                    <div className="mb-4">
                                        <h2 className="text-lg font-extrabold text-nf-text">
                                            Product image
                                        </h2>
                                        <p className="mt-1 text-sm text-nf-muted">
                                            Use a clear, bright photo.
                                        </p>
                                    </div>
                                    <label
                                        htmlFor="image"
                                        className="group flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-nf-green-dark/35 bg-nf-green-light/60 p-5 text-center transition-colors hover:border-nf-green-dark hover:bg-nf-green-light"
                                    >
                                        <span className="mb-3 inline-flex size-12 items-center justify-center rounded-2xl bg-white text-nf-dark-green shadow-sm transition-transform group-hover:-translate-y-0.5">
                                            <ImagePlus className="size-6" />
                                        </span>
                                        <span className="font-bold text-nf-text">
                                            Upload product photo
                                        </span>
                                        <span className="mt-1 text-xs leading-5 text-nf-muted">
                                            PNG, JPG, WEBP up to 5MB
                                        </span>
                                        {imageName && (
                                            <span className="mt-3 max-w-full truncate rounded-full bg-white px-3 py-1.5 text-xs font-bold text-nf-dark-green">
                                                {imageName}
                                            </span>
                                        )}
                                    </label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        className="sr-only"
                                        onChange={(event) =>
                                            setImageName(
                                                event.target.files?.[0]?.name ??
                                                    null,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.image}
                                        className="mt-2"
                                    />
                                </section>
                                <div className="rounded-[var(--radius)] bg-nf-ink p-5 text-white">
                                    <h2 className="font-extrabold">
                                        Ready to publish?
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-white/70">
                                        Your product will be saved to your
                                        inventory and organized under the
                                        selected categories.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="h-12 rounded-xl bg-nf-ink text-sm font-extrabold text-white hover:bg-nf-dark-green"
                                    >
                                        <PackagePlus className="size-4" />
                                        {processing
                                            ? 'Adding product…'
                                            : 'Add product'}
                                    </Button>
                                    <Button
                                        asChild
                                        type="button"
                                        variant="outline"
                                        className="h-12 rounded-xl border-nf-line bg-white font-bold text-nf-text hover:bg-nf-bg"
                                    >
                                        <Link href={productsIndex()}>
                                            <X className="size-4" /> Cancel
                                        </Link>
                                    </Button>
                                </div>
                            </aside>
                        </>
                    )}
                </Form>
            </main>
        </>
    );
}

CreateProduct.layout = {
    breadcrumbs: [
        { title: 'Products', href: productsIndex() },
        { title: 'Add product', href: '#' },
    ],
};
