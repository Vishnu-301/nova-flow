import { Link, usePage } from '@inertiajs/react';
import SmoothRepetitiveBackground from '@/components/smooth-repetitive-background';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="relative grid min-h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Left Brand Showcase Column */}
            <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-nf-ink p-10 text-white lg:flex">
                {/* Subtle Ambient Glow and Repetitive Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(188,247,183,0.15),transparent_60%)]" />
                <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-nf-green/10 blur-[100px]" />

                <Link
                    href={home()}
                    className="relative z-20 flex items-center gap-3 text-lg font-bold"
                >
                    <div className="flex size-9 items-center justify-center rounded-xl bg-white/10 p-1.5 ring-1 ring-white/20">
                        <img
                            src="/images/novaflow-symbol.png"
                            alt="Nova Flow"
                            className="size-full object-contain"
                        />
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-white">
                        Nova Flow
                    </span>
                </Link>

                <div className="relative z-20 space-y-3">
                    <p className="text-2xl font-bold tracking-tight text-white">
                        Next-generation link & commerce infrastructure.
                    </p>
                    <p className="text-sm text-white/70 max-w-md">
                        Manage products, organize collections, and share lightning-fast bio links with built-in analytics.
                    </p>
                </div>

                <div className="relative z-20 text-xs text-white/50">
                    © {new Date().getFullYear()} {name || 'Nova Flow'}. All rights reserved.
                </div>
            </div>

            {/* Right Form Column */}
            <div className="relative flex min-h-full w-full items-center justify-center p-6 lg:p-12">
                <SmoothRepetitiveBackground />

                <div className="relative z-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
                    <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
                        <Link
                            href={home()}
                            className="mb-2 flex items-center gap-2.5 lg:hidden"
                        >
                            <div className="flex size-10 items-center justify-center rounded-xl bg-nf-ink p-2 shadow-sm ring-1 ring-white/20">
                                <img
                                    src="/images/novaflow-symbol.png"
                                    alt="Nova Flow"
                                    className="size-full object-contain"
                                />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-nf-ink dark:text-white">
                                Nova Flow
                            </span>
                        </Link>

                        <h1 className="text-2xl font-bold tracking-tight text-nf-ink dark:text-white">
                            {title}
                        </h1>
                        <p className="text-sm text-balance text-nf-muted dark:text-zinc-400">
                            {description}
                        </p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
