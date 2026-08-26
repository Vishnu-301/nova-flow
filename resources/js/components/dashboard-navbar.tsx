import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';

export function DashboardNavbar() {
    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-nf-line bg-nf-ink px-4 md:hidden">
            <Link
                href={dashboard()}
                prefetch
                className="flex items-center gap-2"
            >
                <AppLogo />
            </Link>
            <SidebarTrigger className="size-10 text-white hover:bg-white/10 hover:text-white" />
        </header>
    );
}
