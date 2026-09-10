import { Head, router, useForm } from '@inertiajs/react';
import { Check, Copy, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    destroy as destroyLink,
    store,
} from '@/actions/App/Http/Controllers/LinksController';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LinkRow {
    id: number;
    name: string;
    slug: string;
    directory: string;
}

interface LinksProps {
    user: number;
    categories: { id: number; name: string }[];
    links: LinkRow[];
}

export default function Links({ categories = [], links = [] }: LinksProps) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            category_ids: [] as number[],
        });

    function toggleCategory(categoryId: number) {
        setData(
            'category_ids',
            data.category_ids.includes(categoryId)
                ? data.category_ids.filter((id) => id !== categoryId)
                : [...data.category_ids, categoryId],
        );
    }

    function toggleAllCategories() {
        if (data.category_ids.length === categories.length) {
            setData('category_ids', []);
        } else {
            setData(
                'category_ids',
                categories.map((c) => c.id),
            );
        }
    }

    function handleCreateLink(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post(store.url(), {
            onSuccess: () => {
                setIsCreateDialogOpen(false);
                reset();
            },
        });
    }

    function handleOpenChange(open: boolean) {
        setIsCreateDialogOpen(open);

        if (!open) {
            reset();
            clearErrors();
        }
    }

    const handleDeleteLink = (slug: string, name: string) => {
        if (confirm(`Are you sure you want to delete the "${name}" link?`)) {
            router.delete(destroyLink.url(slug));
        }
    };

    const handleCopyLink = async (directory: string, name: string) => {
        try {
            await navigator.clipboard.writeText(directory);
        } catch {
            // Safely ignore clipboard failures while keeping the UI responsive.
        }

        window.alert(`${name} link copied to clipboard.`);
    };

    return (
        <>
            <Head title="Links" />
            <Dialog open={isCreateDialogOpen} onOpenChange={handleOpenChange}>
                <main className="flex flex-1 flex-col gap-6 p-5 sm:p-7 lg:p-10">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-nf-text">
                                Links
                            </h1>
                            <p className="mt-1 text-sm text-nf-muted">
                                Create category links to share curated collections of your products.
                            </p>
                        </div>
                        <DialogTrigger asChild>
                            <Button className="inline-flex items-center gap-2 rounded-xl bg-nf-ink px-4 py-3 text-sm font-bold text-white hover:bg-nf-dark-green">
                                <Plus className="size-4" /> New link
                            </Button>
                        </DialogTrigger>
                    </div>
                    <section className="overflow-hidden rounded-[var(--radius)] bg-white p-3 shadow-[0_8px_24px_rgba(20,18,27,.05)] sm:p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[520px] text-left">
                                <thead className="border-b border-nf-line text-xs font-bold tracking-wide uppercase text-nf-muted">
                                    <tr>
                                        <th className="px-3 py-3">Link name</th>
                                        <th className="px-3 py-3">Link directory</th>
                                        <th className="px-3 py-3 text-right">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-nf-line text-sm">
                                    {links.length > 0 ? (
                                        links.map((link) => (
                                            <tr key={link.id}>
                                                <td className="px-3 py-4 font-bold text-nf-text">
                                                    {link.name}
                                                </td>
                                                <td className="px-3 py-4">
                                                    <a
                                                        href={link.directory}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1.5 font-medium text-nf-muted transition-colors hover:text-nf-ink hover:underline"
                                                    >
                                                        <span>{link.directory}</span>
                                                        <ExternalLink className="size-3.5" />
                                                    </a>
                                                </td>
                                                <td className="px-3 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            aria-label={`Delete ${link.name}`}
                                                            onClick={() =>
                                                                handleDeleteLink(
                                                                    link.slug,
                                                                    link.name,
                                                                )
                                                            }
                                                            className="inline-flex size-8 items-center justify-center rounded-md text-nf-muted transition-colors hover:bg-rose-50 hover:text-rose-600"
                                                        >
                                                            <Trash2 className="size-4" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            aria-label={`Copy ${link.name} link`}
                                                            onClick={() =>
                                                                handleCopyLink(
                                                                    link.directory,
                                                                    link.name,
                                                                )
                                                            }
                                                            className="inline-flex size-8 items-center justify-center rounded-md text-nf-muted transition-colors hover:bg-nf-bg hover:text-nf-ink"
                                                        >
                                                            <Copy className="size-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-3 py-8 text-center text-sm text-nf-muted"
                                            >
                                                No links created yet. Click{' '}
                                                <span className="font-bold text-nf-text">
                                                    "New link"
                                                </span>{' '}
                                                to create one.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>

                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Create a new link</DialogTitle>
                        <DialogDescription>
                            Create a link to display products from one or more selected categories.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateLink} className="space-y-5">
                        <div className="space-y-2">
                            <Label
                                htmlFor="link-name"
                                className="font-bold text-nf-text"
                            >
                                Link name <span className="text-xs font-normal text-nf-muted">(optional)</span>
                            </Label>
                            <Input
                                id="link-name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Summer Essentials"
                                autoFocus
                                className="h-11 rounded-xl border-nf-line bg-nf-bg px-4 text-nf-text shadow-none placeholder:text-nf-muted focus-visible:border-nf-green-dark focus-visible:ring-nf-green/70"
                            />
                            {errors.name && (
                                <p className="text-xs font-semibold text-rose-600">
                                    {errors.name}
                                </p>
                            )}
                            {errors.slug && !errors.name && (
                                <p className="text-xs font-semibold text-rose-600">
                                    {errors.slug}
                                </p>
                            )}
                            <p className="text-xs text-nf-muted">
                                If left blank, the link name will be generated automatically from the selected categories.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="font-bold text-nf-text">
                                    Categories{' '}
                                    <span className="text-xs font-normal text-nf-muted">
                                        ({data.category_ids.length} selected)
                                    </span>
                                </Label>
                                {categories.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={toggleAllCategories}
                                        className="text-xs font-bold text-nf-dark-green hover:underline"
                                    >
                                        {data.category_ids.length === categories.length
                                            ? 'Deselect all'
                                            : 'Select all'}
                                    </button>
                                )}
                            </div>

                            {categories.length > 0 ? (
                                <div className="grid max-h-56 gap-2 overflow-y-auto sm:grid-cols-2">
                                    {categories.map((category) => {
                                        const isSelected =
                                            data.category_ids.includes(category.id);

                                        return (
                                            <button
                                                key={category.id}
                                                type="button"
                                                onClick={() =>
                                                    toggleCategory(category.id)
                                                }
                                                className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm font-bold transition-colors ${
                                                    isSelected
                                                        ? 'border-nf-ink bg-nf-ink text-white'
                                                        : 'border-nf-line bg-white text-nf-text hover:border-nf-green-dark'
                                                }`}
                                            >
                                                <span className="truncate">{category.name}</span>
                                                {isSelected && (
                                                    <Check className="size-4 shrink-0" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="rounded-xl border border-dashed border-nf-line p-4 text-center text-sm text-nf-muted">
                                    No categories found with products. Add products and categories first.
                                </div>
                            )}

                            {errors.category_ids && (
                                <p className="text-xs font-semibold text-rose-600">
                                    {errors.category_ids}
                                </p>
                            )}
                            <p className="text-xs text-nf-muted">
                                Select one or more categories. Only products in these categories will be visible when the link is accessed.
                            </p>
                        </div>

                        <DialogFooter className="gap-2 sm:justify-end">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={processing}
                                    className="h-11 rounded-xl border-nf-line bg-white font-bold text-nf-text hover:bg-nf-bg"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={processing || data.category_ids.length === 0}
                                className="h-11 rounded-xl bg-nf-ink text-sm font-extrabold text-white hover:bg-nf-dark-green disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create link'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

Links.layout = { breadcrumbs: [{ title: 'Links', href: 'links' }] };
