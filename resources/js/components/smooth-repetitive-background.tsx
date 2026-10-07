import { useId } from 'react';

interface SmoothRepetitiveBackgroundProps {
    className?: string;
}

export default function SmoothRepetitiveBackground({
    className = '',
}: SmoothRepetitiveBackgroundProps) {
    const patternId = useId();
    return (
        <div
            className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-[#f4f4fa] dark:bg-[#0c1812] transition-colors duration-500 ${className}`}
            aria-hidden="true"
        >
            {/* Smooth Ambient Lighting Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(188,247,183,0.3)_0%,rgba(233,251,231,0.15)_40%,transparent_75%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(47,107,63,0.25)_0%,rgba(18,53,36,0.12)_45%,transparent_80%)]" />

            {/* Soft Ambient Glow Orbs */}
            <div className="absolute -top-32 -left-32 h-[450px] w-[450px] rounded-full bg-nf-green/20 dark:bg-nf-green/10 blur-[110px]" />
            <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-nf-teal/15 dark:bg-nf-teal/10 blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-nf-green-light/40 dark:bg-nf-dark-green/15 blur-[140px]" />

            {/* Seamless Repetitive Geometric Flow Pattern */}
            <svg
                className="absolute inset-0 h-full w-full text-nf-ink dark:text-nf-green"
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id={patternId}
                        width="36"
                        height="36"
                        patternUnits="userSpaceOnUse"
                    >
                        {/* Subtle hairline grid border */}
                        <path
                            d="M 36 0 L 0 0 0 36"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.8"
                            strokeOpacity="0.045"
                        />
                        {/* Micro crosshair marker at pattern intersections */}
                        <path
                            d="M -3 0 L 3 0 M 0 -3 L 0 3"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeOpacity="0.12"
                        />
                        <path
                            d="M 33 36 L 39 36 M 36 33 L 36 39"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeOpacity="0.12"
                        />
                        {/* Soft intersection dots */}
                        <circle
                            cx="0"
                            cy="0"
                            r="1.2"
                            fill="currentColor"
                            fillOpacity="0.15"
                        />
                        <circle
                            cx="36"
                            cy="0"
                            r="1.2"
                            fill="currentColor"
                            fillOpacity="0.15"
                        />
                        <circle
                            cx="0"
                            cy="36"
                            r="1.2"
                            fill="currentColor"
                            fillOpacity="0.15"
                        />
                        <circle
                            cx="36"
                            cy="36"
                            r="1.2"
                            fill="currentColor"
                            fillOpacity="0.15"
                        />
                        {/* Center gentle dot */}
                        <circle
                            cx="18"
                            cy="18"
                            r="1.4"
                            fill="currentColor"
                            fillOpacity="0.12"
                        />
                        {/* Subtle circular flow ripple */}
                        <circle
                            cx="18"
                            cy="18"
                            r="6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.6"
                            strokeOpacity="0.035"
                            strokeDasharray="2 3"
                        />
                    </pattern>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    fill={`url(#${patternId})`}
                />
            </svg>
        </div>
    );
}
