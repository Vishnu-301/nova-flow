import { Link } from '@inertiajs/react';
import {
    BoxesIcon,
    LayoutGrid,
    LinkIcon,
    LogOut,
    Settings,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { edit as editProfile } from '@/routes/profile';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Overview',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Links',
        href: 'links',
        icon: LinkIcon,
    },
    {
        title: 'Products',
        href: 'products',
        icon: BoxesIcon,
    },
    {
        title: 'Settings',
        href: editProfile(),
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" className="bg-nf-ink" variant="sidebar">
            <SidebarHeader className="px-4 pt-5 pb-9 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 hover:bg-transparent active:bg-transparent group-data-[collapsible=icon]:[&>div:first-child]:size-4 group-data-[collapsible=icon]:[&>div:last-child]:hidden"
                        >
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-2 group-data-[collapsible=icon]:px-0">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="p-4 pb-6 group-data-[collapsible=icon]:p-2">
                <SidebarMenu>
                    <SidebarMenuItem className="hidden md:block">
                        <SidebarTrigger className="h-10 w-full justify-start rounded-xl px-3 text-white/75 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 hover:bg-transparent hover:text-white" />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            tooltip={{ children: 'Logout' }}
                            className="h-10 text-[14.5px] font-bold text-red-400 hover:bg-red-500/10 hover:text-red-400"
                        >
                            <Link href="/logout" method="post" as="button">
                                <LogOut />
                                <span>Logout</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
