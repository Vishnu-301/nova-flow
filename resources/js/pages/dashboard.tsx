import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { dashboard } from '@/routes';

/* ─── Donut chart SVG (pure CSS/SVG, no libraries) ─── */
function DonutChart() {
    const total = 100;
    const segments = [
        { pct: 76, color: '#6c5ce7' },
        { pct: 13, color: '#2dd4bf' },
        { pct: 11, color: '#ffb545' },
    ];
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
        <svg viewBox="0 0 120 120" className="h-[120px] w-[120px] shrink-0">
            {segments.map((seg, i) => {
                const dash = (seg.pct / total) * circumference;
                const gap = circumference - dash;
                const currentOffset = offset;
                offset += dash;

                return (
                    <circle
                        key={i}
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="16"
                        strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={-currentOffset}
                        strokeLinecap="butt"
                        transform="rotate(-90 60 60)"
                    />
                );
            })}
        </svg>
    );
}

/* ─── Weekly bar chart (pure CSS) ─── */
function WeeklyBarChart() {
    const days = [
        { label: 'M', h1: 55, h2: 40 },
        { label: 'T', h1: 45, h2: 50 },
        { label: 'W', h1: 60, h2: 55 },
        { label: 'TH', h1: 70, h2: 60 },
        { label: 'F', h1: 50, h2: 45 },
        { label: 'SA', h1: 65, h2: 55 },
        { label: 'SU', h1: 80, h2: 70 },
    ];

    return (
        <div className="flex h-[160px] items-end justify-between gap-2">
            {days.map((day) => (
                <div
                    key={day.label}
                    className="flex flex-1 flex-col items-center gap-2"
                >
                    <div
                        className="flex w-full items-end justify-center gap-1"
                        style={{ height: '140px' }}
                    >
                        <div
                            className="w-3 rounded-t-md bg-nf-green-light"
                            style={{ height: `${day.h1}%` }}
                        />
                        <div
                            className="w-3 rounded-t-md bg-nf-green"
                            style={{ height: `${day.h2}%` }}
                        />
                    </div>
                    <span className="text-[11.5px] font-semibold text-nf-muted">
                        {day.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

/* ─── Growth line chart (pure SVG) ─── */
function GrowthChart() {
    const points = [
        10, 30, 25, 35, 28, 40, 35, 45, 42, 50, 48, 55, 50, 60, 58, 65,
    ];
    const w = 400;
    const h = 120;
    const stepX = w / (points.length - 1);
    const maxY = Math.max(...points);

    const pathD = points
        .map((p, i) => {
            const x = i * stepX;
            const y = h - (p / maxY) * (h - 10);

            return `${i === 0 ? 'M' : 'L'}${x},${y}`;
        })
        .join(' ');

    const areaD = `${pathD} L${w},${h} L0,${h} Z`;

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="h-[140px] w-full">
            <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6c5ce7" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={areaD} fill="url(#growthGrad)" />
            <path
                d={pathD}
                fill="none"
                stroke="#6c5ce7"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    );
}

interface CategoryItem {
    id: number;
    name: string;
    products_count: number;
}

interface UserItem {
    id: number;
    name: string;
    email: string;
}

export default function Dashboard({
    products = 0,
    categories = [],
    users,
    userProducts = [],
    links,
}: {
    products: number;
    categories: CategoryItem[];
    users: UserItem;
    userProducts?: string[];
    links: any;
}) {
    const stats = [
        { label: 'Total Products', value: products },
        { label: 'Total Revenue', value: '₦40,000' },
        { label: 'Total Links', value: links.count },
        { label: 'Total Link Clicks', value: links.clicks },
        { label: 'Total Categories', value: categories.length },
    ];

    const donutLegend = [
        { label: 'Phone accessories', pct: '76%', color: '#6c5ce7' },
        { label: 'Snacks', pct: '13%', color: '#2dd4bf' },
        { label: 'Clothing', pct: '11%', color: '#ffb545' },
    ];

    const displayChips = userProducts.length > 0
        ? userProducts
        : ['No products yet'];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
                {/* ── Welcome card ── */}
                <div className="flex overflow-hidden rounded-[var(--radius)] bg-white shadow-[0_8px_24px_rgba(20,18,27,.06)]">
                    <div className="hidden w-[220px] shrink-0 md:block">
                        <img
                            src="/images/avatar.jpeg"
                            alt="Welcome"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-3 p-7">
                        <span className="text-[13px] font-semibold tracking-[0.06em] text-nf-dark-green uppercase">
                            Good to see you
                        </span>
                        <h1 className="text-[28px] font-extrabold tracking-tight text-nf-text">
                            Welcome {users?.name ?? 'User'}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            {displayChips.map((chip) => (
                                <span
                                    key={chip}
                                    className="rounded-full bg-nf-green-light px-3 py-1.5 text-[12.5px] font-semibold text-nf-dark-green"
                                >
                                    {chip}
                                </span>
                            ))}
                        </div>
                        <Link
                            href="/products"
                            className="mt-1 w-fit rounded-xl bg-nf-ink px-5 py-2.5 text-[14px] font-semibold text-white transition-transform hover:bg-nf-dark-green active:scale-[0.97]"
                        >
                            Check products
                        </Link>
                    </div>
                </div>

                {/* ── Stat grid ── */}
                <div className="grid grid-cols-2 g      $categories = Category::where('user_id', $user)->get();ap-4 md:grid-cols-5">
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            className="flex flex-col gap-1.5 rounded-[var(--radius)] bg-white p-5 shadow-[0_8px_24px_rgba(20,18,27,.06)]"
                        >
                            <span className="text-[12.5px] font-medium text-nf-muted">
                                {s.label}
                            </span>
                            <span className="text-[20px] font-extrabold tracking-tight text-nf-text">
                                {s.value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* ── Donut + Active Categories ── */}
                <div className="grid gap-5 md:grid-cols-2">
                    {/* Best Performing Products */}
                    <div className="flex flex-col gap-4 rounded-[var(--radius)] bg-white p-6 shadow-[0_8px_24px_rgba(20,18,27,.06)]">
                        <h2 className="text-[15.5px] font-bold tracking-tight">
                            Best Performing Products
                        </h2>
                        <div className="flex items-center gap-6">
                            <DonutChart />
                            <ul className="flex flex-1 flex-col gap-2.5">
                                {donutLegend.map((item) => (
                                    <li
                                        key={item.label}
                                        className="flex items-center gap-2.5 text-[13.5px]"
                                    >
                                        <span
                                            className="inline-block h-[9px] w-[9px] shrink-0 rounded-full"
                                            style={{ background: item.color }}
                                        />
                                        <span className="flex-1">
                                            {item.label}
                                        </span>
                                        <b className="font-extrabold">
                                            {item.pct}
                                        </b>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Active Categories */}
                    <div className="flex flex-col gap-4 rounded-[var(--radius)] bg-white p-6 shadow-[0_8px_24px_rgba(20,18,27,.06)]">
                        <h2 className="text-[15.5px] font-bold tracking-tight">
                            Active Categories
                        </h2>
                        <ul className="flex flex-col gap-3">
                            {categories.map((cat: any) => (
                                <li
                                    key={cat.id}
                                    className="flex items-center justify-between rounded-xl bg-nf-bg px-3.5 py-2.5 text-[13.5px] font-medium"
                                >
                                    <span>{cat.name}</span>
                                    <span className="rounded-full bg-nf-green-light px-2.5 py-0.5 text-[11.5px] font-bold text-nf-dark-green">
                                        {cat.products_count}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Weekly Performance + Audience Growth ── */}
                <div className="grid gap-5 md:grid-cols-2">
                    {/* Weekly Performance */}
                    <div className="flex flex-col gap-4 rounded-[var(--radius)] bg-white p-6 shadow-[0_8px_24px_rgba(20,18,27,.06)]">
                        <h2 className="text-[15.5px] font-bold tracking-tight">
                            Weekly Performance
                        </h2>
                        <WeeklyBarChart />
                    </div>

                    {/* Audience Growth */}
                    <div className="flex flex-col gap-4 rounded-[var(--radius)] bg-white p-6 shadow-[0_8px_24px_rgba(20,18,27,.06)]">
                        <h2 className="text-[15.5px] font-bold tracking-tight">
                            Audience Growth
                        </h2>
                        <GrowthChart />
                        <p className="text-[12.5px] leading-relaxed text-nf-muted">
                            Total number of people who have visited your
                            inventory link will appear here
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Overview',
            href: dashboard(),
        },
    ],
};
