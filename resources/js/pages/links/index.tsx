import { Head } from '@inertiajs/react';
import { Copy, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { store } from '@/actions/App/Http/Controllers/LinksController';
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

const categoryOptions = [
    'General',
    'Marketing',
    'Product launch',
    'Social',
    'Sales',
    'Collections',
];

interface LinkRow {
    id: number;
    name: string;
    directory: string;
}

interface LinksProps {
    user: number;
    categories: { id: number; name: string }[];
    links: LinkRow[];
}

export default function Links({ user, categories, links = [] }: LinksProps) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);

    function handleCreateLink(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsCreateDialogOpen(false);
    }

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
            <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
            >
                <main className="flex flex-1 flex-col gap-6 p-5 sm:p-7 lg:p-10">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h1 className="text-3xl font-extrabold tracking-tight text-nf-text">
                            Links
                        </h1>
                        <DialogTrigger asChild>
                            <Button className="inline-flex items-center gap-2 rounded-xl bg-nf-ink px-4 py-3 text-sm font-bold text-white hover:bg-nf-dark-green">
                                <Plus className="size-4" /> New link
                            </Button>
                        </DialogTrigger>
                    </div>
                    <section className="overflow-hidden rounded-[var(--radius)] bg-white p-3 shadow-[0_8px_24px_rgba(20,18,27,.05)] sm:p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[520px] text-left">
                                <thead className="border-b border-nf-line text-xs font-bold tracking-wide text-nf-muted uppercase">
                                    <tr>
                                        <th className="px-3 py-3">Link name</th>
                                        <th className="px-3 py-3">Link directory</th>
                                        <th className="px-3 py-3 text-right">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-nf-line text-sm">
                                    {links.map((link) => (
                                        <tr key={link.id}>
                                            <td className="px-3 py-4 font-bold text-nf-text">
                                                {link.name}
                                            </td>
                                            <td className="px-3 py-4 text-nf-muted">
                                                {link.directory}
                                            </td>
                                            <td className="px-3 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        aria-label={`Delete ${link.name}`}
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>

                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Create a new link</DialogTitle>
                        <DialogDescription>
                            Add a short link and assign the category it should
                            live under.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                    {...store.form()}
                     onSubmit={handleCreateLink} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="link-name" className="font-bold text-nf-text">
                                Link name
                            </Label>
                            <Input
                                id="link-name"
                                name="name"
                                placeholder="e.g. Best sellers"
                                autoFocus
                                className="h-11 rounded-xl border-nf-line bg-nf-bg px-4 text-nf-text shadow-none placeholder:text-nf-muted focus-visible:border-nf-green-dark focus-visible:ring-nf-green/70"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold text-nf-text">
                                Category
                            </Label>
                            <div className="grid gap-2 sm:grid-cols-2">
                                {categories.map((category) => {
                                    const isSelected =
                                        selectedCategory === category.name;

                                    return (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() =>
                                                setSelectedCategory(category.name)
                                            }
                                            className={`rounded-xl border px-3 py-2 text-left text-sm font-bold transition-colors ${
                                                isSelected
                                                    ? 'border-nf-ink bg-nf-ink text-white'
                                                    : 'border-nf-line bg-white text-nf-text hover:border-nf-green-dark'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    );
                                })}
                                <input
                                    type="hidden"
                                    name="category"
                                    value={selectedCategory}
                                />
                            </div>
                        </div>

                        <DialogFooter className="gap-2 sm:justify-end">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-11 rounded-xl border-nf-line bg-white font-bold text-nf-text hover:bg-nf-bg"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="h-11 rounded-xl bg-nf-ink text-sm font-extrabold text-white hover:bg-nf-dark-green"
                            >
                                Create link
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

Links.layout = { breadcrumbs: [{ title: 'Links', href: 'links' }] };
