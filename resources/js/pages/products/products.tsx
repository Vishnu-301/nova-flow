import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { products } from '@/routes';

const categories = [
    'All',
    'Phone accessories',
    'Snacks',
    'Clothing',
    'Foot wears',
    'Services',
    'Hair accessories',
];

const items = [
    ['🎧', 'Wireless Earbuds Pro', 'Phone accessories', '₦12,500'],
    ['📱', 'Phone Ring Holder', 'Phone accessories', '₦1,800'],
    ['🍌', 'Plantain Chips 200g', 'Snacks', '₦900'],
    ['🥜', 'Assorted Nuts Pack', 'Snacks', '₦2,200'],
    ['👕', 'Ankara Shirt', 'Clothing', '₦8,000'],
    ['🧥', 'Denim Jacket', 'Clothing', '₦15,000'],
    ['👟', 'Canvas Sneakers', 'Foot wears', '₦11,000'],
    ['🩴', 'Leather Sandals', 'Foot wears', '₦9,500'],
    ['🛠️', 'Home Styling Session', 'Services', '₦5,000'],
    ['🎀', 'Silk Scrunchies (3pk)', 'Hair accessories', '₦1,200'],
];

export default function Products() {
    return (
        <>
            <Head title="Products" />
            <main className="flex flex-1 flex-col gap-6 p-5 sm:p-7 lg:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-3xl font-extrabold tracking-tight text-nf-text">
                        Products
                    </h1>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl bg-nf-ink px-4 py-3 text-sm font-bold text-white hover:bg-nf-dark-green"
                    >
                        <Plus className="size-4" /> Add product
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                        <button
                            key={category}
                            type="button"
                            className={
                                index === 0
                                    ? 'rounded-full bg-nf-ink px-4 py-2.5 text-sm font-bold text-white'
                                    : 'rounded-full border border-nf-line bg-white px-4 py-2.5 text-sm font-bold text-nf-text hover:border-nf-green'
                            }
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {items.map(([emoji, name, category, price]) => (
                        <article
                            key={name}
                            className="overflow-hidden rounded-[var(--radius)] bg-white shadow-[0_10px_24px_rgba(20,18,27,.05)]"
                        >
                            <div className="flex h-32 items-center justify-center bg-nf-green-light text-4xl">
                                {emoji}
                            </div>
                            <div className="flex flex-col gap-1 p-4">
                                <h2 className="font-bold text-nf-text">
                                    {name}
                                </h2>
                                <p className="text-sm text-nf-muted">
                                    {category}
                                </p>
                                <p className="font-extrabold text-nf-dark-green">
                                    {price}
                                </p>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </>
    );
}

Products.layout = { breadcrumbs: [{ title: 'Products', href: products() }] };
