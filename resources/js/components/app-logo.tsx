interface AppLogoProps {
    className?: string;
    textClassName?: string;
    iconClassName?: string;
    showText?: boolean;
}

export default function AppLogo({
    className = '',
    textClassName = 'text-white',
    iconClassName = 'size-8',
    showText = true,
}: AppLogoProps = {}) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className={`${iconClassName} shrink-0`} aria-hidden="true">
                <img
                    src="/images/novaflow-symbol.png"
                    alt="Nova Flow Logo"
                    className="size-full object-contain"
                />
            </div>
            {showText && (
                <div className="ml-1 grid flex-1 text-left">
                    <span
                        className={`truncate text-[19px] leading-tight font-extrabold tracking-tight ${textClassName}`}
                    >
                        Nova Flow
                    </span>
                </div>
            )}
        </div>
    );
}
