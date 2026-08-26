import { Head } from '@inertiajs/react';
import { Copy, Plus } from 'lucide-react';
import { links } from '@/routes';

const linkRows = [
    ['Inventory Store', 'stockpile.app/alex', '12', 'Active'],
    ['Best Sellers', 'stockpile.app/alex/top', '5', 'Active'],
    ['New Arrivals', 'stockpile.app/alex/new', '2', 'Paused'],
    ['Clearance Sale', 'stockpile.app/alex/sale', '1', 'Paused'],
];

export default function Links() {
    return (
        <>
            <Head title="Links" />
            <main className="flex flex-1 flex-col gap-6 p-5 sm:p-7 lg:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-3xl font-extrabold tracking-tight text-nf-text">
                        Links
                    </h1>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl bg-nf-ink px-4 py-3 text-sm font-bold text-white hover:bg-nf-dark-green"
                    >
                        <Plus className="size-4" /> New link
                    </button>
                </div>
                <section className="grid gap-4 sm:grid-cols-3">
                    {[
                        ['Total links', '4'],
                        ['Total clicks', '20'],
                        ['Best link', 'Inventory'],
                    ].map(([label, value]) => (
                        <div
                            key={label}
                            className="rounded-[var(--radius)] bg-white p-5 shadow-[0_8px_24px_rgba(20,18,27,.05)]"
                        >
                            <p className="text-sm text-nf-muted">{label}</p>
                            <p className="mt-1 text-xl font-extrabold text-nf-text">
                                {value}
                            </p>
                        </div>
                    ))}
                </section>
                <section className="overflow-hidden rounded-[var(--radius)] bg-white p-3 shadow-[0_8px_24px_rgba(20,18,27,.05)] sm:p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[680px] text-left">
                            <thead className="border-b border-nf-line text-xs font-bold tracking-wide text-nf-muted uppercase">
                                <tr>
                                    <th className="px-3 py-3">Link</th>
                                    <th className="px-3 py-3">Destination</th>
                                    <th className="px-3 py-3">Clicks</th>
                                    <th className="px-3 py-3">Status</th>
                                    <th className="px-3 py-3">
                                        <span className="sr-only">
                                            Copy link
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-nf-line text-sm">
                                {linkRows.map(
                                    ([name, destination, clicks, status]) => (
                                        <tr key={name}>
                                            <td className="px-3 py-4 font-bold">
                                                {name}
                                            </td>
                                            <td className="px-3 py-4">
                                                {destination}
                                            </td>
                                            <td className="px-3 py-4">
                                                {clicks}
                                            </td>
                                            <td className="px-3 py-4">
                                                <span
                                                    className={
                                                        status === 'Active'
                                                            ? 'rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600'
                                                            : 'rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600'
                                                    }
                                                >
                                                    {status}
                                                </span>
                                            </td>
                                            <td className="px-3 py-4">
                                                <button
                                                    type="button"
                                                    aria-label={`Copy ${name} link`}
                                                    className="text-nf-muted hover:text-nf-ink"
                                                >
                                                    <Copy className="size-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    );
}

Links.layout = { breadcrumbs: [{ title: 'Links', href: links() }] };
