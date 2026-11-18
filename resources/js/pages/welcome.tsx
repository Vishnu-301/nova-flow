import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    Bell,
    Boxes,
    Eye,
    Globe,
    LayoutGrid,
    Link2,
    Menu,
    Monitor,
    MousePointerClick,
    Package,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Tablet,
    TrendingUp,
    X,
} from 'lucide-react';
import { useState } from 'react';
import AppLogo from '@/components/app-logo';
import { dashboard, login, register } from '@/routes';

interface SampleProduct {
    id: number;
    name: string;
    category: string;
    categorySlug: string;
    price: string;
    tag: string;
    description: string;
    inStock: boolean;
}

const SAMPLE_PRODUCTS: SampleProduct[] = [
    {
        id: 1,
        name: 'Unique Beaded Necklace',
        category: 'Necklaces',
        categorySlug: 'necklaces',
        price: '₦7,000',
        tag: 'Standout style',
        description:
            'Distinctive handcrafted beaded necklace designed to make a personal statement solo or layered.',
        inStock: true,
    },
    {
        id: 2,
        name: 'WHIMSY Bracelet',
        category: 'Bracelets',
        categorySlug: 'bracelets',
        price: '₦6,000',
        tag: 'Delicate glow',
        description:
            'Delicate glow beads styled for effortless stacking or clean solo wear.',
        inStock: true,
    },
    {
        id: 3,
        name: 'Vancleef Waistbeads with Chain',
        category: 'Waistbeads',
        categorySlug: 'waistbeads',
        price: '₦25,000',
        tag: 'With chain detail',
        description:
            'Black and white waistbeads finished with an artisan metallic chain accent.',
        inStock: true,
    },
    {
        id: 4,
        name: 'Dove Grace Anklet',
        category: 'Anklets',
        categorySlug: 'anklets',
        price: '₦4,000',
        tag: 'Dove detail',
        description:
            'Refined lightweight anklet bringing a soft, graceful statement to everyday outfits.',
        inStock: true,
    },
    {
        id: 5,
        name: 'Fierce Bracelet Set',
        category: 'Bracelets',
        categorySlug: 'bracelets',
        price: '₦20,000',
        tag: "Men's collection",
        description:
            'Bold dual-strand set designed for a confident, structured wrist stack.',
        inStock: true,
    },
    {
        id: 6,
        name: 'Brown & Gold Vancleef',
        category: 'Waistbeads',
        categorySlug: 'waistbeads',
        price: '₦15,000',
        tag: 'Warm polished',
        description:
            'Earth-toned strands accented with gold-plated beads for a rich, warm gleam.',
        inStock: true,
    },
];

const FEATURES = [
    {
        number: '01',
        title: 'Overview dashboard',
        description:
            'One calm screen for live inventory, category distribution, and audience traffic the second you sign in.',
        icon: LayoutGrid,
        color: 'from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-emerald-400',
    },
    {
        number: '02',
        title: 'Product management',
        description:
            'Upload high-res imagery, organize into clean collections, and keep stock counts honest with automatic low-stock alerts.',
        icon: Package,
        color: 'from-blue-500/10 to-indigo-500/10 text-blue-700 dark:text-blue-400',
    },
    {
        number: '03',
        title: 'Personalized links',
        description:
            'Generate custom slugs tied directly to targeted categories. Share them on Instagram, WhatsApp, or TikTok seamlessly.',
        icon: Link2,
        color: 'from-amber-500/10 to-orange-500/10 text-amber-700 dark:text-amber-400',
    },
    {
        number: '04',
        title: 'Real-time analytics',
        description:
            'Visual donut distributions, hourly click milestones, and audience growth charts you can interpret at a glance.',
        icon: BarChart3,
        color: 'from-purple-500/10 to-pink-500/10 text-purple-700 dark:text-purple-400',
    },
    {
        number: '05',
        title: 'Public portfolio gallery',
        description:
            'A boutique digital storefront that feels like a curated gallery. Visitors browse without cumbersome login gates.',
        icon: Globe,
        color: 'from-teal-500/10 to-cyan-500/10 text-teal-700 dark:text-teal-400',
    },
    {
        number: '06',
        title: 'Private by design',
        description:
            "Strict multi-tenant architecture. Every seller's products, customers, and analytics belong exclusively to them.",
        icon: ShieldCheck,
        color: 'from-lime-500/10 to-emerald-500/10 text-lime-700 dark:text-lime-400',
    },
];

const STEPS = [
    {
        step: '01',
        title: 'List your products',
        description:
            'Upload high-resolution photos, tag categories, and set stock levels. Your catalogue goes live in your private dashboard instantly.',
        badge: 'Catalogue setup',
    },
    {
        step: '02',
        title: 'Generate a link',
        description:
            'Select your custom slug, attach the collections you want to highlight, and share it anywhere your audience discovers you.',
        badge: 'Custom URL',
    },
    {
        step: '03',
        title: 'Read the results',
        description:
            'Watch real-time link clicks and orders move on your analytics dashboard, then decide what bestsellers to restock next.',
        badge: 'Growth insights',
    },
];

export default function Welcome() {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDevice, setActiveDevice] = useState<
        'desktop' | 'tablet' | 'mobile'
    >('desktop');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [copiedSlug, setCopiedSlug] = useState(false);

    const filteredProducts =
        selectedCategory === 'all'
            ? SAMPLE_PRODUCTS
            : SAMPLE_PRODUCTS.filter(
                  (p) => p.categorySlug === selectedCategory,
              );

    const handleCopyDemoLink = () => {
        navigator.clipboard?.writeText('https://novaflow.com/zals-beadworks');
        setCopiedSlug(true);
        setTimeout(() => setCopiedSlug(false), 2000);
    };

    return (
        <>
            <Head title="Nova Flow — Multi-Tenant Commerce & Showcase Platform" />

            <div className="min-h-screen bg-[#f4f4fa] font-sans text-[#1c1a24] selection:bg-[#bcf7b7] selection:text-[#123524] dark:bg-[#050806] dark:text-[#edf7ef]">
                {/* Top Navigation */}
                <header className="sticky top-0 z-50 border-b border-[#eaeaf2]/80 bg-[#f4f4fa]/90 backdrop-blur-md transition-colors dark:border-[#1a2a1e] dark:bg-[#050806]/90">
                    <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 transition hover:opacity-95"
                        >
                            <AppLogo
                                textClassName="text-[#123524] dark:text-[#edf7ef]"
                                iconClassName="size-9"
                            />
                        </Link>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#636171] md:flex dark:text-[#9FB8A4]">
                            <a
                                href="#features"
                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                            >
                                Features
                            </a>
                            <a
                                href="#how"
                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                            >
                                How it works
                            </a>
                            <a
                                href="#prototype"
                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                            >
                                Prototypes
                            </a>
                            <a
                                href="#gallery"
                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                            >
                                Gallery
                            </a>
                            <a
                                href="#alerts"
                                className="transition hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                            >
                                Alerts
                            </a>
                        </nav>

                        {/* Auth Action Buttons */}
                        <div className="hidden items-center gap-3 sm:flex">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#123524] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1a4430] dark:bg-[#bcf7b7] dark:text-[#06140b] dark:hover:bg-[#a6ec9f]"
                                >
                                    <LayoutGrid className="size-4" />
                                    <span>Dashboard</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-xl px-4 py-2.5 text-sm font-bold text-[#123524] transition hover:text-[#2f6b3f] dark:text-[#edf7ef] dark:hover:text-[#bcf7b7]"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#123524] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1a4430] dark:bg-[#bcf7b7] dark:text-[#06140b] dark:hover:bg-[#a6ec9f]"
                                    >
                                        <span>Create seller account</span>
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center gap-2 md:hidden">
                            <button
                                type="button"
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="rounded-xl p-2 text-[#123524] hover:bg-black/5 dark:text-[#edf7ef] dark:hover:bg-white/5"
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

                    {/* Mobile Drawer */}
                    {mobileMenuOpen && (
                        <div className="border-b border-[#eaeaf2] bg-white px-5 py-6 sm:px-6 md:hidden dark:border-[#1a2a1e] dark:bg-[#0b120d]">
                            <div className="flex flex-col gap-4 text-base font-semibold text-[#123524] dark:text-[#edf7ef]">
                                <a
                                    href="#features"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-1 transition hover:text-[#2f6b3f] dark:hover:text-[#bcf7b7]"
                                >
                                    Features
                                </a>
                                <a
                                    href="#how"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-1 transition hover:text-[#2f6b3f] dark:hover:text-[#bcf7b7]"
                                >
                                    How it works
                                </a>
                                <a
                                    href="#prototype"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-1 transition hover:text-[#2f6b3f] dark:hover:text-[#bcf7b7]"
                                >
                                    Prototypes
                                </a>
                                <a
                                    href="#gallery"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-1 transition hover:text-[#2f6b3f] dark:hover:text-[#bcf7b7]"
                                >
                                    Gallery
                                </a>
                                <a
                                    href="#alerts"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-1 transition hover:text-[#2f6b3f] dark:hover:text-[#bcf7b7]"
                                >
                                    Alerts
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
                                            <span>Create seller account</span>
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </header>

                {/* Hero Section with Curving Flow Wave Background (Inspired by Reference Image & Novaflow.html) */}
                <section className="relative overflow-hidden bg-gradient-to-b from-[#e9fbe7]/60 via-[#f4f4fa] to-[#f4f4fa] pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-36 dark:from-[#0b1610] dark:via-[#050806] dark:to-[#050806]">
                    {/* Ambient subtle glow */}
                    <div className="pointer-events-none absolute -top-24 left-1/2 h-[450px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#bcf7b7]/30 to-[#2dd4bf]/20 opacity-70 blur-3xl dark:opacity-20" />

                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                            {/* Left Column: Headline and Positioning */}
                            <div className="space-y-6 lg:col-span-7">
                                {/* Eyebrow Tag */}
                                <div className="inline-flex items-center gap-2 rounded-full border border-[#2f6b3f]/20 bg-[#e9fbe7] px-4 py-1.5 text-xs font-bold tracking-wide text-[#123524] dark:border-[#bcf7b7]/30 dark:bg-[#123524]/60 dark:text-[#bcf7b7]">
                                    <Sparkles className="size-3.5 text-[#2f6b3f] dark:text-[#bcf7b7]" />
                                    <span>MULTI-TENANT SELLER PLATFORM</span>
                                </div>

                                <h1 className="text-4xl font-extrabold tracking-tight text-[#123524] sm:text-6xl lg:text-[64px] lg:leading-[1.08] dark:text-[#edf7ef]">
                                    Your shop, your links, your numbers —{' '}
                                    <span className="relative inline-block text-[#2f6b3f] dark:text-[#bcf7b7]">
                                        in one flow.
                                        <svg
                                            className="absolute -bottom-2 left-0 w-full text-[#bcf7b7] dark:text-[#2f6b3f]"
                                            viewBox="0 0 260 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M3 9C60 3 190 3 257 9"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </span>
                                </h1>

                                <p className="max-w-2xl text-lg leading-relaxed text-[#636171] sm:text-xl dark:text-[#9FB8A4]">
                                    Novaflow gives independent sellers a private
                                    dashboard to manage products, generate
                                    trackable links, and read live traffic
                                    analytics — plus a public gallery that shows
                                    the work.
                                </p>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                    {auth.user ? (
                                        <Link
                                            href={dashboard()}
                                            className="inline-flex items-center gap-2.5 rounded-2xl bg-[#123524] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#123524]/15 transition hover:bg-[#1a4430] hover:shadow-xl dark:bg-[#bcf7b7] dark:text-[#06140b] dark:shadow-none dark:hover:bg-[#a6ec9f]"
                                        >
                                            <LayoutGrid className="size-5" />
                                            <span>Open your dashboard</span>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={register()}
                                                className="inline-flex items-center gap-2.5 rounded-2xl bg-[#123524] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#123524]/15 transition hover:bg-[#1a4430] hover:shadow-xl dark:bg-[#bcf7b7] dark:text-[#06140b] dark:shadow-none dark:hover:bg-[#a6ec9f]"
                                            >
                                                <span>Open your dashboard</span>
                                                <ArrowRight className="size-5" />
                                            </Link>
                                            <a
                                                href="#gallery"
                                                className="inline-flex items-center gap-2 rounded-2xl border border-[#eaeaf2] bg-white px-6 py-4 text-base font-bold text-[#123524] shadow-sm transition hover:border-[#123524]/30 hover:bg-[#f9f9fc] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#edf7ef] dark:hover:bg-[#14291b]"
                                            >
                                                <Eye className="size-5 text-[#2f6b3f] dark:text-[#bcf7b7]" />
                                                <span>Browse the gallery</span>
                                            </a>
                                        </>
                                    )}
                                </div>

                                {/* Key Highlights */}
                                <div className="grid grid-cols-3 gap-4 border-t border-[#eaeaf2] pt-6 dark:border-[#1a2a1e]">
                                    <div>
                                        <p className="text-2xl font-black text-[#123524] dark:text-[#edf7ef]">
                                            100%
                                        </p>
                                        <p className="text-xs font-medium text-[#636171] dark:text-[#9FB8A4]">
                                            Private by design
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-[#123524] dark:text-[#edf7ef]">
                                            Instant
                                        </p>
                                        <p className="text-xs font-medium text-[#636171] dark:text-[#9FB8A4]">
                                            Trackable link slugs
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-[#123524] dark:text-[#edf7ef]">
                                            Zero
                                        </p>
                                        <p className="text-xs font-medium text-[#636171] dark:text-[#9FB8A4]">
                                            Bloat or setup fee
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Interactive Mini Dashboard Preview Widget (from novaflow.html) */}
                            <div className="relative lg:col-span-5">
                                <div className="relative mx-auto w-full max-w-lg rounded-3xl border border-[#eaeaf2] bg-white p-6 shadow-2xl shadow-emerald-950/5 dark:border-[#1f3324] dark:bg-[#0b120d] dark:shadow-none">
                                    {/* Mock Browser Dots */}
                                    <div className="flex items-center justify-between border-b border-[#eaeaf2] pb-4 dark:border-[#1a2a1e]">
                                        <div className="flex gap-1.5">
                                            <span className="size-3 rounded-full bg-rose-400" />
                                            <span className="size-3 rounded-full bg-amber-400" />
                                            <span className="size-3 rounded-full bg-emerald-400" />
                                        </div>
                                        <div className="flex items-center gap-1.5 rounded-full bg-[#f4f4fa] px-3 py-1 font-mono text-xs font-medium text-[#636171] dark:bg-[#123524] dark:text-[#bcf7b7]">
                                            <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                                            <span>zalum.novaflow.com</span>
                                        </div>
                                    </div>

                                    {/* Simulated Dashboard Content */}
                                    <div className="mt-5 grid grid-cols-12 gap-4">
                                        {/* Left Mini Sidebar */}
                                        <div className="col-span-4 flex flex-col justify-between rounded-2xl bg-[#123524] p-3 text-white">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex size-6 items-center justify-center rounded-lg bg-[#bcf7b7] text-xs font-black text-[#123524]">
                                                        N
                                                    </div>
                                                    <span className="text-xs font-extrabold tracking-tight">
                                                        Nova Flow
                                                    </span>
                                                </div>
                                                <div className="space-y-1.5 pt-2">
                                                    <div className="rounded-lg bg-[#bcf7b7] px-2 py-1 text-[11px] font-bold text-[#123524]">
                                                        Overview
                                                    </div>
                                                    <div className="rounded-lg px-2 py-1 text-[11px] text-white/70">
                                                        Products (19)
                                                    </div>
                                                    <div className="rounded-lg px-2 py-1 text-[11px] text-white/70">
                                                        Links (3)
                                                    </div>
                                                    <div className="rounded-lg px-2 py-1 text-[11px] text-white/70">
                                                        Settings
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 text-[10px] text-white/50">
                                                Zal's Beadworks
                                            </div>
                                        </div>

                                        {/* Right Mini Stats & Charts */}
                                        <div className="col-span-8 space-y-3">
                                            {/* Donut Category Breakdown Card */}
                                            <div className="rounded-2xl border border-[#eaeaf2] bg-[#f4f4fa] p-3 dark:border-[#1a2a1e] dark:bg-[#0f1a12]">
                                                <div className="flex items-center gap-3">
                                                    {/* Custom Donut Circle */}
                                                    <div
                                                        className="size-14 flex-shrink-0 rounded-full"
                                                        style={{
                                                            background:
                                                                'conic-gradient(#2f6b3f 0% 40%, #2dd4bf 40% 75%, #ffb545 75% 100%)',
                                                            mask: 'radial-gradient(circle 18px, transparent 98%, #000)',
                                                            WebkitMask:
                                                                'radial-gradient(circle 18px, transparent 98%, #000)',
                                                        }}
                                                    />
                                                    <div className="space-y-1 text-[11px] leading-tight font-medium">
                                                        <p className="font-bold text-[#123524] dark:text-[#edf7ef]">
                                                            Inventory Status
                                                        </p>
                                                        <div className="flex items-center gap-1.5 text-[#2f6b3f] dark:text-[#bcf7b7]">
                                                            <span className="size-1.5 rounded-full bg-[#2f6b3f] dark:bg-[#bcf7b7]" />
                                                            <span>
                                                                15 In stock
                                                                (78%)
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-[#636171] dark:text-[#9FB8A4]">
                                                            <span className="size-1.5 rounded-full bg-[#ffb545]" />
                                                            <span>
                                                                4 Low stock
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Link Performance Mini Bars */}
                                            <div className="rounded-2xl border border-[#eaeaf2] bg-[#f4f4fa] p-3 dark:border-[#1a2a1e] dark:bg-[#0f1a12]">
                                                <div className="flex items-center justify-between text-[11px] font-bold text-[#123524] dark:text-[#edf7ef]">
                                                    <span>
                                                        Live Link Clicks
                                                    </span>
                                                    <span className="font-mono text-[#2f6b3f] dark:text-[#bcf7b7]">
                                                        4 clicks today
                                                    </span>
                                                </div>
                                                <div className="mt-2.5 flex h-10 items-end gap-1.5">
                                                    <div className="h-3 flex-1 rounded-md bg-[#2f6b3f]/30 dark:bg-[#2f6b3f]/50" />
                                                    <div className="h-5 flex-1 rounded-md bg-[#2f6b3f]/40 dark:bg-[#2f6b3f]/60" />
                                                    <div className="h-4 flex-1 rounded-md bg-[#2f6b3f]/30 dark:bg-[#2f6b3f]/50" />
                                                    <div className="h-7 flex-1 rounded-md bg-[#2f6b3f]/50 dark:bg-[#2f6b3f]/70" />
                                                    <div className="h-6 flex-1 rounded-md bg-[#2f6b3f]/40 dark:bg-[#2f6b3f]/60" />
                                                    <div className="h-10 flex-1 rounded-md bg-[#2f6b3f] dark:bg-[#bcf7b7]" />
                                                    <div className="h-8 flex-1 rounded-md bg-[#2f6b3f]/70 dark:bg-[#2f6b3f]/90" />
                                                </div>
                                            </div>

                                            {/* Clickable Custom Slug Link Simulator */}
                                            <div
                                                onClick={handleCopyDemoLink}
                                                className="group flex cursor-pointer items-center justify-between rounded-xl border border-[#eaeaf2] bg-white px-3 py-2 font-mono text-xs font-medium transition hover:border-[#2f6b3f] dark:border-[#1a2a1e] dark:bg-[#050806]"
                                            >
                                                <div className="flex items-center gap-1.5 text-[#123524] dark:text-[#edf7ef]">
                                                    <Link2 className="size-3.5 text-[#2f6b3f] dark:text-[#bcf7b7]" />
                                                    <span>
                                                        /exclusive-waistbeads
                                                    </span>
                                                </div>
                                                <span className="font-sans text-[10px] font-bold text-[#2f6b3f] group-hover:underline dark:text-[#bcf7b7]">
                                                    {copiedSlug
                                                        ? 'Copied URL!'
                                                        : 'Click to copy'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Smooth Organic Wave Divider (Connecting Hero to Content Below) */}
                    <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-12 w-full overflow-hidden leading-none">
                        <svg
                            className="relative block h-full w-full text-white dark:text-[#0b120d]"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </section>

                {/* Section: Prototype Showcase / Multi-Device Experience (Using public/images/novaflow-homepage) */}
                <section
                    id="prototype"
                    className="relative bg-white py-20 sm:py-28 dark:bg-[#0b120d]"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9fbe7] px-4 py-1 text-xs font-bold tracking-wider text-[#123524] uppercase dark:bg-[#123524] dark:text-[#bcf7b7]">
                                Real-World Experience
                            </span>
                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#123524] sm:text-5xl dark:text-[#edf7ef]">
                                Crafted for every screen your business touches.
                            </h2>
                            <p className="mt-4 text-lg text-[#636171] dark:text-[#9FB8A4]">
                                Whether managing inventory on desktop or
                                checking link traffic on the go, Nova Flow
                                adapts seamlessly with responsive speed.
                            </p>

                            {/* Device Switcher Controls */}
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
                                    <span>Desktop (Full Dashboard)</span>
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
                                    <span>Tablet (iPad)</span>
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
                                    <span>Mobile (Phone)</span>
                                </button>
                            </div>
                        </div>

                        {/* Device Frame Display with Authentic Prototype Images */}
                        <div className="mt-12 flex justify-center">
                            {activeDevice === 'desktop' && (
                                <div className="w-full max-w-5xl rounded-2xl border border-[#eaeaf2] bg-white p-2 shadow-2xl shadow-emerald-950/10 dark:border-[#1a2a1e] dark:bg-[#08100a]">
                                    <div className="flex items-center gap-2 border-b border-[#eaeaf2] px-4 py-3 dark:border-[#1a2a1e]">
                                        <div className="flex gap-1.5">
                                            <span className="size-3 rounded-full bg-rose-400" />
                                            <span className="size-3 rounded-full bg-amber-400" />
                                            <span className="size-3 rounded-full bg-emerald-400" />
                                        </div>
                                        <span className="mx-auto rounded-lg bg-[#f4f4fa] px-6 py-1 font-mono text-xs text-[#636171] dark:bg-[#123524] dark:text-[#bcf7b7]">
                                            https://novaflow.app/dashboard
                                        </span>
                                    </div>
                                    <img
                                        src="/images/novaflow-homepage/novaflowdesktop.png"
                                        alt="Nova Flow Desktop Prototype Showcase"
                                        className="w-full rounded-xl object-contain"
                                    />
                                </div>
                            )}

                            {activeDevice === 'tablet' && (
                                <div className="w-full max-w-3xl rounded-3xl border-8 border-[#1c1a24] bg-white shadow-2xl dark:border-[#222]">
                                    <img
                                        src="/images/novaflow-homepage/novaflowtablet.png"
                                        alt="Nova Flow Tablet Prototype Showcase"
                                        className="w-full rounded-2xl object-contain"
                                    />
                                </div>
                            )}

                            {activeDevice === 'mobile' && (
                                <div className="w-full max-w-sm overflow-hidden rounded-[42px] border-8 border-[#1c1a24] bg-white shadow-2xl dark:border-[#222]">
                                    <img
                                        src="/images/novaflow-homepage/novsflowmobile.png"
                                        alt="Nova Flow Mobile Prototype Showcase"
                                        className="w-full object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Section: Features Grid (from novaflow.html - "What's inside: Everything a seller needs, nothing they don't") */}
                <section
                    id="features"
                    className="bg-[#f4f4fa] py-20 sm:py-28 dark:bg-[#050806]"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9fbe7] px-4 py-1 text-xs font-bold tracking-wider text-[#123524] uppercase dark:bg-[#123524] dark:text-[#bcf7b7]">
                                WHAT'S INSIDE
                            </span>
                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#123524] sm:text-5xl dark:text-[#edf7ef]">
                                Everything a seller needs, nothing they don't.
                            </h2>
                            <p className="mt-4 text-lg text-[#636171] dark:text-[#9FB8A4]">
                                Thoughtful tooling focused on clarity and
                                actionable metrics, built to help you run your
                                business without unnecessary complexity.
                            </p>
                        </div>

                        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {FEATURES.map((feature) => {
                                const Icon = feature.icon;

                                return (
                                    <div
                                        key={feature.number}
                                        className="group relative rounded-3xl border border-[#eaeaf2] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-[#2f6b3f]/30 hover:shadow-xl dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:hover:border-[#bcf7b7]/30"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#e9fbe7] text-[#123524] dark:bg-[#123524] dark:text-[#bcf7b7]">
                                                <Icon className="size-6" />
                                            </div>
                                            <span className="font-mono text-sm font-extrabold text-[#2f6b3f] dark:text-[#bcf7b7]">
                                                {feature.number}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 text-xl font-bold text-[#123524] dark:text-[#edf7ef]">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-3 text-base leading-relaxed text-[#636171] dark:text-[#9FB8A4]">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Section: How It Works (from novaflow.html - "From first product to first click in three moves") */}
                <section
                    id="how"
                    className="border-y border-[#eaeaf2] bg-white py-20 sm:py-28 dark:border-[#1a2a1e] dark:bg-[#08100a]"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9fbe7] px-4 py-1 text-xs font-bold tracking-wider text-[#123524] uppercase dark:bg-[#123524] dark:text-[#bcf7b7]">
                                HOW IT WORKS
                            </span>
                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#123524] sm:text-5xl dark:text-[#edf7ef]">
                                From first product to first click in three
                                moves.
                            </h2>
                            <p className="mt-3 text-lg text-[#636171] dark:text-[#9FB8A4]">
                                No complicated configuration or technical
                                hurdles. Get your storefront live in minutes.
                            </p>
                        </div>

                        <div className="mt-16 grid gap-8 md:grid-cols-3">
                            {STEPS.map((step, idx) => (
                                <div
                                    key={step.step}
                                    className="relative flex flex-col justify-between rounded-3xl border border-[#eaeaf2] bg-[#f4f4fa] p-8 dark:border-[#1a2a1e] dark:bg-[#0b120d]"
                                >
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <span className="flex size-10 items-center justify-center rounded-xl bg-[#123524] font-mono text-sm font-bold text-[#bcf7b7] dark:bg-[#bcf7b7] dark:text-[#06140b]">
                                                {step.step}
                                            </span>
                                            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#2f6b3f] shadow-sm dark:bg-[#123524] dark:text-[#bcf7b7]">
                                                {step.badge}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 text-2xl font-bold text-[#123524] dark:text-[#edf7ef]">
                                            {step.title}
                                        </h3>
                                        <p className="mt-3 text-base leading-relaxed text-[#636171] dark:text-[#9FB8A4]">
                                            {step.description}
                                        </p>
                                    </div>

                                    {idx < 2 && (
                                        <div className="absolute top-1/2 -right-4 z-10 flex hidden size-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#eaeaf2] bg-white text-[#2f6b3f] shadow-sm md:block dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#bcf7b7]">
                                            <ArrowRight className="m-auto size-4" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section: Public Gallery & Real Product Showcase (from novaflow.html - "A storefront that feels like a portfolio") */}
                <section
                    id="gallery"
                    className="bg-[#f4f4fa] py-20 sm:py-28 dark:bg-[#050806]"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9fbe7] px-4 py-1 text-xs font-bold tracking-wider text-[#123524] uppercase dark:bg-[#123524] dark:text-[#bcf7b7]">
                                    PUBLIC GALLERY
                                </span>
                                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#123524] sm:text-5xl dark:text-[#edf7ef]">
                                    A storefront that feels like a portfolio.
                                </h2>
                                <p className="mt-3 text-lg text-[#636171] dark:text-[#9FB8A4]">
                                    Showcasing real artisan collections from
                                    sellers like{' '}
                                    <span className="font-bold text-[#123524] dark:text-[#edf7ef]">
                                        Zal's Beadworks
                                    </span>
                                    .
                                </p>
                            </div>

                            {/* Category Filter Pills */}
                            <div className="flex flex-wrap items-center gap-2">
                                {[
                                    'all',
                                    'necklaces',
                                    'bracelets',
                                    'waistbeads',
                                    'anklets',
                                ].map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`rounded-xl px-4 py-2 text-xs font-bold capitalize transition ${
                                            selectedCategory === cat
                                                ? 'bg-[#123524] text-white shadow-sm dark:bg-[#bcf7b7] dark:text-[#06140b]'
                                                : 'border border-[#eaeaf2] bg-white text-[#636171] hover:border-[#123524]/20 hover:text-[#123524] dark:border-[#1a2a1e] dark:bg-[#0b120d] dark:text-[#9FB8A4] dark:hover:text-[#edf7ef]'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Cards Grid */}
                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#eaeaf2] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-[#1a2a1e] dark:bg-[#0b120d]"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <span className="rounded-full bg-[#e9fbe7] px-3 py-1 text-xs font-bold text-[#2f6b3f] dark:bg-[#123524] dark:text-[#bcf7b7]">
                                                {prod.category}
                                            </span>
                                            <span className="text-xs font-semibold text-[#636171] dark:text-[#9FB8A4]">
                                                {prod.tag}
                                            </span>
                                        </div>

                                        <h3 className="mt-4 text-xl font-bold text-[#123524] transition-colors group-hover:text-[#2f6b3f] dark:text-[#edf7ef] dark:group-hover:text-[#bcf7b7]">
                                            {prod.name}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-[#636171] dark:text-[#9FB8A4]">
                                            {prod.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-[#eaeaf2] bg-[#f9f9fc] px-6 py-4 dark:border-[#1a2a1e] dark:bg-[#08100a]">
                                        <span className="text-lg font-extrabold text-[#123524] dark:text-[#edf7ef]">
                                            {prod.price}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                            <span className="size-2 rounded-full bg-emerald-500" />
                                            In stock
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section: Alerts & Notifications (from novaflow.html - "Novaflow taps you on the shoulder, only when it matters") */}
                <section
                    id="alerts"
                    className="bg-white py-20 sm:py-28 dark:bg-[#08100a]"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-[36px] border border-[#eaeaf2] bg-gradient-to-br from-[#e9fbe7]/40 via-white to-white p-8 sm:p-14 lg:p-16 dark:border-[#1a2a1e] dark:from-[#0b1610] dark:via-[#0b120d] dark:to-[#0b120d]">
                            <div className="max-w-2xl">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#123524] px-4 py-1 text-xs font-bold tracking-wider text-[#bcf7b7] uppercase dark:bg-[#bcf7b7] dark:text-[#06140b]">
                                    <Bell className="size-3.5" />
                                    <span>STAY IN THE LOOP</span>
                                </span>
                                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#123524] sm:text-5xl dark:text-[#edf7ef]">
                                    Novaflow taps you on the shoulder, only when
                                    it matters.
                                </h2>
                                <p className="mt-3 text-lg text-[#636171] dark:text-[#9FB8A4]">
                                    Quiet automation that keeps you informed
                                    without noisy notification spam.
                                </p>
                            </div>

                            <div className="mt-12 grid gap-8 md:grid-cols-3">
                                <div className="rounded-2xl border border-[#eaeaf2] bg-white p-6 shadow-sm dark:border-[#1a2a1e] dark:bg-[#0f1a12]">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                        <Boxes className="size-5" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-[#123524] dark:text-[#edf7ef]">
                                        Low stock alerts
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#636171] dark:text-[#9FB8A4]">
                                        Know before a bestseller runs out, not
                                        after customers notice an empty shelf.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[#eaeaf2] bg-white p-6 shadow-sm dark:border-[#1a2a1e] dark:bg-[#0f1a12]">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                        <MousePointerClick className="size-5" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-[#123524] dark:text-[#edf7ef]">
                                        Click milestones
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#636171] dark:text-[#9FB8A4]">
                                        A gentle nudge whenever a shared
                                        campaign link crosses a performance
                                        milestone you care about.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[#eaeaf2] bg-white p-6 shadow-sm dark:border-[#1a2a1e] dark:bg-[#0f1a12]">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <TrendingUp className="size-5" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-[#123524] dark:text-[#edf7ef]">
                                        Weekly digest
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#636171] dark:text-[#9FB8A4]">
                                        A short, beautiful review of your sales
                                        and traffic delivered on schedule every
                                        Monday morning.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Final Call to Action Banner (from novaflow.html - "Give your catalogue a home") */}
                <section
                    id="cta"
                    className="relative overflow-hidden bg-[#123524] py-24 text-center text-white sm:py-32"
                >
                    {/* Background Graphic Rings */}
                    <div className="pointer-events-none absolute -top-40 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full border border-white/5 opacity-40" />
                    <div className="pointer-events-none absolute -top-20 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full border border-white/10 opacity-30" />

                    <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#bcf7b7]/15 px-4 py-1 text-xs font-bold tracking-wider text-[#bcf7b7] uppercase">
                            START YOUR SHOWCASE
                        </span>
                        <h2 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
                            Give your catalogue a home.
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#bcf7b7]/80 sm:text-xl">
                            Set up your seller account, add your first products,
                            and share your first link today. No setup fees, no
                            bloat.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-[#bcf7b7] px-8 py-4 text-base font-extrabold text-[#06140b] shadow-xl shadow-black/20 transition hover:scale-[1.02] hover:bg-[#a6ec9f]"
                                >
                                    <LayoutGrid className="size-5" />
                                    <span>Go to your Dashboard</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center gap-2 rounded-2xl bg-[#bcf7b7] px-8 py-4 text-base font-extrabold text-[#06140b] shadow-xl shadow-black/20 transition hover:scale-[1.02] hover:bg-[#a6ec9f]"
                                    >
                                        <span>Create your seller account</span>
                                        <ArrowRight className="size-5" />
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white transition hover:bg-white/10"
                                    >
                                        <span>Sign in</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-[#eaeaf2] bg-white py-12 dark:border-[#1a2a1e] dark:bg-[#050806]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-3">
                                <AppLogo
                                    textClassName="text-[#123524] dark:text-[#edf7ef]"
                                    iconClassName="size-8"
                                />
                                <span className="text-xs text-[#636171] dark:text-[#9FB8A4]">
                                    — Boutique Commerce & Portfolio Platform
                                </span>
                            </div>

                            <nav className="flex flex-wrap items-center gap-6 text-sm font-medium text-[#636171] dark:text-[#9FB8A4]">
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
                                    How it works
                                </a>
                                <a
                                    href="#prototype"
                                    className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                >
                                    Prototypes
                                </a>
                                <a
                                    href="#gallery"
                                    className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                >
                                    Gallery
                                </a>
                                <a
                                    href="#alerts"
                                    className="hover:text-[#123524] dark:hover:text-[#bcf7b7]"
                                >
                                    Alerts
                                </a>
                            </nav>
                        </div>

                        <div className="mt-8 flex flex-col gap-4 border-t border-[#eaeaf2] pt-8 text-xs text-[#636171] sm:flex-row sm:items-center sm:justify-between dark:border-[#1a2a1e] dark:text-[#9FB8A4]">
                            <p>
                                © {new Date().getFullYear()} Nova Flow. All
                                rights reserved.
                            </p>
                            <p className="font-mono">
                                Products · Analytics · Gallery · Settings
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
