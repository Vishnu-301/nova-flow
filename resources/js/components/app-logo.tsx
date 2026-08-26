export default function AppLogo() {
    return (
        <>
            <div className="size-8 shrink-0" aria-hidden="true">
                <img
                    src="/images/novaflow-symbol.png"
                    alt=""
                    className="size-full object-contain"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left">
                <span className="truncate text-[19px] leading-tight font-extrabold tracking-tight text-white">
                    Nova Flow
                </span>
            </div>
        </>
    );
}
