import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    Check,
    CheckCircle2,
    Copy,
    Eye,
    Globe,
    Layers,
    LayoutGrid,
    Link2,
    Menu,
    MessageCircle,
    Monitor,
    MousePointerClick,
    Package,
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

interface CategoryItem {
    id: string;
    name: string;
    slug: string;
    productCount: number;
    sampleProduct: string;
    priceRange: string;
}

const AVAILABLE_CATEGORIES: CategoryItem[] = [
    {
        id: 'cat-1',
        name: 'Waistbeads',
        slug: 'waistbeads',
        productCount: 7,
        sampleProduct: 'Vancleef Waistbeads with Chain',
        priceRange: '₦10,000 - ₦25,000',
    },
    {
        id: 'cat-2',
        name: 'Bracelets',
        slug: 'bracelets',
        productCount: 4,
        sampleProduct: 'WHIMSY Glow Bracelet',
        priceRange: '₦6,000 - ₦20,000',
    },
    {
        id: 'cat-3',
        name: 'Necklaces',
        slug: 'necklaces',
        productCount: 5,
        sampleProduct: 'Handcrafted Beaded Choker',
        priceRange: '₦7,000 - ₦30,000',
    },
    {
        id: 'cat-4',
        name: 'Anklets',
        slug: 'anklets',
        productCount: 3,
        sampleProduct: 'Dove Grace Soft Anklet',
        priceRange: '₦4,000 - ₦5,000',
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
        slug: 'novaflow.com/zals/gold-waistbeads-and-bracelets',
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
        slug: 'novaflow.com/zals/summer-artisan-drop',
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
        slug: 'novaflow.com/zals/market-day-showcase',
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
        slug: 'novaflow.com/zals/vip-early-access',
        actionLabel: 'VIPs get first pick → zero public stock confusion',
    },
];

const PLATFORM_FEATURES = [
    {
        number: '01',
        title: 'Category-to-Link Engine',
        description:
            'Combine any combination of categories into a single, clean URL. Each link shows only the items you selected, perfectly compiled.',
        icon: Link2,
    },
    {
        number: '02',
        title: 'Instant Mobile Storefronts',
        description:
            'Customers experience a lightweight, ultra-fast storefront with zero friction, live category filters, and single-item focus modes.',
        icon: Smartphone,
    },
    {
        number: '03',
        title: 'Real-Time Click Tracking',
        description:
            'Every link visit is tracked automatically. Monitor which campaign links, story drops, and custom slugs generate the most interest.',
        icon: MousePointerClick,
    },
    {
        number: '04',
        title: 'Honest Inventory Management',
        description:
            'Upload product imagery, set stock quantities, and adjust pricing. When stock hits low levels, your dashboard alerts you immediately.',
        icon: Package,
    },
    {
        number: '05',
        title: 'Multi-Tenant Data Isolation',
        description:
            'Each seller operates in an isolated environment. Your products, custom links, customer traffic, and analytics belong strictly to you.',
        icon: ShieldCheck,
    },
    {
        number: '06',
        title: 'Portfolio-Grade Presentation',
        description:
            'Designed specifically for makers, artisans, and boutique shops who care about craftsmanship and clean, un-bloated customer presentation.',
        icon: Globe,
    },
];

export default function Welcome() {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDevice, setActiveDevice] = useState<
        'desktop' | 'tablet' | 'mobile'
    >('desktop');
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([
        'cat-1',
        'cat-2',
    ]);
    const [customSlugName, setCustomSlugName] = useState('summer-artisan-drop');
    const [copiedUrl, setCopiedUrl] = useState(false);

    const toggleCategorySelection = (id: string) => {
        setSelectedCategoryIds((prev) => {
            if (prev.includes(id)) {
                if (prev.length === 1) {
                    return prev;
                }

                return prev.filter((item) => item !== id);
            }

            return [...prev, id];
        });
    };

    const selectedCategories = AVAILABLE_CATEGORIES.filter((c) =>
        selectedCategoryIds.includes(c.id),
    );
    const totalCompiledProducts = selectedCategories.reduce(
        (sum, c) => sum + c.productCount,
        0,
    );

    const fullDemoUrl = `novaflow.com/zals-beadworks/${customSlugName || 'custom-collection'}`;

    const handleCopyUrl = () => {
        navigator.clipboard?.writeText(`https://${fullDemoUrl}`);
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2200);
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
                                href="#link-engine"
                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                            >
                                Link Engine
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
                                href="#features"
                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                            >
                                Features
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
                                    href="#link-engine"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-1 hover:text-[#2f6b3f] dark:hover:text-[#bcf7b7]"
                                >
                                    Link Engine
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
                                    href="#features"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-1 hover:text-[#2f6b3f] dark:hover:text-[#bcf7b7]"
                                >
                                    Features
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

                {/* Hero Section (Standard Clean Solid Style — No Gradients) */}
                <section className="border-b border-[#eaeaf2] bg-[#f4f4fa] pt-14 pb-18 sm:pt-20 sm:pb-24 dark:border-[#1a2a1e] dark:bg-[#050806]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                            {/* Left Column: Clear Core Value Proposition */}
                            <div className="space-y-6 lg:col-span-7">
                                <div className="inline-flex items-center gap-2 rounded-full border border-[#2f6b3f] bg-[#e9fbe7] px-3.5 py-1 text-xs font-bold tracking-wider text-[#123524] uppercase dark:border-[#bcf7b7] dark:bg-[#123524] dark:text-[#bcf7b7]">
                                    <Sparkles className="size-3.5 text-[#2f6b3f] dark:text-[#bcf7b7]" />
                                    <span>
                                        Category-to-Link Commerce Platform
                                    </span>
                                </div>

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
                                                href="#link-engine"
                                                className="inline-flex items-center gap-2 rounded-xl border border-[#eaeaf2] bg-white px-6 py-4 text-base font-bold text-[#123524] shadow-sm hover:border-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef]"
                                            >
                                                <Link2 className="size-5 text-[#2f6b3f] dark:text-[#bcf7b7]" />
                                                <span>Try the Link Engine</span>
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

                            {/* Right Column: Clean Structural Overview Card */}
                            <div className="lg:col-span-5">
                                <div className="rounded-3xl border border-[#eaeaf2] bg-white p-6 shadow-sm dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                                    <div className="flex items-center justify-between border-b border-[#eaeaf2] pb-4 dark:border-[#1a2a1e]">
                                        <div className="flex items-center gap-2">
                                            <div className="flex size-8 items-center justify-center rounded-lg bg-[#123524] text-sm font-extrabold text-[#bcf7b7]">
                                                NF
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#123524] dark:text-[#edf7ef]">
                                                    Zal's Beadworks
                                                </p>
                                                <p className="text-[11px] text-[#636171] dark:text-[#9FB8A4]">
                                                    Active Storefront
                                                </p>
                                            </div>
                                        </div>
                                        <span className="rounded-full bg-[#e9fbe7] px-2.5 py-1 text-xs font-bold text-[#123524] dark:bg-[#123524] dark:text-[#bcf7b7]">
                                            ● Live
                                        </span>
                                    </div>

                                    {/* Stats grid */}
                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <div className="rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] p-3.5 dark:border-[#1a2a1e] dark:bg-[#050806]">
                                            <span className="text-xs text-[#636171] dark:text-[#9FB8A4]">
                                                Total Products
                                            </span>
                                            <p className="mt-1 text-2xl font-black text-[#123524] dark:text-[#edf7ef]">
                                                19
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] p-3.5 dark:border-[#1a2a1e] dark:bg-[#050806]">
                                            <span className="text-xs text-[#636171] dark:text-[#9FB8A4]">
                                                Categories
                                            </span>
                                            <p className="mt-1 text-2xl font-black text-[#123524] dark:text-[#edf7ef]">
                                                4
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] p-3.5 dark:border-[#1a2a1e] dark:bg-[#050806]">
                                            <span className="text-xs text-[#636171] dark:text-[#9FB8A4]">
                                                Generated Links
                                            </span>
                                            <p className="mt-1 text-2xl font-black text-[#123524] dark:text-[#edf7ef]">
                                                3
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] p-3.5 dark:border-[#1a2a1e] dark:bg-[#050806]">
                                            <span className="text-xs text-[#636171] dark:text-[#9FB8A4]">
                                                Total Link Clicks
                                            </span>
                                            <p className="mt-1 text-2xl font-black text-[#2f6b3f] dark:text-[#bcf7b7]">
                                                4
                                            </p>
                                        </div>
                                    </div>

                                    {/* Active Link Item */}
                                    <div className="mt-4 rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] p-3.5 dark:border-[#1a2a1e] dark:bg-[#050806]">
                                        <div className="flex items-center justify-between text-xs font-semibold text-[#636171] dark:text-[#9FB8A4]">
                                            <span>Featured Drop Link</span>
                                            <span className="text-[#2f6b3f] dark:text-[#bcf7b7]">
                                                3 clicks (75%)
                                            </span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between rounded-lg border border-[#eaeaf2] bg-white px-3 py-2 font-mono text-xs text-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef]">
                                            <span>/exclusive-waist-beads</span>
                                            <span className="rounded bg-[#e9fbe7] px-2 py-0.5 font-sans text-[10px] font-bold text-[#123524] dark:bg-[#123524] dark:text-[#bcf7b7]">
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Interactive Category-to-Link Engine Studio (The Core Mechanism of Nova Flow) */}
                <section
                    id="link-engine"
                    className="border-b border-[#eaeaf2] bg-white py-20 sm:py-28 dark:border-[#1a2a1e] dark:bg-[#08100a]"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9fbe7] px-3.5 py-1 text-xs font-bold tracking-wider text-[#123524] uppercase dark:bg-[#123524] dark:text-[#bcf7b7]">
                                <Layers className="size-3.5" />
                                <span>The Core Feature</span>
                            </span>
                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#123524] sm:text-5xl dark:text-[#edf7ef]">
                                Select categories. Put them into a link. Share
                                with one tap.
                            </h2>
                            <p className="mt-4 text-lg text-[#636171] dark:text-[#9FB8A4]">
                                Try the interactive simulator below: check or
                                uncheck categories to see how Nova Flow compiles
                                your products into a clean custom link with
                                instant storefront preview.
                            </p>
                        </div>

                        {/* Interactive Link Composer Studio */}
                        <div className="mt-14 grid items-start gap-8 lg:grid-cols-12">
                            {/* Left Side: Seller Controls */}
                            <div className="rounded-3xl border border-[#eaeaf2] bg-[#f4f4fa] p-6 sm:p-8 lg:col-span-6 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                                <div className="flex items-center justify-between border-b border-[#eaeaf2] pb-4 dark:border-[#1a2a1e]">
                                    <div className="flex items-center gap-2">
                                        <span className="flex size-7 items-center justify-center rounded-lg bg-[#123524] text-xs font-bold text-white dark:bg-[#bcf7b7] dark:text-[#06140b]">
                                            1
                                        </span>
                                        <h3 className="font-bold text-[#123524] dark:text-[#edf7ef]">
                                            Choose Categories to Compile
                                        </h3>
                                    </div>
                                    <span className="text-xs text-[#636171] dark:text-[#9FB8A4]">
                                        {selectedCategoryIds.length} selected
                                    </span>
                                </div>

                                {/* Category Selection Checkboxes */}
                                <div className="mt-6 space-y-3">
                                    {AVAILABLE_CATEGORIES.map((cat) => {
                                        const isSelected =
                                            selectedCategoryIds.includes(
                                                cat.id,
                                            );

                                        return (
                                            <div
                                                key={cat.id}
                                                onClick={() =>
                                                    toggleCategorySelection(
                                                        cat.id,
                                                    )
                                                }
                                                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${
                                                    isSelected
                                                        ? 'border-[#2f6b3f] bg-white dark:border-[#bcf7b7] dark:bg-[#123524]/40'
                                                        : 'border-[#eaeaf2] bg-white/60 hover:bg-white dark:border-[#1a2a1e] dark:bg-[#050806] dark:hover:bg-[#0f1a12]'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`flex size-5 items-center justify-center rounded-md border ${
                                                            isSelected
                                                                ? 'border-[#123524] bg-[#123524] text-white dark:border-[#bcf7b7] dark:bg-[#bcf7b7] dark:text-[#06140b]'
                                                                : 'border-[#eaeaf2] bg-white dark:border-[#1a2a1e] dark:bg-[#08100a]'
                                                        }`}
                                                    >
                                                        {isSelected && (
                                                            <Check className="size-3.5" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#123524] dark:text-[#edf7ef]">
                                                            {cat.name}
                                                        </p>
                                                        <p className="text-xs text-[#636171] dark:text-[#9FB8A4]">
                                                            Sample:{' '}
                                                            {cat.sampleProduct}{' '}
                                                            ({cat.priceRange})
                                                        </p>
                                                    </div>
                                                </div>

                                                <span className="rounded-lg bg-[#f4f4fa] px-2.5 py-1 text-xs font-bold text-[#123524] dark:bg-[#050806] dark:text-[#edf7ef]">
                                                    {cat.productCount} items
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Step 2: Slug Customizer */}
                                <div className="mt-6 border-t border-[#eaeaf2] pt-6 dark:border-[#1a2a1e]">
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="flex size-7 items-center justify-center rounded-lg bg-[#123524] text-xs font-bold text-white dark:bg-[#bcf7b7] dark:text-[#06140b]">
                                            2
                                        </span>
                                        <label
                                            htmlFor="slug-input"
                                            className="text-sm font-bold text-[#123524] dark:text-[#edf7ef]"
                                        >
                                            Customize Your Link Slug
                                        </label>
                                    </div>

                                    <div className="flex items-center rounded-xl border border-[#eaeaf2] bg-white px-3 py-2 dark:border-[#1a2a1e] dark:bg-[#050806]">
                                        <span className="font-mono text-xs text-[#636171] dark:text-[#9FB8A4]">
                                            novaflow.com/zals/
                                        </span>
                                        <input
                                            id="slug-input"
                                            type="text"
                                            value={customSlugName}
                                            onChange={(e) =>
                                                setCustomSlugName(
                                                    e.target.value
                                                        .toLowerCase()
                                                        .replace(
                                                            /[^a-z0-9-]/g,
                                                            '-',
                                                        ),
                                                )
                                            }
                                            className="w-full bg-transparent px-1 font-mono text-xs font-bold text-[#123524] outline-none dark:text-[#bcf7b7]"
                                            placeholder="custom-collection-name"
                                        />
                                    </div>
                                </div>

                                {/* Step 3: Copy / Share URL Button */}
                                <div className="mt-6 border-t border-[#eaeaf2] pt-6 dark:border-[#1a2a1e]">
                                    <button
                                        type="button"
                                        onClick={handleCopyUrl}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#123524] py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#1a4430] dark:bg-[#bcf7b7] dark:text-[#06140b] dark:hover:bg-[#a6ec9f]"
                                    >
                                        {copiedUrl ? (
                                            <Check className="size-4" />
                                        ) : (
                                            <Copy className="size-4" />
                                        )}
                                        <span>
                                            {copiedUrl
                                                ? 'Copied to Clipboard!'
                                                : 'Copy Shareable Storefront Link'}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Right Side: What the Customer Sees in That Generated Link */}
                            <div className="rounded-3xl border border-[#eaeaf2] bg-white p-6 sm:p-8 lg:col-span-6 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                                <div className="flex items-center justify-between border-b border-[#eaeaf2] pb-4 dark:border-[#1a2a1e]">
                                    <div className="flex items-center gap-2">
                                        <Eye className="size-5 text-[#2f6b3f] dark:text-[#bcf7b7]" />
                                        <h3 className="font-bold text-[#123524] dark:text-[#edf7ef]">
                                            Live Customer View of This Link
                                        </h3>
                                    </div>
                                    <span className="rounded-full bg-[#e9fbe7] px-3 py-1 text-xs font-bold text-[#123524] dark:bg-[#123524] dark:text-[#bcf7b7]">
                                        {totalCompiledProducts} Products
                                        Compiled
                                    </span>
                                </div>

                                {/* Active URL Address Bar */}
                                <div className="mt-5 flex items-center justify-between rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] px-3.5 py-2.5 font-mono text-xs text-[#123524] dark:border-[#1a2a1e] dark:bg-[#050806] dark:text-[#edf7ef]">
                                    <div className="flex items-center gap-2 truncate">
                                        <Globe className="size-4 shrink-0 text-[#2f6b3f] dark:text-[#bcf7b7]" />
                                        <span className="truncate">
                                            https://{fullDemoUrl}
                                        </span>
                                    </div>
                                    <span className="shrink-0 font-sans text-[11px] font-bold text-[#2f6b3f] dark:text-[#bcf7b7]">
                                        Instant View
                                    </span>
                                </div>

                                {/* Simulated Storefront Header */}
                                <div className="mt-6 rounded-2xl border border-[#eaeaf2] bg-[#f4f4fa] p-5 dark:border-[#1a2a1e] dark:bg-[#050806]">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-[#2f6b3f] uppercase dark:text-[#bcf7b7]">
                                                Artisan Collection
                                            </p>
                                            <h4 className="mt-1 text-xl font-extrabold text-[#123524] dark:text-[#edf7ef]">
                                                Zal's Beadworks
                                            </h4>
                                            <p className="mt-1 text-xs text-[#636171] dark:text-[#9FB8A4]">
                                                Compiled categories:{' '}
                                                {selectedCategories
                                                    .map((c) => c.name)
                                                    .join(' & ')}
                                            </p>
                                        </div>
                                        <span className="rounded-lg border border-[#eaeaf2] bg-white px-2.5 py-1 text-xs font-bold text-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef]">
                                            Curated Drop
                                        </span>
                                    </div>

                                    {/* Category Filter Badges */}
                                    <div className="mt-4 flex flex-wrap items-center gap-2">
                                        <span className="rounded-lg bg-[#123524] px-3 py-1 text-xs font-bold text-white dark:bg-[#bcf7b7] dark:text-[#06140b]">
                                            All in this link (
                                            {totalCompiledProducts})
                                        </span>
                                        {selectedCategories.map((c) => (
                                            <span
                                                key={c.id}
                                                className="rounded-lg border border-[#eaeaf2] bg-white px-3 py-1 text-xs font-medium text-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef]"
                                            >
                                                {c.name} ({c.productCount})
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Compiled Products Showcase within the Link */}
                                <div className="mt-5 space-y-3">
                                    {selectedCategories.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className="flex items-center justify-between rounded-xl border border-[#eaeaf2] bg-white p-3.5 dark:border-[#1a2a1e] dark:bg-[#050806]"
                                        >
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="rounded bg-[#e9fbe7] px-2 py-0.5 text-[10px] font-bold text-[#123524] dark:bg-[#123524] dark:text-[#bcf7b7]">
                                                        {cat.name}
                                                    </span>
                                                    <p className="text-sm font-bold text-[#123524] dark:text-[#edf7ef]">
                                                        {cat.sampleProduct}
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-xs text-[#636171] dark:text-[#9FB8A4]">
                                                    Direct Product Link:{' '}
                                                    <span className="font-mono">
                                                        /zals/{cat.slug}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-xs font-bold text-[#123524] dark:text-[#edf7ef]">
                                                    {cat.priceRange}
                                                </p>
                                                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                                    In Stock
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Link Analytics Indicator */}
                                <div className="mt-6 flex items-center justify-between rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] px-4 py-3 text-xs dark:border-[#1a2a1e] dark:bg-[#050806]">
                                    <div className="flex items-center gap-2 text-[#636171] dark:text-[#9FB8A4]">
                                        <BarChart3 className="size-4 text-[#2f6b3f] dark:text-[#bcf7b7]" />
                                        <span>
                                            Traffic to this link increments live
                                            in your private dashboard
                                        </span>
                                    </div>
                                    <span className="font-bold text-[#2f6b3f] dark:text-[#bcf7b7]">
                                        Auto-Tracked
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Creative Storefronts & Real-World Use Cases (Remodeled Section!) */}
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

                                        {/* Real-world Scenario */}
                                        <div className="mt-4 rounded-xl border border-[#eaeaf2] bg-[#f4f4fa] p-3.5 text-xs text-[#636171] dark:border-[#1a2a1e] dark:bg-[#050806] dark:text-[#9FB8A4]">
                                            <span className="font-bold text-[#123524] dark:text-[#edf7ef]">
                                                Scenario:{' '}
                                            </span>
                                            {item.scenario}
                                        </div>

                                        {/* The Nova Flow Solution */}
                                        <p className="mt-4 text-sm leading-relaxed text-[#636171] dark:text-[#9FB8A4]">
                                            {item.solution}
                                        </p>

                                        {/* Mock Link & Result */}
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
                                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                                        activeDevice === 'desktop'
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
                                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                                        activeDevice === 'tablet'
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
                                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                                        activeDevice === 'mobile'
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

                {/* Section: Comprehensive Platform Features (Clean Solid Cards) */}
                <section
                    id="features"
                    className="border-b border-[#eaeaf2] bg-[#f4f4fa] py-20 sm:py-28 dark:border-[#1a2a1e] dark:bg-[#050806]"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9fbe7] px-3.5 py-1 text-xs font-bold tracking-wider text-[#123524] uppercase dark:bg-[#123524] dark:text-[#bcf7b7]">
                                Platform Architecture
                            </span>
                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#123524] sm:text-5xl dark:text-[#edf7ef]">
                                Everything a seller needs. Nothing they don't.
                            </h2>
                            <p className="mt-4 text-lg text-[#636171] dark:text-[#9FB8A4]">
                                Purposeful tools built to make inventory,
                                multi-category compiling, and customer sharing
                                as simple as copying a link.
                            </p>
                        </div>

                        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {PLATFORM_FEATURES.map((feature) => {
                                const Icon = feature.icon;

                                return (
                                    <div
                                        key={feature.number}
                                        className="rounded-3xl border border-[#eaeaf2] bg-white p-8 shadow-sm transition hover:border-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:hover:border-[#bcf7b7]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex size-11 items-center justify-center rounded-xl bg-[#e9fbe7] text-[#123524] dark:bg-[#123524] dark:text-[#bcf7b7]">
                                                <Icon className="size-5" />
                                            </div>
                                            <span className="font-mono text-sm font-bold text-[#2f6b3f] dark:text-[#bcf7b7]">
                                                {feature.number}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 text-xl font-bold text-[#123524] dark:text-[#edf7ef]">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-[#636171] dark:text-[#9FB8A4]">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Section: How It Works (Step-by-step) */}
                <section
                    id="how"
                    className="border-b border-[#eaeaf2] bg-white py-20 sm:py-28 dark:border-[#1a2a1e] dark:bg-[#08100a]"
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
                            <div className="rounded-3xl border border-[#eaeaf2] bg-[#f4f4fa] p-8 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
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

                            <div className="rounded-3xl border border-[#eaeaf2] bg-[#f4f4fa] p-8 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
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

                            <div className="rounded-3xl border border-[#eaeaf2] bg-[#f4f4fa] p-8 dark:border-[#1a2a1e] dark:bg-[#0b120d]">
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

                {/* Section: Final Call to Action (Solid Clean Style) */}
                <section className="bg-[#123524] py-20 text-center text-white sm:py-28 dark:bg-[#08100a]">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#bcf7b7]/15 px-4 py-1 text-xs font-bold tracking-wider text-[#bcf7b7] uppercase">
                            GET STARTED TODAY
                        </span>
                        <h2 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
                            Give your products a home. Start compiling links.
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#bcf7b7]/80 sm:text-xl">
                            Join independent artisans, makers, and boutique
                            sellers who simplify sharing and selling with Nova
                            Flow.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#bcf7b7] px-8 py-4 text-base font-extrabold text-[#06140b] shadow-sm hover:bg-[#a6ec9f]"
                                >
                                    <LayoutGrid className="size-5" />
                                    <span>Go to your Dashboard</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center gap-2 rounded-xl bg-[#bcf7b7] px-8 py-4 text-base font-extrabold text-[#06140b] shadow-sm hover:bg-[#a6ec9f]"
                                    >
                                        <span>Create your seller account</span>
                                        <ArrowRight className="size-5" />
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-base font-bold text-white hover:bg-white/20"
                                    >
                                        <span>Sign in</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Professional Multi-Column Expanded Footer (Remodeled Footer) */}
                <footer className="border-t border-[#eaeaf2] bg-white pt-16 pb-12 dark:border-[#1a2a1e] dark:bg-[#050806]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Top Section: Brand + Navigation Columns */}
                        <div className="grid gap-12 lg:grid-cols-12">
                            {/* Brand Column (Span 4) */}
                            <div className="space-y-4 lg:col-span-4">
                                <AppLogo
                                    textClassName="text-[#123524] dark:text-[#edf7ef]"
                                    iconClassName="size-8"
                                />
                                <p className="max-w-sm text-sm leading-relaxed text-[#636171] dark:text-[#9FB8A4]">
                                    The category-first commerce platform for
                                    independent sellers and boutique creators.
                                    Compile products into clean, trackable links
                                    and share anywhere.
                                </p>

                                {/* System Status Pill */}
                                <div className="pt-2">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-[#eaeaf2] bg-[#f4f4fa] px-3 py-1 text-xs font-semibold text-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef]">
                                        <span className="size-2 rounded-full bg-emerald-500" />
                                        <span>All systems operational</span>
                                    </div>
                                </div>
                            </div>

                            {/* 4 Navigation Columns (Span 8) */}
                            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
                                {/* Column 1: Platform */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold tracking-wider text-[#123524] uppercase dark:text-[#edf7ef]">
                                        Platform
                                    </h4>
                                    <ul className="space-y-2.5 text-sm text-[#636171] dark:text-[#9FB8A4]">
                                        <li>
                                            <a
                                                href="#link-engine"
                                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Link Generator
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#storefronts"
                                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Curated Storefronts
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#features"
                                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Inventory Manager
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#features"
                                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Click Analytics
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#prototypes"
                                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Mobile Architecture
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Column 2: For Sellers */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold tracking-wider text-[#123524] uppercase dark:text-[#edf7ef]">
                                        For Sellers
                                    </h4>
                                    <ul className="space-y-2.5 text-sm text-[#636171] dark:text-[#9FB8A4]">
                                        <li>
                                            <span className="text-[#636171] dark:text-[#9FB8A4]">
                                                Artisans & Crafts
                                            </span>
                                        </li>
                                        <li>
                                            <span className="text-[#636171] dark:text-[#9FB8A4]">
                                                Boutique Fashion
                                            </span>
                                        </li>
                                        <li>
                                            <span className="text-[#636171] dark:text-[#9FB8A4]">
                                                Jewelry & Beadwork
                                            </span>
                                        </li>
                                        <li>
                                            <span className="text-[#636171] dark:text-[#9FB8A4]">
                                                Instagram Sellers
                                            </span>
                                        </li>
                                        <li>
                                            <span className="text-[#636171] dark:text-[#9FB8A4]">
                                                WhatsApp Commerce
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Column 3: Resources */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold tracking-wider text-[#123524] uppercase dark:text-[#edf7ef]">
                                        Resources
                                    </h4>
                                    <ul className="space-y-2.5 text-sm text-[#636171] dark:text-[#9FB8A4]">
                                        <li>
                                            <a
                                                href="#how"
                                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                How Links Work
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#storefronts"
                                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Selling Strategies
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#link-engine"
                                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Category Compiling
                                            </a>
                                        </li>
                                        <li>
                                            <Link
                                                href={login()}
                                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Seller Sign In
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={register()}
                                                className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                            >
                                                Create Account
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Column 4: Trust & Privacy */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold tracking-wider text-[#123524] uppercase dark:text-[#edf7ef]">
                                        Trust & Data
                                    </h4>
                                    <ul className="space-y-2.5 text-sm text-[#636171] dark:text-[#9FB8A4]">
                                        <li>
                                            <span className="text-[#636171] dark:text-[#9FB8A4]">
                                                Private by Design
                                            </span>
                                        </li>
                                        <li>
                                            <span className="text-[#636171] dark:text-[#9FB8A4]">
                                                Isolated Tenant Data
                                            </span>
                                        </li>
                                        <li>
                                            <span className="text-[#636171] dark:text-[#9FB8A4]">
                                                SSL Encryption
                                            </span>
                                        </li>
                                        <li>
                                            <span className="text-[#636171] dark:text-[#9FB8A4]">
                                                Terms of Service
                                            </span>
                                        </li>
                                        <li>
                                            <span className="text-[#636171] dark:text-[#9FB8A4]">
                                                Privacy Policy
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Copyright and Meta Bar */}
                        <div className="mt-14 flex flex-col gap-4 border-t border-[#eaeaf2] pt-8 text-xs text-[#636171] sm:flex-row sm:items-center sm:justify-between dark:border-[#1a2a1e] dark:text-[#9FB8A4]">
                            <p>
                                © {new Date().getFullYear()} Nova Flow. All
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
