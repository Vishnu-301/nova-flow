import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Boxes, CheckCircle2, LayoutGrid, Link2, Sparkles, TrendingUp } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { dashboard, login, register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />

            <div className="flex min-h-screen flex-col bg-[#f4f4fa] text-[#132d24] selection:bg-[#72f09a] selection:text-[#06100a] dark:bg-[#050806] dark:text-[#edf7ef]">
                {/* Navigation Header */}
                <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-[#050806]/80">
                    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <Link href="/" className="flex items-center gap-2">
                            <AppLogo textClassName="text-[#132d24] dark:text-white" />
                        </Link>

                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#06100a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#14291b] dark:bg-[#72f09a] dark:text-[#06100a] dark:hover:bg-[#4bd879]"
                                >
                                    <LayoutGrid className="size-4" />
                                    <span>Dashboard</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-xl px-4 py-2 text-sm font-semibold text-[#132d24] transition hover:text-[#36b966] dark:text-[#edf7ef] dark:hover:text-[#72f09a]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#06100a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#14291b] dark:bg-[#72f09a] dark:text-[#06100a] dark:hover:bg-[#4bd879]"
                                    >
                                        <span>Get Started</span>
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
                    <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
                        {/* Left column: Value Proposition */}
                        <div className="space-y-6 lg:col-span-7">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#36b966]/20 bg-[#36b966]/10 px-3.5 py-1 text-xs font-semibold text-[#1e6f3d] dark:border-[#72f09a]/30 dark:bg-[#72f09a]/10 dark:text-[#72f09a]">
                                <Sparkles className="size-3.5" />
                                <span>Nova Flow Commerce Platform</span>
                            </div>

                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                Showcase your products.{' '}
                                <span className="bg-gradient-to-r from-[#1e6f3d] via-[#36b966] to-[#42d99a] bg-clip-text text-transparent dark:from-[#72f09a] dark:via-[#4bd879] dark:to-[#42d99a]">
                                    Share your flow.
                                </span>
                            </h1>

                            <p className="max-w-2xl text-base leading-relaxed text-[#556960] sm:text-lg dark:text-[#98aa9d]">
                                Nova Flow gives independent sellers, artisans, and creators a branded gallery storefront, shareable links, and real-time performance analytics—all in one seamless place.
                            </p>

                            {/* Features list */}
                            <div className="grid gap-3 pt-2 sm:grid-cols-2">
                                <div className="flex items-center gap-2.5 text-sm font-medium">
                                    <CheckCircle2 className="size-4 text-[#36b966] dark:text-[#72f09a]" />
                                    <span>Personalized gallery links</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-sm font-medium">
                                    <CheckCircle2 className="size-4 text-[#36b966] dark:text-[#72f09a]" />
                                    <span>Real-time traffic analytics</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-sm font-medium">
                                    <CheckCircle2 className="size-4 text-[#36b966] dark:text-[#72f09a]" />
                                    <span>Curated product collections</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-sm font-medium">
                                    <CheckCircle2 className="size-4 text-[#36b966] dark:text-[#72f09a]" />
                                    <span>Fast & responsive interface</span>
                                </div>
                            </div>

                            {/* CTA Action Buttons */}
                            <div className="flex flex-wrap items-center gap-4 pt-4">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="inline-flex items-center gap-2 rounded-xl bg-[#06100a] px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#14291b] dark:bg-[#72f09a] dark:text-[#06100a] dark:shadow-[#72f09a]/20 dark:hover:bg-[#4bd879]"
                                    >
                                        <LayoutGrid className="size-5" />
                                        <span>Open Dashboard</span>
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={register()}
                                            className="inline-flex items-center gap-2 rounded-xl bg-[#06100a] px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#14291b] dark:bg-[#72f09a] dark:text-[#06100a] dark:shadow-[#72f09a]/20 dark:hover:bg-[#4bd879]"
                                        >
                                            <span>Create your showcase</span>
                                            <ArrowRight className="size-5" />
                                        </Link>
                                        <Link
                                            href={login()}
                                            className="inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white px-6 py-3.5 text-base font-semibold text-[#132d24] transition hover:bg-black/5 dark:border-white/15 dark:bg-[#0d1410] dark:text-white dark:hover:bg-white/5"
                                        >
                                            <span>Sign in</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right column: Interactive Visual Card */}
                        <div className="relative lg:col-span-5">
                            {/* Ambient Glow */}
                            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#36b966]/20 to-[#72f09a]/30 opacity-70 blur-2xl dark:from-[#36b966]/15 dark:to-[#72f09a]/20" />

                            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/95 p-6 shadow-2xl backdrop-blur-md sm:p-8 dark:border-white/10 dark:bg-[#0d1410]/95">
                                {/* Brand Badge Header */}
                                <div className="flex items-center justify-between border-b border-black/5 pb-5 dark:border-white/10">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="/images/novaflow-symbol.png"
                                            alt="Nova Flow"
                                            className="size-10 object-contain"
                                        />
                                        <div>
                                            <h3 className="font-extrabold text-[#132d24] dark:text-white">
                                                Nova Flow
                                            </h3>
                                            <p className="text-xs text-[#556960] dark:text-[#98aa9d]">
                                                Storefront & Analytics
                                            </p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#72f09a]/15 px-2.5 py-1 text-xs font-bold text-[#1e6f3d] dark:text-[#72f09a]">
                                        <span className="size-1.5 rounded-full bg-[#36b966] dark:bg-[#72f09a]" />
                                        Active
                                    </span>
                                </div>

                                {/* Preview Stats Grid */}
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div className="rounded-2xl border border-black/5 bg-[#f4f4fa] p-4 dark:border-white/5 dark:bg-[#14291b]/50">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-[#556960] dark:text-[#98aa9d]">
                                            <Boxes className="size-4 text-[#36b966] dark:text-[#72f09a]" />
                                            <span>Products</span>
                                        </div>
                                        <p className="mt-2 text-2xl font-black text-[#132d24] dark:text-white">
                                            12+
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-black/5 bg-[#f4f4fa] p-4 dark:border-white/5 dark:bg-[#14291b]/50">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-[#556960] dark:text-[#98aa9d]">
                                            <TrendingUp className="size-4 text-[#36b966] dark:text-[#72f09a]" />
                                            <span>Visitors</span>
                                        </div>
                                        <p className="mt-2 text-2xl font-black text-[#132d24] dark:text-white">
                                            1.4k
                                        </p>
                                    </div>
                                </div>

                                {/* Link Preview Card */}
                                <div className="mt-4 rounded-2xl border border-black/5 bg-[#f4f4fa] p-4 dark:border-white/5 dark:bg-[#14291b]/50">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-[#556960] dark:text-[#98aa9d]">
                                        <Link2 className="size-4 text-[#36b966] dark:text-[#72f09a]" />
                                        <span>Personalized Gallery Link</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs font-mono font-medium text-[#132d24] shadow-sm dark:bg-[#050806] dark:text-[#edf7ef]">
                                        <span>novaflow.com/gallery</span>
                                        <span className="text-[#36b966] dark:text-[#72f09a]">Ready</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-black/5 py-6 text-center text-xs text-[#556960] dark:border-white/10 dark:text-[#98aa9d]">
                    <p>© {new Date().getFullYear()} Nova Flow. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
