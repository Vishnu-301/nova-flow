export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center shrink-0">
                <img
                    src="/images/WhatsApp Image 2026-08-19 at 10.21.14(1).jpeg"
                    alt="Nova Flow"
                    className="size-8 rounded-md object-cover"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left">
                <span className="truncate text-[19px] leading-tight font-extrabold tracking-tight text-white">
                    Nova flow
                </span>
            </div>
        </>
    );
}
