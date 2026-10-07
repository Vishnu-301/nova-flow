import { Link } from '@inertiajs/react';
import { Palette, ShieldCheck, User } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
        icon: User,
    },
    {
        title: 'Security',
        href: editSecurity(),
        icon: ShieldCheck,
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: Palette,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className="flex flex-1 flex-col p-5 md:p-8">
            <Heading
                title="Settings"
                description="Manage your profile and account settings"
            />

            <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                <aside className="w-full shrink-0 lg:w-56">
                    <nav
                        className="flex flex-row gap-2 overflow-x-auto rounded-2xl border border-nf-line bg-nf-card p-2 lg:flex-col lg:gap-1.5 lg:overflow-visible"
                        aria-label="Settings"
                    >
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${toUrl(item.href)}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full shrink-0 justify-start gap-2.5 rounded-xl px-3.5 py-2.5 text-[13.5px] transition-colors', {
                                    'bg-nf-green-light font-bold text-nf-dark-green': isCurrentOrParentUrl(item.href),
                                    'text-nf-muted hover:bg-nf-bg hover:text-nf-text': !isCurrentOrParentUrl(item.href),
                                })}
                            >
                                <Link href={item.href}>
                                    {item.icon && (
                                        <item.icon className="h-4 w-4 shrink-0" />
                                    )}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-0 lg:hidden" />

                <div className="min-w-0 flex-1 md:max-w-3xl">
                    <section className="max-w-3xl space-y-5">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
