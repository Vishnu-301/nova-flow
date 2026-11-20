import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Bell,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Copy,
    Globe,
    Layers,
    LayoutGrid,
    Menu,
    MessageCircle,
    Monitor,
    QrCode,
    Share2,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Tablet,
    X,
} from 'lucide-react';
import { useState } from 'react';
import AppLogo from '@/components/app-logo';
import { dashboard, login, register } from '@/routes';

interface FeatureSlide {
    id: string;
    badge: string;
    tabLabel: string;
    title: string;
    description: string;
    renderVisual: () => React.ReactNode;
}

const FEATURE_SLIDES: FeatureSlide[] = [
    {
        id: 'slide-1',
        badge: 'Feature 01 · Link Engine',
        tabLabel: '01. Category Links',
        title: 'Compile any categories into one clean shareable link',
        description:
            'Select any combination of product categories and bundle them into a single custom URL in seconds. Share one link instead of sending dozens of individual photos over chat.',
        renderVisual: () => (
            <div className="rounded-2xl border border-[#eaeaf2] bg-[#f8f8fc] p-6 text-left dark:border-[#1a2a1e] dark:bg-[#050806]">
                <div className="flex items-center justify-between border-b border-[#eaeaf2] pb-3 text-xs font-semibold text-[#636171] dark:border-[#1a2a1e] dark:text-[#9FB8A4]">
                    <span>Category Bundle Setup</span>
                    <span className="rounded bg-[#e9fbe7] px-2 py-0.5 text-[10px] font-bold text-[#123524] dark:bg-[#123524] dark:text-[#bcf7b7]">
                        Compiled
                    </span>
                </div>

                {/* Simulated Category Selection Pills */}
                <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between rounded-xl border border-[#2f6b3f] bg-white p-3 dark:border-[#bcf7b7] dark:bg-[#0b120d]">
                        <div className="flex items-center gap-2.5">
                            <span className="flex size-4 items-center justify-center rounded bg-[#123524] text-white dark:bg-[#bcf7b7] dark:text-[#06140b]">
                                <CheckCircle2 className="size-3" />
                            </span>
                            <span className="text-sm font-bold text-[#123524] dark:text-[#edf7ef]">
                                Handcrafted Waistbeads
                            </span>
                        </div>
                        <span className="text-xs font-semibold text-[#636171] dark:text-[#9FB8A4]">
                            7 items
                        </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-[#2f6b3f] bg-white p-3 dark:border-[#bcf7b7] dark:bg-[#0b120d]">
                        <div className="flex items-center gap-2.5">
                            <span className="flex size-4 items-center justify-center rounded bg-[#123524] text-white dark:bg-[#bcf7b7] dark:text-[#06140b]">
                                <CheckCircle2 className="size-3" />
                            </span>
                            <span className="text-sm font-bold text-[#123524] dark:text-[#edf7ef]">
                                Stacking Bracelets
                            </span>
                        </div>
                        <span className="text-xs font-semibold text-[#636171] dark:text-[#9FB8A4]">
                            4 items
                        </span>
                    </div>
                </div>

                {/* Generated URL Box */}
                <div className="mt-5 rounded-xl border border-[#eaeaf2] bg-white p-3.5 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                    <div className="flex items-center justify-between text-xs text-[#636171] dark:text-[#9FB8A4]">
                        <span>Generated Storefront URL</span>
                        <div className="flex items-center gap-1 font-bold text-[#2f6b3f] dark:text-[#bcf7b7]">
                            <Copy className="size-3" />
                            <span>Ready to Share</span>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-[#f4f4fa] px-3 py-2 font-mono text-xs font-bold text-[#123524] dark:bg-[#101a13] dark:text-[#bcf7b7]">
                        <span className="truncate">
                            novaflow.com/your-store/summer-collection
                        </span>
                        <span className="shrink-0 rounded bg-[#e9fbe7] px-2 py-0.5 font-sans text-[10px] font-bold text-[#123524] dark:bg-[#123524] dark:text-[#bcf7b7]">
                            11 Products
                        </span>
                    </div>
                </div>

                {/* Share Channels */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#636171] dark:text-[#9FB8A4]">
                    <span>Quick Share:</span>
                    <div className="flex items-center gap-2">
                        <span className="rounded-md border border-[#eaeaf2] bg-white px-2 py-1 text-[11px] font-semibold text-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef]">
                            WhatsApp
                        </span>
                        <span className="rounded-md border border-[#eaeaf2] bg-white px-2 py-1 text-[11px] font-semibold text-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef]">
                            Instagram Bio
                        </span>
                        <span className="rounded-md border border-[#eaeaf2] bg-white px-2 py-1 text-[11px] font-semibold text-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef]">
                            QR Code
                        </span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 'slide-2',
        badge: 'Feature 02 · Customer Experience',
        tabLabel: '02. Mobile Storefront',
        title: 'Instant storefronts with zero customer registration barrier',
        description:
            'When customers tap your link, they land on a clean, dedicated catalog. No app installations, no accounts to create, and no chaotic clutter — just fast, frictionless viewing.',
        renderVisual: () => (
            <div className="rounded-2xl border border-[#eaeaf2] bg-[#f8f8fc] p-6 text-left dark:border-[#1a2a1e] dark:bg-[#050806]">
                <div className="flex items-center justify-between border-b border-[#eaeaf2] pb-3 text-xs font-semibold text-[#636171] dark:border-[#1a2a1e] dark:text-[#9FB8A4]">
                    <span>Customer Mobile Experience</span>
                    <span className="font-bold text-[#2f6b3f] dark:text-[#bcf7b7]">
                        App-Free
                    </span>
                </div>

                {/* Simulated Storefront Catalog */}
                <div className="mt-4 rounded-xl border border-[#eaeaf2] bg-white p-4 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-[#2f6b3f] uppercase dark:text-[#bcf7b7]">
                                Curated Drop
                            </p>
                            <h4 className="text-base font-extrabold text-[#123524] dark:text-[#edf7ef]">
                                Summer Artisan Collection
                            </h4>
                        </div>
                        <span className="rounded-full bg-[#f4f4fa] px-2.5 py-1 text-xs font-bold text-[#123524] dark:bg-[#050806] dark:text-[#edf7ef]">
                            11 Items
                        </span>
                    </div>

                    {/* Filter tabs */}
                    <div className="mt-3 flex gap-1.5">
                        <span className="rounded-lg bg-[#123524] px-2.5 py-1 text-[11px] font-bold text-white dark:bg-[#bcf7b7] dark:text-[#06140b]">
                            All (11)
                        </span>
                        <span className="rounded-lg border border-[#eaeaf2] bg-white px-2.5 py-1 text-[11px] text-[#636171] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#9FB8A4]">
                            Waistbeads (7)
                        </span>
                        <span className="rounded-lg border border-[#eaeaf2] bg-white px-2.5 py-1 text-[11px] text-[#636171] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#9FB8A4]">
                            Bracelets (4)
                        </span>
                    </div>

                    {/* Simulated Item Row */}
                    <div className="mt-4 flex items-center justify-between rounded-lg border border-[#eaeaf2] bg-[#f8f8fc] p-3 dark:border-[#1a2a1e] dark:bg-[#050806]">
                        <div className="space-y-0.5">
                            <p className="text-xs font-bold text-[#123524] dark:text-[#edf7ef]">
                                Gold Vancleef Waistbead Set
                            </p>
                            <p className="text-[11px] text-[#636171] dark:text-[#9FB8A4]">
                                Artisan double-strand with clasp
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-[#123524] dark:text-[#edf7ef]">
                                ₦25,000
                            </p>
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                In Stock
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-[#636171] dark:text-[#9FB8A4]">
                    <span>Touch-friendly mobile drawer</span>
                    <span className="font-semibold text-[#2f6b3f] dark:text-[#bcf7b7]">
                        Direct WhatsApp order
                    </span>
                </div>
            </div>
        ),
    },
    {
        id: 'slide-3',
        badge: 'Feature 03 · Analytics',
        tabLabel: '03. Click Analytics',
        title: 'Track traffic, click-throughs, and campaign popularity live',
        description:
            'Every generated link tracks visitor activity automatically. See which custom slugs, social drops, and promo campaigns drive real attention from your audience.',
        renderVisual: () => (
            <div className="rounded-2xl border border-[#eaeaf2] bg-[#f8f8fc] p-6 text-left dark:border-[#1a2a1e] dark:bg-[#050806]">
                <div className="flex items-center justify-between border-b border-[#eaeaf2] pb-3 text-xs font-semibold text-[#636171] dark:border-[#1a2a1e] dark:text-[#9FB8A4]">
                    <span>Link Performance Monitor</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ● Active Tracking
                    </span>
                </div>

                {/* Metric Summary Cards */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#eaeaf2] bg-white p-3 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                        <span className="text-[11px] text-[#636171] dark:text-[#9FB8A4]">
                            Total Link Clicks
                        </span>
                        <p className="mt-1 text-2xl font-black text-[#123524] dark:text-[#edf7ef]">
                            1,420
                        </p>
                    </div>
                    <div className="rounded-xl border border-[#eaeaf2] bg-white p-3 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                        <span className="text-[11px] text-[#636171] dark:text-[#9FB8A4]">
                            Top Performing Link
                        </span>
                        <p className="mt-1 truncate text-base font-black text-[#2f6b3f] dark:text-[#bcf7b7]">
                            /summer-drop
                        </p>
                    </div>
                </div>

                {/* Click Distribution Bars */}
                <div className="mt-4 rounded-xl border border-[#eaeaf2] bg-white p-4 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                    <div className="flex items-center justify-between text-xs font-bold text-[#123524] dark:text-[#edf7ef]">
                        <span>Campaign Click Breakdown</span>
                        <span className="text-[#636171] dark:text-[#9FB8A4]">
                            75% conversion
                        </span>
                    </div>

                    <div className="mt-3 space-y-2">
                        <div>
                            <div className="flex justify-between text-[11px] text-[#636171] dark:text-[#9FB8A4]">
                                <span>/exclusive-waist-beads</span>
                                <span className="font-bold text-[#123524] dark:text-[#edf7ef]">
                                    75% (1,065 clicks)
                                </span>
                            </div>
                            <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#f4f4fa] dark:bg-[#1a2a1e]">
                                <div className="h-full w-[75%] rounded-full bg-[#2f6b3f] dark:bg-[#bcf7b7]" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-[11px] text-[#636171] dark:text-[#9FB8A4]">
                                <span>/stacking-bracelets</span>
                                <span className="font-bold text-[#123524] dark:text-[#edf7ef]">
                                    25% (355 clicks)
                                </span>
                            </div>
                            <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#f4f4fa] dark:bg-[#1a2a1e]">
                                <div className="h-full w-[25%] rounded-full bg-[#2dd4bf]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 'slide-4',
        badge: 'Feature 04 · Stock Honest',
        tabLabel: '04. Stock Alerts',
        title: 'Live inventory sync and automatic low-stock notifications',
        description:
            'Keep customer expectations accurate. Set stock numbers per product and get warned when high-demand bestsellers drop low, so you restock before losing buyers.',
        renderVisual: () => (
            <div className="rounded-2xl border border-[#eaeaf2] bg-[#f8f8fc] p-6 text-left dark:border-[#1a2a1e] dark:bg-[#050806]">
                <div className="flex items-center justify-between border-b border-[#eaeaf2] pb-3 text-xs font-semibold text-[#636171] dark:border-[#1a2a1e] dark:text-[#9FB8A4]">
                    <span>Inventory Level Monitor</span>
                    <span className="rounded bg-[#e9fbe7] px-2 py-0.5 text-[10px] font-bold text-[#123524] dark:bg-[#123524] dark:text-[#bcf7b7]">
                        Auto-Synced
                    </span>
                </div>

                {/* Stock Items Display */}
                <div className="mt-4 space-y-2.5">
                    <div className="flex items-center justify-between rounded-xl border border-[#eaeaf2] bg-white p-3 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                        <div>
                            <p className="text-xs font-bold text-[#123524] dark:text-[#edf7ef]">
                                Gold Beaded Waistband
                            </p>
                            <p className="text-[11px] text-[#636171] dark:text-[#9FB8A4]">
                                Waistbeads
                            </p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                            18 in stock
                        </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-[#ffb545]/40 bg-white p-3 dark:border-[#ffb545]/30 dark:bg-[#0b120d]">
                        <div>
                            <p className="text-xs font-bold text-[#123524] dark:text-[#edf7ef]">
                                WHIMSY Glow Bracelet
                            </p>
                            <p className="text-[11px] text-[#636171] dark:text-[#9FB8A4]">
                                Bracelets
                            </p>
                        </div>
                        <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                            Only 2 left
                        </span>
                    </div>
                </div>

                {/* Automated Notification Banner */}
                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                    <Bell className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    <span>
                        <strong>Low Stock Alert:</strong> "WHIMSY Glow Bracelet"
                        has 2 remaining units.
                    </span>
                </div>
            </div>
        ),
    },
    {
        id: 'slide-5',
        badge: 'Feature 05 · Architecture',
        tabLabel: '05. Private Security',
        title: 'Isolated multi-tenant architecture with private data scoping',
        description:
            'Every seller operates within their own isolated data partition. Your inventory, customer links, analytics, and revenue numbers are strictly private to your store.',
        renderVisual: () => (
            <div className="rounded-2xl border border-[#eaeaf2] bg-[#f8f8fc] p-6 text-left dark:border-[#1a2a1e] dark:bg-[#050806]">
                <div className="flex items-center justify-between border-b border-[#eaeaf2] pb-3 text-xs font-semibold text-[#636171] dark:border-[#1a2a1e] dark:text-[#9FB8A4]">
                    <span>Security & Tenant Scoping</span>
                    <span className="font-bold text-[#2f6b3f] dark:text-[#bcf7b7]">
                        100% Isolated
                    </span>
                </div>

                {/* Tenant Diagram */}
                <div className="mt-4 space-y-2.5">
                    <div className="flex items-center justify-between rounded-xl border border-[#2f6b3f] bg-white p-3.5 dark:border-[#bcf7b7] dark:bg-[#0b120d]">
                        <div className="flex items-center gap-2.5">
                            <ShieldCheck className="size-5 text-[#2f6b3f] dark:text-[#bcf7b7]" />
                            <div>
                                <p className="text-xs font-bold text-[#123524] dark:text-[#edf7ef]">
                                    Seller Tenant Partition
                                </p>
                                <p className="text-[11px] text-[#636171] dark:text-[#9FB8A4]">
                                    user_id scoped queries on all models
                                </p>
                            </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#2f6b3f] dark:text-[#bcf7b7]">
                            Strict Scope
                        </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-[#eaeaf2] bg-white p-3.5 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                        <div className="flex items-center gap-2.5">
                            <Globe className="size-5 text-[#636171] dark:text-[#9FB8A4]" />
                            <div>
                                <p className="text-xs font-bold text-[#123524] dark:text-[#edf7ef]">
                                    Custom Slugs & Public Route
                                </p>
                                <p className="text-[11px] text-[#636171] dark:text-[#9FB8A4]">
                                    /{'{link:slug}'} storefront resolution
                                </p>
                            </div>
                        </div>
                        <span className="font-mono text-xs text-[#636171] dark:text-[#9FB8A4]">
                            Verified Route
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-[#636171] dark:text-[#9FB8A4]">
                    <span>SSL Encrypted Transmission</span>
                    <span className="font-semibold text-[#123524] dark:text-[#edf7ef]">
                        Zero Cross-Seller Data Leak
                    </span>
                </div>
            </div>
        ),
    },
];

const STOREFRONT_USE_CASES = [
    {
        title: 'The WhatsApp & Direct Message Drop',
        badge: 'Direct Commerce',
        icon: MessageCircle,
        scenario:
            'A buyer asks: "Do you have any gold waistbeads and matching bracelets?"',
        solution:
            'Instead of sending 30 loose photos that clutter their chat, select Waistbeads + Bracelets in your dashboard. Novaflow generates a dedicated, live link in two seconds.',
        slug: 'novaflow.com/your-store/gold-waistbeads-and-bracelets',
        actionLabel:
            'Client taps link → views curated selection with live stock',
    },
    {
        title: 'The Link-in-Bio Campaign',
        badge: 'Social Traffic',
        icon: Share2,
        scenario:
            'You are promoting a seasonal collection on Instagram Stories and TikTok.',
        solution:
            'Create a custom slug for your new drop. Customers browse your curated collection instantly on mobile without signup gates, while you watch click milestones roll in.',
        slug: 'novaflow.com/your-store/summer-artisan-drop',
        actionLabel: 'Followers tap bio → fast, focused collection checkout',
    },
    {
        title: 'In-Person Pop-ups & Market QR Codes',
        badge: 'Physical to Digital',
        icon: QrCode,
        scenario:
            'Shoppers at your market stall want to see available sizes, colors, and prices.',
        solution:
            'Generate a link for the categories on display and print a single tabletop QR code. Shoppers scan and browse your exact booth catalogue on their own smartphones.',
        slug: 'novaflow.com/your-store/market-day-showcase',
        actionLabel:
            'Shoppers scan QR → browse entire inventory on their phones',
    },
    {
        title: 'Private VIP & Repeat Buyer Previews',
        badge: 'Exclusive Drops',
        icon: Sparkles,
        scenario:
            'You want loyal repeat clients to access new handcrafted items before public release.',
        solution:
            'Compile your unreleased items into a private link slug. Share the link exclusively with VIP clients to take early requests before announcing to the public.',
        slug: 'novaflow.com/your-store/vip-early-access',
        actionLabel: 'VIPs get first pick → zero public stock confusion',
    },
];

export default function Welcome() {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDevice, setActiveDevice] = useState<
        'desktop' | 'tablet' | 'mobile'
    >('desktop');
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const activeSlide = FEATURE_SLIDES[currentSlideIndex];

    const nextSlide = () => {
        setCurrentSlideIndex((prev) => (prev + 1) % FEATURE_SLIDES.length);
    };

    const prevSlide = () => {
        setCurrentSlideIndex(
            (prev) =>
                (prev - 1 + FEATURE_SLIDES.length) % FEATURE_SLIDES.length,
        );
    };

    return (
        <>
            <Head title="Nova Flow — Compile & Share Products in Curated Storefront Links" />

            <div className="min-h-screen bg-[#f4f4fa] font-sans text-[#1c1a24] selection:bg-[#bcf7b7] selection:text-[#123524] dark:bg-[#050806] dark:text-[#edf7ef]">
                {/* Navigation Header */}
                <header className="sticky top-0 z-50 border-b border-[#eaeaf2] bg-[#f4f4fa]/95 backdrop-blur-sm dark:border-[#1a2a1e] dark:bg-[#050806]/95">
                    <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <AppLogo
                                textClassName="text-[#123524] dark:text-[#edf7ef]"
                                iconClassName="size-9"
                            />
                        </Link>

                        {/* Desktop Nav Links */}
                        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#636171] md:flex dark:text-[#9FB8A4]">
                            <a
                                href="#features-carousel"
                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                            >
                                Core Features
                            </a>
                            <a
                                href="#storefronts"
                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                            >
                                Storefronts
                            </a>
                            <a
                                href="#prototypes"
                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                            >
                                Multi-Device
                            </a>
                            <a
                                href="#how"
                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                            >
                                How It Works
                            </a>
                        </nav>

                        {/* Auth Navigation */}
                        <div className="hidden items-center gap-3 sm:flex">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#123524] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#1a4430] dark:bg-[#bcf7b7] dark:text-[#06140b] dark:hover:bg-[#a6ec9f]"
                                >
                                    <LayoutGrid className="size-4" />
                                    <span>Dashboard</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-xl px-4 py-2.5 text-sm font-bold text-[#123524] hover:text-[#2f6b3f] dark:text-[#edf7ef] dark:hover:text-[#bcf7b7]"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#123524] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#1a4430] dark:bg-[#bcf7b7] dark:text-[#06140b] dark:hover:bg-[#a6ec9f]"
                                    >
                                        <span>Create store</span>
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Hamburger Toggle */}
                        <div className="flex items-center md:hidden">
                            <button
                                type="button"
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="rounded-xl p-2 text-[#123524] hover:bg-[#eaeaf2] dark:text-[#edf7ef] dark:hover:bg-[#1a2a1e]"
                                aria-label="Toggle navigation"
                            >
                                {mobileMenuOpen ? (
                                    <X className="size-6" />
                                ) : (
                                    <Menu className="size-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Drawer */}
                    {mobileMenuOpen && (
                        <div className="border-b border-[#eaeaf2] bg-white px-5 py-6 sm:px-6 md:hidden dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                            <div className="flex flex-col gap-4 text-base font-semibold text-[#123524] dark:text-[#edf7ef]">
                                <a
                                    href="#features-carousel"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-1 hover:text-[#2f6b3f] dark:hover:text-[#bcf7b7]"
                                >
                                    Core Features
                                </a>
                                <a
                                    href="#storefronts"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-1 hover:text-[#2f6b3f] dark:hover:text-[#bcf7b7]"
                                >
                                    Storefronts
                                </a>
                                <a
                                    href="#prototypes"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-1 hover:text-[#2f6b3f] dark:hover:text-[#bcf7b7]"
                                >
                                    Multi-Device
                                </a>
                                <a
                                    href="#how"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-1 hover:text-[#2f6b3f] dark:hover:text-[#bcf7b7]"
                                >
                                    How It Works
                                </a>
                            </div>

                            <div className="mt-6 flex flex-col gap-2.5 border-t border-[#eaeaf2] pt-5 dark:border-[#1a2a1e]">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#123524] py-3 text-sm font-bold text-white dark:bg-[#bcf7b7] dark:text-[#06140b]"
                                    >
                                        <LayoutGrid className="size-4" />
                                        <span>Go to Dashboard</span>
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="inline-flex w-full items-center justify-center rounded-xl border border-[#eaeaf2] py-2.5 text-sm font-bold text-[#123524] dark:border-[#1a2a1e] dark:text-[#edf7ef]"
                                        >
                                            Sign in
                                        </Link>
                                        <Link
                                            href={register()}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#123524] py-3 text-sm font-bold text-white dark:bg-[#bcf7b7] dark:text-[#06140b]"
                                        >
                                            <span>Create store</span>
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </header>

                {/* Hero Section */}
                <section className="border-b border-[#eaeaf2] bg-[#f4f4fa] pt-14 pb-18 sm:pt-20 sm:pb-24 dark:border-[#1a2a1e] dark:bg-[#050806]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                            {/* Left Column: Core Proposition */}
                            <div className="space-y-6 lg:col-span-7">

                                <h1 className="text-4xl font-extrabold tracking-tight text-[#123524] sm:text-6xl lg:text-[62px] lg:leading-[1.1] dark:text-[#edf7ef]">
                                    Compile products into curated links. Share
                                    your storefront anywhere.
                                </h1>

                                <p className="max-w-2xl text-lg leading-relaxed text-[#636171] sm:text-xl dark:text-[#9FB8A4]">
                                    Nova Flow gives sellers their own branded
                                    digital storefronts with an effortless way
                                    to organize inventory: select categories,
                                    generate custom shareable links in seconds,
                                    and track live clicks.
                                </p>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                    {auth.user ? (
                                        <Link
                                            href={dashboard()}
                                            className="inline-flex items-center gap-2.5 rounded-xl bg-[#123524] px-7 py-4 text-base font-bold text-white shadow-sm hover:bg-[#1a4430] dark:bg-[#bcf7b7] dark:text-[#06140b] dark:hover:bg-[#a6ec9f]"
                                        >
                                            <LayoutGrid className="size-5" />
                                            <span>Open Dashboard</span>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={register()}
                                                className="inline-flex items-center gap-2.5 rounded-xl bg-[#123524] px-7 py-4 text-base font-bold text-white shadow-sm hover:bg-[#1a4430] dark:bg-[#bcf7b7] dark:text-[#06140b] dark:hover:bg-[#a6ec9f]"
                                            >
                                                <span>
                                                    Start your store free
                                                </span>
                                                <ArrowRight className="size-5" />
                                            </Link>
                                            <a
                                                href="#features-carousel"
                                                className="inline-flex items-center gap-2 rounded-xl border border-[#eaeaf2] bg-white px-6 py-4 text-base font-bold text-[#123524] shadow-sm hover:border-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef]"
                                            >
                                                <Layers className="size-5 text-[#2f6b3f] dark:text-[#bcf7b7]" />
                                                <span>Explore Features</span>
                                            </a>
                                        </>
                                    )}
                                </div>

                                {/* Three Solid Core Highlights */}
                                <div className="grid grid-cols-1 gap-4 border-t border-[#eaeaf2] pt-4 sm:grid-cols-3 dark:border-[#1a2a1e]">
                                    <div className="rounded-xl border border-[#eaeaf2] bg-white p-3.5 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                                        <div className="flex items-center gap-2 text-xs font-bold text-[#2f6b3f] dark:text-[#bcf7b7]">
                                            <CheckCircle2 className="size-4" />
                                            <span>Multi-Category</span>
                                        </div>
                                        <p className="mt-1 text-xs text-[#636171] dark:text-[#9FB8A4]">
                                            Bundle multiple categories into one
                                            link
                                        </p>
                                    </div>
                                    <div className="rounded-xl border border-[#eaeaf2] bg-white p-3.5 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                                        <div className="flex items-center gap-2 text-xs font-bold text-[#2f6b3f] dark:text-[#bcf7b7]">
                                            <CheckCircle2 className="size-4" />
                                            <span>Click Tracking</span>
                                        </div>
                                        <p className="mt-1 text-xs text-[#636171] dark:text-[#9FB8A4]">
                                            Count visits per link in real-time
                                        </p>
                                    </div>
                                    <div className="rounded-xl border border-[#eaeaf2] bg-white p-3.5 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                                        <div className="flex items-center gap-2 text-xs font-bold text-[#2f6b3f] dark:text-[#bcf7b7]">
                                            <CheckCircle2 className="size-4" />
                                            <span>Zero Bloat</span>
                                        </div>
                                        <p className="mt-1 text-xs text-[#636171] dark:text-[#9FB8A4]">
                                            Fast mobile catalog for buyers
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Platform Overview Card */}
                            <div className="lg:col-span-5">
                                <div className="rounded-3xl border border-[#eaeaf2] bg-white p-6 shadow-sm dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                                    <div className="flex items-center justify-between border-b border-[#eaeaf2] pb-4 dark:border-[#1a2a1e]">
                                        <div className="flex items-center gap-2">
                                            <div className="flex size-8 items-center justify-center rounded-lg bg-[#123524] text-sm font-extrabold text-[#bcf7b7]">
                                                NF
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#123524] dark:text-[#edf7ef]">
                                                    Nova Flow Storefront
                                                </p>
                                                <p className="text-[11px] text-[#636171] dark:text-[#9FB8A4]">
                                                    Boutique Creator Suite
                                                </p>
                                            </div>
                                        </div>
                                        <span className="rounded-full bg-[#e9fbe7] px-2.5 py-1 text-xs font-bold text-[#123524] dark:bg-[#123524] dark:text-[#bcf7b7]">
                                            ● Live Engine
                                        </span>
                                    </div>

                                    {/* Feature Cards Grid */}
                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <div className="rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] p-3.5 dark:border-[#1a2a1e] dark:bg-[#050806]">
                                            <span className="text-xs text-[#636171] dark:text-[#9FB8A4]">
                                                Link Engine
                                            </span>
                                            <p className="mt-1 text-sm font-bold text-[#123524] dark:text-[#edf7ef]">
                                                Category Bundles
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] p-3.5 dark:border-[#1a2a1e] dark:bg-[#050806]">
                                            <span className="text-xs text-[#636171] dark:text-[#9FB8A4]">
                                                Storefronts
                                            </span>
                                            <p className="mt-1 text-sm font-bold text-[#123524] dark:text-[#edf7ef]">
                                                Mobile First
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] p-3.5 dark:border-[#1a2a1e] dark:bg-[#050806]">
                                            <span className="text-xs text-[#636171] dark:text-[#9FB8A4]">
                                                Analytics
                                            </span>
                                            <p className="mt-1 text-sm font-bold text-[#123524] dark:text-[#edf7ef]">
                                                Live Click Counts
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] p-3.5 dark:border-[#1a2a1e] dark:bg-[#050806]">
                                            <span className="text-xs text-[#636171] dark:text-[#9FB8A4]">
                                                Inventory
                                            </span>
                                            <p className="mt-1 text-sm font-bold text-[#2f6b3f] dark:text-[#bcf7b7]">
                                                Auto Stock Warnings
                                            </p>
                                        </div>
                                    </div>

                                    {/* Active Link Item Preview */}
                                    <div className="mt-4 rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] p-3.5 dark:border-[#1a2a1e] dark:bg-[#050806]">
                                        <div className="flex items-center justify-between text-xs font-semibold text-[#636171] dark:text-[#9FB8A4]">
                                            <span>Clean Link Compiling</span>
                                            <span className="text-[#2f6b3f] dark:text-[#bcf7b7]">
                                                One URL
                                            </span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between rounded-lg border border-[#eaeaf2] bg-white px-3 py-2 font-mono text-xs text-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef]">
                                            <span>
                                                novaflow.com/your-store/summer-drop
                                            </span>
                                            <span className="rounded bg-[#e9fbe7] px-2 py-0.5 font-sans text-[10px] font-bold text-[#123524] dark:bg-[#123524] dark:text-[#bcf7b7]">
                                                Ready
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Redesigned Core Features Slide/Carousel Showcase (No Site Data, Pure Visual Feature Slides) */}
                <section
                    id="features-carousel"
                    className="border-b border-[#eaeaf2] bg-white py-20 sm:py-28 dark:border-[#1a2a1e] dark:bg-[#08100a]"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div className="max-w-2xl">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9fbe7] px-3.5 py-1 text-xs font-bold tracking-wider text-[#123524] uppercase dark:bg-[#123524] dark:text-[#bcf7b7]">
                                    <Layers className="size-3.5" />
                                    <span>Core Platform Capabilities</span>
                                </span>
                                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#123524] sm:text-5xl dark:text-[#edf7ef]">
                                    What Nova Flow offers your business.
                                </h2>
                                <p className="mt-4 text-lg text-[#636171] dark:text-[#9FB8A4]">
                                    Explore the five pillar features that power
                                    the Nova Flow commerce experience.
                                </p>
                            </div>

                            {/* Carousel Navigation Buttons */}
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={prevSlide}
                                    className="flex size-11 items-center justify-center rounded-xl border border-[#eaeaf2] bg-white text-[#123524] shadow-sm transition hover:bg-[#f4f4fa] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef] dark:hover:bg-[#14291b]"
                                    aria-label="Previous feature slide"
                                >
                                    <ChevronLeft className="size-5" />
                                </button>
                                <span className="font-mono text-xs font-bold text-[#636171] dark:text-[#9FB8A4]">
                                    {String(currentSlideIndex + 1).padStart(
                                        2,
                                        '0',
                                    )}{' '}
                                    /{' '}
                                    {String(FEATURE_SLIDES.length).padStart(
                                        2,
                                        '0',
                                    )}
                                </span>
                                <button
                                    type="button"
                                    onClick={nextSlide}
                                    className="flex size-11 items-center justify-center rounded-xl border border-[#eaeaf2] bg-white text-[#123524] shadow-sm transition hover:bg-[#f4f4fa] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef] dark:hover:bg-[#14291b]"
                                    aria-label="Next feature slide"
                                >
                                    <ChevronRight className="size-5" />
                                </button>
                            </div>
                        </div>

                        {/* Slide Selector Tabs */}
                        <div className="mt-8 flex flex-wrap gap-2 border-b border-[#eaeaf2] pb-4 dark:border-[#1a2a1e]">
                            {FEATURE_SLIDES.map((slide, idx) => (
                                <button
                                    key={slide.id}
                                    type="button"
                                    onClick={() => setCurrentSlideIndex(idx)}
                                    className={`rounded-xl px-4 py-2 text-xs font-bold transition ${currentSlideIndex === idx
                                            ? 'bg-[#123524] text-white shadow-sm dark:bg-[#bcf7b7] dark:text-[#06140b]'
                                            : 'border border-[#eaeaf2] bg-white text-[#636171] hover:text-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#9FB8A4] dark:hover:text-[#edf7ef]'
                                        }`}
                                >
                                    {slide.tabLabel}
                                </button>
                            ))}
                        </div>

                        {/* Active Feature Slide Presentation (No site data, purely visual representation of capability) */}
                        <div className="mt-10 rounded-3xl border border-[#eaeaf2] bg-[#f4f4fa] p-8 sm:p-12 lg:p-14 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                                {/* Slide Text Content (Left) */}
                                <div className="space-y-5 lg:col-span-6">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-[#2f6b3f] shadow-sm dark:bg-[#123524] dark:text-[#bcf7b7]">
                                        {activeSlide.badge}
                                    </span>
                                    <h3 className="text-2xl leading-tight font-extrabold text-[#123524] sm:text-4xl dark:text-[#edf7ef]">
                                        {activeSlide.title}
                                    </h3>
                                    <p className="text-base leading-relaxed text-[#636171] sm:text-lg dark:text-[#9FB8A4]">
                                        {activeSlide.description}
                                    </p>

                                    {/* Action Footnote */}
                                    <div className="flex items-center gap-4 pt-2 text-xs font-bold text-[#123524] dark:text-[#edf7ef]">
                                        <div className="flex items-center gap-1.5 text-[#2f6b3f] dark:text-[#bcf7b7]">
                                            <CheckCircle2 className="size-4" />
                                            <span>
                                                Integrated in all accounts
                                            </span>
                                        </div>
                                        <span>·</span>
                                        <span>No setup fees</span>
                                    </div>
                                </div>

                                {/* Slide Visual Illustration (Right) */}
                                <div className="lg:col-span-6">
                                    {activeSlide.renderVisual()}
                                </div>
                            </div>

                            {/* Carousel Indicator Dots */}
                            <div className="mt-10 flex items-center justify-center gap-2 border-t border-[#eaeaf2] pt-6 dark:border-[#1a2a1e]">
                                {FEATURE_SLIDES.map((_, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() =>
                                            setCurrentSlideIndex(idx)
                                        }
                                        className={`size-2.5 rounded-full transition-all ${currentSlideIndex === idx
                                                ? 'w-8 bg-[#123524] dark:bg-[#bcf7b7]'
                                                : 'bg-[#eaeaf2] hover:bg-[#636171] dark:bg-[#1a2a1e]'
                                            }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Creative Storefronts & Real-World Use Cases */}
                <section
                    id="storefronts"
                    className="border-b border-[#eaeaf2] bg-[#f4f4fa] py-20 sm:py-28 dark:border-[#1a2a1e] dark:bg-[#050806]"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9fbe7] px-3.5 py-1 text-xs font-bold tracking-wider text-[#123524] uppercase dark:bg-[#123524] dark:text-[#bcf7b7]">
                                <Globe className="size-3.5" />
                                <span>Creative Commerce In Practice</span>
                            </span>
                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#123524] sm:text-5xl dark:text-[#edf7ef]">
                                How sellers use compiled links to sell more with
                                less friction.
                            </h2>
                            <p className="mt-4 text-lg text-[#636171] dark:text-[#9FB8A4]">
                                Nova Flow isn't just an inventory grid. It is an
                                agile link engine built for modern social
                                sellers, pop-up artisans, and boutique creators.
                            </p>
                        </div>

                        {/* 4 Creative Storefront Use Case Cards */}
                        <div className="mt-14 grid gap-8 md:grid-cols-2">
                            {STOREFRONT_USE_CASES.map((item, idx) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={idx}
                                        className="rounded-3xl border border-[#eaeaf2] bg-white p-8 shadow-sm dark:border-[#1a2a1e] dark:bg-[#0b120d]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex size-11 items-center justify-center rounded-xl bg-[#e9fbe7] text-[#123524] dark:bg-[#123524] dark:text-[#bcf7b7]">
                                                <Icon className="size-5" />
                                            </div>
                                            <span className="rounded-full bg-[#f4f4fa] px-3 py-1 text-xs font-bold text-[#123524] dark:bg-[#050806] dark:text-[#edf7ef]">
                                                {item.badge}
                                            </span>
                                        </div>

                                        <h3 className="mt-5 text-2xl font-bold text-[#123524] dark:text-[#edf7ef]">
                                            {item.title}
                                        </h3>

                                        {/* Scenario */}
                                        <div className="mt-4 rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] p-3.5 text-xs text-[#636171] dark:border-[#1a2a1e] dark:bg-[#050806] dark:text-[#9FB8A4]">
                                            <span className="font-bold text-[#123524] dark:text-[#edf7ef]">
                                                Scenario:{' '}
                                            </span>
                                            {item.scenario}
                                        </div>

                                        {/* Solution */}
                                        <p className="mt-4 text-sm leading-relaxed text-[#636171] dark:text-[#9FB8A4]">
                                            {item.solution}
                                        </p>

                                        {/* Link & Outcome */}
                                        <div className="mt-6 border-t border-[#eaeaf2] pt-5 dark:border-[#1a2a1e]">
                                            <div className="flex items-center justify-between font-mono text-xs text-[#123524] dark:text-[#edf7ef]">
                                                <span className="truncate font-bold text-[#2f6b3f] dark:text-[#bcf7b7]">
                                                    {item.slug}
                                                </span>
                                            </div>
                                            <div className="mt-2 flex items-center gap-2 text-xs font-medium text-[#636171] dark:text-[#9FB8A4]">
                                                <CheckCircle2 className="size-4 text-[#2f6b3f] dark:text-[#bcf7b7]" />
                                                <span>{item.actionLabel}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Section: Improved Multi-Device Prototypes (NO Dark Backgrounds) */}
                <section
                    id="prototypes"
                    className="border-b border-[#eaeaf2] bg-white py-20 sm:py-28 dark:border-[#1a2a1e] dark:bg-[#08100a]"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9fbe7] px-3.5 py-1 text-xs font-bold tracking-wider text-[#123524] uppercase dark:bg-[#123524] dark:text-[#bcf7b7]">
                                Responsive Across Devices
                            </span>
                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#123524] sm:text-5xl dark:text-[#edf7ef]">
                                Clean, seamless design on every device.
                            </h2>
                            <p className="mt-4 text-lg text-[#636171] dark:text-[#9FB8A4]">
                                From comprehensive desktop management to fast
                                on-the-go tablet counters and mobile customer
                                storefronts.
                            </p>

                            {/* Clean Standard Device Switcher */}
                            <div className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-[#eaeaf2] bg-[#f4f4fa] p-1.5 dark:border-[#1a2a1e] dark:bg-[#050806]">
                                <button
                                    type="button"
                                    onClick={() => setActiveDevice('desktop')}
                                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${activeDevice === 'desktop'
                                            ? 'bg-white text-[#123524] shadow-sm dark:bg-[#123524] dark:text-[#bcf7b7]'
                                            : 'text-[#636171] hover:text-[#123524] dark:text-[#9FB8A4] dark:hover:text-[#edf7ef]'
                                        }`}
                                >
                                    <Monitor className="size-4" />
                                    <span>Desktop Dashboard</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveDevice('tablet')}
                                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${activeDevice === 'tablet'
                                            ? 'bg-white text-[#123524] shadow-sm dark:bg-[#123524] dark:text-[#bcf7b7]'
                                            : 'text-[#636171] hover:text-[#123524] dark:text-[#9FB8A4] dark:hover:text-[#edf7ef]'
                                        }`}
                                >
                                    <Tablet className="size-4" />
                                    <span>Tablet (Clean Mockup)</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveDevice('mobile')}
                                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${activeDevice === 'mobile'
                                            ? 'bg-white text-[#123524] shadow-sm dark:bg-[#123524] dark:text-[#bcf7b7]'
                                            : 'text-[#636171] hover:text-[#123524] dark:text-[#9FB8A4] dark:hover:text-[#edf7ef]'
                                        }`}
                                >
                                    <Smartphone className="size-4" />
                                    <span>Mobile Phone (Clean Mockup)</span>
                                </button>
                            </div>
                        </div>

                        {/* Device Frame Display (Transparent Clean Mockups — Zero Dark Box Wrapping) */}
                        <div className="mt-12 flex justify-center">
                            {/* Desktop View */}
                            {activeDevice === 'desktop' && (
                                <div className="w-full max-w-5xl rounded-2xl border border-[#eaeaf2] bg-white p-2 shadow-sm dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                                    <div className="flex items-center justify-between border-b border-[#eaeaf2] px-4 py-2.5 dark:border-[#1a2a1e]">
                                        <div className="flex gap-1.5">
                                            <span className="size-2.5 rounded-full bg-[#eaeaf2] dark:bg-[#1a2a1e]" />
                                            <span className="size-2.5 rounded-full bg-[#eaeaf2] dark:bg-[#1a2a1e]" />
                                            <span className="size-2.5 rounded-full bg-[#eaeaf2] dark:bg-[#1a2a1e]" />
                                        </div>
                                        <span className="rounded bg-[#f4f4fa] px-4 py-0.5 font-mono text-xs text-[#636171] dark:bg-[#050806] dark:text-[#9FB8A4]">
                                            https://novaflow.com/dashboard
                                        </span>
                                        <span className="text-xs font-semibold text-[#2f6b3f] dark:text-[#bcf7b7]">
                                            Desktop Suite
                                        </span>
                                    </div>
                                    <img
                                        src="/images/novaflow-homepage/novaflowdesktop.png"
                                        alt="Nova Flow Desktop View"
                                        className="w-full rounded-xl object-contain"
                                    />
                                </div>
                            )}

                            {/* Tablet View (Clean transparent mockup — no dark devtools background) */}
                            {activeDevice === 'tablet' && (
                                <div className="flex flex-col items-center">
                                    <div className="rounded-3xl border border-[#eaeaf2] bg-[#f4f4fa] p-6 shadow-sm dark:border-[#1a2a1e] dark:bg-[#050806]">
                                        <img
                                            src="/images/novaflow-homepage/novaflowtablet-clean.png"
                                            alt="Nova Flow Tablet Clean View"
                                            className="max-h-[720px] w-auto object-contain drop-shadow-md"
                                        />
                                    </div>
                                    <p className="mt-4 text-xs font-medium text-[#636171] dark:text-[#9FB8A4]">
                                        Full tablet layout with collapsible
                                        sidebar and touch-friendly controls.
                                    </p>
                                </div>
                            )}

                            {/* Mobile View (Clean transparent mockup — no dark devtools background) */}
                            {activeDevice === 'mobile' && (
                                <div className="flex flex-col items-center">
                                    <div className="rounded-3xl border border-[#eaeaf2] bg-[#f4f4fa] p-6 shadow-sm dark:border-[#1a2a1e] dark:bg-[#050806]">
                                        <img
                                            src="/images/novaflow-homepage/novsflowmobile-clean.png"
                                            alt="Nova Flow Mobile Clean View"
                                            className="max-h-[640px] w-auto object-contain drop-shadow-md"
                                        />
                                    </div>
                                    <p className="mt-4 text-xs font-medium text-[#636171] dark:text-[#9FB8A4]">
                                        Lightweight mobile storefront with
                                        instant category tabs and click
                                        tracking.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Section: How It Works */}
                <section
                    id="how"
                    className="border-b border-[#eaeaf2] bg-[#f4f4fa] py-20 sm:py-28 dark:border-[#1a2a1e] dark:bg-[#050806]"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9fbe7] px-3.5 py-1 text-xs font-bold tracking-wider text-[#123524] uppercase dark:bg-[#123524] dark:text-[#bcf7b7]">
                                Three Steps
                            </span>
                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#123524] sm:text-5xl dark:text-[#edf7ef]">
                                From product setup to first click in three
                                moves.
                            </h2>
                            <p className="mt-3 text-lg text-[#636171] dark:text-[#9FB8A4]">
                                A straightforward workflow designed so you can
                                start sharing curated links within minutes of
                                signing up.
                            </p>
                        </div>

                        <div className="mt-16 grid gap-8 md:grid-cols-3">
                            <div className="rounded-3xl border border-[#eaeaf2] bg-white p-8 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                                <span className="flex size-10 items-center justify-center rounded-xl bg-[#123524] font-mono text-sm font-bold text-[#bcf7b7] dark:bg-[#bcf7b7] dark:text-[#06140b]">
                                    01
                                </span>
                                <h3 className="mt-6 text-2xl font-bold text-[#123524] dark:text-[#edf7ef]">
                                    List & categorize products
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-[#636171] dark:text-[#9FB8A4]">
                                    Upload images, assign categories, and define
                                    stock. Your complete inventory is stored
                                    securely in your private seller dashboard.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-[#eaeaf2] bg-white p-8 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                                <span className="flex size-10 items-center justify-center rounded-xl bg-[#123524] font-mono text-sm font-bold text-[#bcf7b7] dark:bg-[#bcf7b7] dark:text-[#06140b]">
                                    02
                                </span>
                                <h3 className="mt-6 text-2xl font-bold text-[#123524] dark:text-[#edf7ef]">
                                    Compile categories into a link
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-[#636171] dark:text-[#9FB8A4]">
                                    Pick the exact categories you want to
                                    feature for a drop, set a clean custom slug,
                                    and create your dedicated link in one click.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-[#eaeaf2] bg-white p-8 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                                <span className="flex size-10 items-center justify-center rounded-xl bg-[#123524] font-mono text-sm font-bold text-[#bcf7b7] dark:bg-[#bcf7b7] dark:text-[#06140b]">
                                    03
                                </span>
                                <h3 className="mt-6 text-2xl font-bold text-[#123524] dark:text-[#edf7ef]">
                                    Share & track traffic live
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-[#636171] dark:text-[#9FB8A4]">
                                    Post your link on WhatsApp, Instagram, or
                                    TikTok. Watch clicks increment live on your
                                    analytics dashboard to see which drop wins.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Refined Light Pre-Footer CTA (Light, Airy, Standard Style) */}
                <section className="border-b border-[#eaeaf2] bg-[#f4f4fa] py-16 sm:py-24 dark:border-[#1a2a1e] dark:bg-[#050806]">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-3xl border border-[#eaeaf2] bg-white p-10 text-center shadow-sm sm:p-16 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9fbe7] px-3.5 py-1 text-xs font-bold tracking-wider text-[#123524] uppercase dark:bg-[#123524] dark:text-[#bcf7b7]">
                                START YOUR SHOWCASE
                            </span>
                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#123524] sm:text-5xl dark:text-[#edf7ef]">
                                Give your products a home. Start compiling
                                links.
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#636171] sm:text-lg dark:text-[#9FB8A4]">
                                Join independent artisans, makers, and boutique
                                sellers who simplify sharing and selling with
                                Nova Flow. Free to start, zero setup bloat.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="inline-flex items-center gap-2 rounded-xl bg-[#123524] px-8 py-4 text-base font-bold text-white shadow-sm hover:bg-[#1a4430] dark:bg-[#bcf7b7] dark:text-[#06140b] dark:hover:bg-[#a6ec9f]"
                                    >
                                        <LayoutGrid className="size-5" />
                                        <span>Go to your Dashboard</span>
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={register()}
                                            className="inline-flex items-center gap-2 rounded-xl bg-[#123524] px-8 py-4 text-base font-bold text-white shadow-sm hover:bg-[#1a4430] dark:bg-[#bcf7b7] dark:text-[#06140b] dark:hover:bg-[#a6ec9f]"
                                        >
                                            <span>
                                                Create your seller account
                                            </span>
                                            <ArrowRight className="size-5" />
                                        </Link>
                                        <Link
                                            href={login()}
                                            className="inline-flex items-center gap-2 rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] px-8 py-4 text-base font-bold text-[#123524] shadow-sm hover:bg-[#eaeaf2] dark:border-[#1a2a1e] dark:bg-[#050806] dark:text-[#edf7ef]"
                                        >
                                            <span>Sign in</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Professional Light Footer (Light, Airy, Standard Clean Style) */}
                <footer className="bg-white pt-16 pb-12 dark:bg-[#050806]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Top Section: Brand + Navigation Columns */}
                        <div className="grid gap-12 lg:grid-cols-12">
                            {/* Brand Column (Span 4) */}
                            <div className="space-y-4 lg:col-span-4">
                                <AppLogo
                                    textClassName="text-[#123524] dark:text-[#edf7ef]"
                                    iconClassName="size-8"
                                />
                                <p className="max-w-sm text-sm leading-relaxed text-[#716f81] dark:text-[#9FB8A4]">
                                    The category-first commerce platform for
                                    independent sellers and boutique creators.
                                    Compile products into clean, trackable links
                                    and share anywhere.
                                </p>

                                {/* System Status Pill */}
                                <div className="pt-2">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-[#eaeaf2] bg-[#f8f8fc] px-3.5 py-1 text-xs font-medium text-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef]">
                                        <span className="size-2 rounded-full bg-emerald-500" />
                                        <span>All systems operational</span>
                                    </div>
                                </div>
                            </div>

                            {/* 4 Navigation Columns (Span 8) */}
                            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
                                {/* Column 1: Platform */}
                                <div className="space-y-3.5">
                                    <h4 className="text-xs font-bold tracking-wider text-[#123524] uppercase dark:text-[#edf7ef]">
                                        Platform
                                    </h4>
                                    <ul className="space-y-2.5 text-sm text-[#716f81] dark:text-[#9FB8A4]">
                                        <li>
                                            <a
                                                href="#features-carousel"
                                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Category Links
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#storefronts"
                                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Storefront Engine
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#prototypes"
                                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Responsive App
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#features-carousel"
                                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Click Analytics
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#features-carousel"
                                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Stock Warnings
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Column 2: For Sellers */}
                                <div className="space-y-3.5">
                                    <h4 className="text-xs font-bold tracking-wider text-[#123524] uppercase dark:text-[#edf7ef]">
                                        For Sellers
                                    </h4>
                                    <ul className="space-y-2.5 text-sm text-[#716f81] dark:text-[#9FB8A4]">
                                        <li>
                                            <span className="cursor-default transition hover:text-[#123524] dark:hover:text-[#bcf7b7]">
                                                Artisans & Crafts
                                            </span>
                                        </li>
                                        <li>
                                            <span className="cursor-default transition hover:text-[#123524] dark:hover:text-[#bcf7b7]">
                                                Boutique Fashion
                                            </span>
                                        </li>
                                        <li>
                                            <span className="cursor-default transition hover:text-[#123524] dark:hover:text-[#bcf7b7]">
                                                Jewelry Designers
                                            </span>
                                        </li>
                                        <li>
                                            <span className="cursor-default transition hover:text-[#123524] dark:hover:text-[#bcf7b7]">
                                                Instagram Drops
                                            </span>
                                        </li>
                                        <li>
                                            <span className="cursor-default transition hover:text-[#123524] dark:hover:text-[#bcf7b7]">
                                                WhatsApp Commerce
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Column 3: Resources */}
                                <div className="space-y-3.5">
                                    <h4 className="text-xs font-bold tracking-wider text-[#123524] uppercase dark:text-[#edf7ef]">
                                        Resources
                                    </h4>
                                    <ul className="space-y-2.5 text-sm text-[#716f81] dark:text-[#9FB8A4]">
                                        <li>
                                            <a
                                                href="#how"
                                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                How Links Work
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#storefronts"
                                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Selling Strategies
                                            </a>
                                        </li>
                                        <li>
                                            <Link
                                                href={login()}
                                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Seller Sign In
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={register()}
                                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Create Account
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Column 4: Trust & Data */}
                                <div className="space-y-3.5">
                                    <h4 className="text-xs font-bold tracking-wider text-[#123524] uppercase dark:text-[#edf7ef]">
                                        Trust & Data
                                    </h4>
                                    <ul className="space-y-2.5 text-sm text-[#716f81] dark:text-[#9FB8A4]">
                                        <li>
                                            <span className="cursor-default transition hover:text-[#123524] dark:hover:text-[#bcf7b7]">
                                                Private by Design
                                            </span>
                                        </li>
                                        <li>
                                            <span className="cursor-default transition hover:text-[#123524] dark:hover:text-[#bcf7b7]">
                                                Isolated Tenant Scope
                                            </span>
                                        </li>
                                        <li>
                                            <span className="cursor-default transition hover:text-[#123524] dark:hover:text-[#bcf7b7]">
                                                SSL Encryption
                                            </span>
                                        </li>
                                        <li>
                                            <span className="cursor-default transition hover:text-[#123524] dark:hover:text-[#bcf7b7]">
                                                Terms of Service
                                            </span>
                                        </li>
                                        <li>
                                            <span className="cursor-default transition hover:text-[#123524] dark:hover:text-[#bcf7b7]">
                                                Privacy Policy
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Copyright & Status Bar */}
                        <div className="mt-14 flex flex-col gap-4 border-t border-[#eaeaf2] pt-8 text-xs text-[#716f81] sm:flex-row sm:items-center sm:justify-between dark:border-[#1a2a1e] dark:text-[#9FB8A4]">
                            <p>
                                © {new Date().getFullYear()} Nova Flow Inc. All
                                rights reserved.
                            </p>
                            <div className="flex items-center gap-6">
                                <span>Multi-Tenant Architecture</span>
                                <span>·</span>
                                <span>Category-First Commerce</span>
                                <span>·</span>
                                <span>Boutique Storefronts</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
