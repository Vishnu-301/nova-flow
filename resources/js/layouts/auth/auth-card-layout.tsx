import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import SmoothRepetitiveBackground from '@/components/smooth-repetitive-background';
import { home } from '@/routes';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 md:p-10">
            <SmoothRepetitiveBackground />

            <div className="relative z-10 w-full max-w-[440px]">
                <div className="relative rounded-3xl border border-nf-line/80 bg-white/95 p-7 sm:p-9 shadow-[0_20px_60px_-15px_rgba(18,53,36,0.12),0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-md dark:border-white/10 dark:bg-[#12241b]/95 dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
                    <div className="mb-6 flex flex-col items-center text-center">
                        <Link
                            href={home()}
                            className="group inline-flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <div className="flex size-11 items-center justify-center rounded-2xl bg-nf-ink p-2 shadow-md shadow-nf-ink/20 ring-1 ring-white/15 transition-all duration-300 group-hover:shadow-lg group-hover:ring-nf-green/50">
                                <img
                                    src="/images/novaflow-symbol.png"
                                    alt="Nova Flow"
                                    className="size-full object-contain"
                                />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-2xl font-black tracking-tight text-nf-ink dark:text-white">
                                    Nova Flow
                                </span>
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-nf-dark-green dark:text-nf-green">
                                    Commerce & Links
                                </span>
                            </div>
                        </Link>

                        {(title || description) && (
                            <div className="mt-4 space-y-1">
                                {title && (
                                    <h1 className="text-xl font-bold tracking-tight text-nf-ink dark:text-white">
                                        {title}
                                    </h1>
                                )}
                                {description && (
                                    <p className="text-sm text-balance text-nf-muted dark:text-zinc-400">
                                        {description}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {children}
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-nf-muted dark:text-zinc-500">
                    <Link
                        href={home()}
                        className="transition-colors hover:text-nf-ink hover:underline dark:hover:text-zinc-300"
                    >
                        ← Back to Nova Flow
                    </Link>
                    <span>•</span>
                    <span>Secure Authentication</span>
                </div>
            </div>
        </div>
    );
}
