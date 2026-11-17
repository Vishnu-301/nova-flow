import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({
    className = 'size-6',
    alt = 'Nova Flow',
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/images/novaflow-symbol.png"
            alt={alt}
            className={`shrink-0 object-contain ${className}`}
            {...props}
        />
    );
}
