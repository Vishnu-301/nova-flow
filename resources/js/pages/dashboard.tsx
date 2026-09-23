import { Head, Link } from '@inertiajs/react';
import { useMemo } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { dashboard } from '@/routes';

const LINK_COLORS = [
    '#6c5ce7', // NovaFlow purple
    '#2dd4bf', // Teal
    '#ffb545', // Amber
    '#4caf50', // Emerald green
    '#3b82f6', // Blue
    '#ec4899', // Pink
];

interface LinkItem {
    id: number;
    name: string;
    slug: string;
    clicks: number;
}

interface LinksData {
    count: number;
    clicks: number;
    items?: LinkItem[];
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

interface AudienceGrowthPoint {
    period: string;
    clicks: number;
}

/* ─── Best performing links pie chart (Recharts) ─── */
function BestPerformingLinksChart({
    links,
    totalClicks,
}: {
    links: LinkItem[];
    totalClicks: number;
}) {
    const chartData = useMemo(() => {
        if (!links || links.length === 0) {
            return [];
        }

        if (totalClicks <= 0) {
            return [
                {
                    name: 'No clicks yet',
                    value: 1,
                    color: '#eaeaf2',
                    pct: 0,
                    clicks: 0,
                    isPlaceholder: true,
                },
            ];
        }

        const sorted = [...links].sort((a, b) => b.clicks - a.clicks);
        const top = sorted.slice(0, 4);
        const remaining = sorted.slice(4);
        const remainingClicks = remaining.reduce(
            (sum, item) => sum + item.clicks,
            0,
        );

        const items = top.map((link, idx) => {
            const pct =
                totalClicks > 0
                    ? Math.round((link.clicks / totalClicks) * 100)
                    : 0;

            return {
                name: link.name || link.slug,
                value: link.clicks,
                clicks: link.clicks,
                pct,
                color: LINK_COLORS[idx % LINK_COLORS.length],
                isPlaceholder: false,
            };
        });

        if (remainingClicks > 0) {
            const pct = Math.round((remainingClicks / totalClicks) * 100);
            items.push({
                name: 'Other links',
                value: remainingClicks,
                clicks: remainingClicks,
                pct,
                color: LINK_COLORS[items.length % LINK_COLORS.length],
                isPlaceholder: false,
            });
        }

        return items;
    }, [links, totalClicks]);

    const legendItems = useMemo(() => {
        if (!links || links.length === 0) {
            return [];
        }

        const sorted = [...links].sort((a, b) => b.clicks - a.clicks);
        const top = sorted.slice(0, 4);
        const remaining = sorted.slice(4);
        const remainingClicks = remaining.reduce(
            (sum, item) => sum + item.clicks,
            0,
        );

        const items = top.map((link, idx) => {
            const pct =
                totalClicks > 0
                    ? Math.round((link.clicks / totalClicks) * 100)
                    : 0;

            return {
                name: link.name || link.slug,
                clicks: link.clicks,
                pct,
                color: LINK_COLORS[idx % LINK_COLORS.length],
            };
        });

        if (remainingClicks > 0) {
            const pct = Math.round((remainingClicks / totalClicks) * 100);
            items.push({
                name: 'Other links',
                clicks: remainingClicks,
                pct,
                color: LINK_COLORS[items.length % LINK_COLORS.length],
            });
        }

        return items;
    }, [links, totalClicks]);

    if (!links || links.length === 0) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
                <p className="text-[13px] text-nf-muted">
                    No links created yet.
                </p>
                <Link
                    href="/links"
                    className="mt-2 text-[12.5px] font-semibold text-nf-dark-green hover:underline"
                >
                    Create your first link &rarr;
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-6">
            <div className="relative h-[130px] w-[130px] shrink-0">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minWidth={0}
                    minHeight={0}
                >
                    <PieChart>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (!active || !payload?.length) {
return null;
}

                                const item = payload[0].payload as {
                                    name: string;
                                    clicks: number;
                                    pct: number;
                                    isPlaceholder?: boolean;
                                };

                                if (item.isPlaceholder) {
return null;
}

                                return (
                                    <div className="rounded-lg border border-nf-line bg-white px-2.5 py-1.5 shadow-[0_4px_16px_rgba(20,18,27,0.08)]">
                                        <p className="text-[12px] font-bold text-nf-text">
                                            {item.name}
                                        </p>
                                        <p className="text-[11.5px] font-medium text-nf-muted">
                                            {item.clicks}{' '}
                                            {item.clicks === 1
                                                ? 'click'
                                                : 'clicks'}{' '}
                                            ({item.pct}%)
                                        </p>
                                    </div>
                                );
                            }}
                        />
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={36}
                            outerRadius={54}
                            paddingAngle={
                                chartData.length > 1 && totalClicks > 0 ? 3 : 0
                            }
                            dataKey="value"
                            stroke="#ffffff"
                            strokeWidth={2}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                {totalClicks === 0 && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <span className="text-[11px] font-bold text-nf-muted">
                            0 Clicks
                        </span>
                    </div>
                )}
            </div>

            <ul className="flex flex-1 flex-col gap-2.5">
                {legendItems.map((item) => (
                    <li
                        key={item.name}
                        className="flex items-center gap-2.5 text-[13.5px]"
                    >
                        <span
                            className="inline-block h-[9px] w-[9px] shrink-0 rounded-full"
                            style={{ background: item.color }}
                        />
                        <span
                            className="flex-1 truncate font-medium text-nf-text"
                            title={item.name}
                        >
                            {item.name}
                        </span>
                        <span className="text-[12px] text-nf-muted">
                            {item.clicks}{' '}
                            {item.clicks === 1 ? 'click' : 'clicks'}
                        </span>
                        <b className="font-extrabold text-nf-text">
                            {item.pct}%
                        </b>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ─── Weekly bar chart (Recharts) ─── */
function WeeklyBarChart() {
    const days = [
        { label: 'M', views: 55, clicks: 40 },
        { label: 'T', views: 45, clicks: 50 },
        { label: 'W', views: 60, clicks: 55 },
        { label: 'TH', views: 70, clicks: 60 },
        { label: 'F', views: 50, clicks: 45 },
        { label: 'SA', views: 65, clicks: 55 },
        { label: 'SU', views: 80, clicks: 70 },
    ];

    return (
        <div className="h-[150px] w-full min-w-0">
            <ResponsiveContainer
                width="100%"
                height="100%"
                minWidth={0}
                minHeight={0}
            >
                <BarChart
                    data={days}
                    barGap={4}
                    barCategoryGap="22%"
                    margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#eaeaf2"
                    />
                    <XAxis
                        dataKey="label"
                        tickLine={false}
                        axisLine={false}
                        tick={{
                            fontSize: 11.5,
                            fill: '#8a8798',
                            fontWeight: 600,
                        }}
                        dy={6}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: '#8a8798' }}
                        allowDecimals={false}
                    />
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (!active || !payload?.length) {
return null;
}

                            return (
                                <div className="rounded-lg border border-nf-line bg-white px-2.5 py-1.5 shadow-[0_4px_16px_rgba(20,18,27,0.08)]">
                                    <p className="mb-1 text-[11.5px] font-semibold text-nf-muted">
                                        Day: {label}
                                    </p>
                                    {payload.map((item: any, i: number) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2 text-[12px]"
                                        >
                                            <span
                                                className="inline-block h-2 w-2 rounded-full"
                                                style={{
                                                    backgroundColor: item.color,
                                                }}
                                            />
                                            <span className="text-nf-muted">
                                                {item.name}:
                                            </span>
                                            <b className="font-bold text-nf-text">
                                                {item.value}
                                            </b>
                                        </div>
                                    ))}
                                </div>
                            );
                        }}
                    />
                    <Bar
                        dataKey="views"
                        name="Views"
                        fill="#e9fbe7"
                        stroke="#bcf7b7"
                        radius={[4, 4, 0, 0]}
                    />
                    <Bar
                        dataKey="clicks"
                        name="Clicks"
                        fill="#2f6b3f"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

/* ─── Growth line chart (Recharts) ─── */
function GrowthChart({
    growthData,
    totalClicks,
}: {
    growthData?: AudienceGrowthPoint[];
    totalClicks: number;
}) {
    const displayData = useMemo(() => {
        if (growthData && growthData.length > 0) {
            return growthData;
        }

        const periods = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        if (totalClicks <= 0) {
            return periods.map((p) => ({ period: p, clicks: 0 }));
        }

        const weights = [0.12, 0.24, 0.38, 0.52, 0.68, 0.84, 1.0];
        let running = 0;

        return periods.map((period, idx) => {
            if (idx === periods.length - 1) {
                running = totalClicks;
            } else {
                const target = Math.round(weights[idx] * totalClicks);
                running = Math.max(running, Math.min(target, totalClicks));
            }

            return { period, clicks: running };
        });
    }, [growthData, totalClicks]);

    return (
        <div className="h-[150px] w-full min-w-0">
            <ResponsiveContainer
                width="100%"
                height="100%"
                minWidth={0}
                minHeight={0}
            >
                <LineChart
                    data={displayData}
                    margin={{ top: 10, right: 12, left: -24, bottom: 0 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#eaeaf2"
                    />
                    <XAxis
                        dataKey="period"
                        tickLine={false}
                        axisLine={false}
                        tick={{
                            fontSize: 11.5,
                            fill: '#8a8798',
                            fontWeight: 600,
                        }}
                        dy={6}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: '#8a8798' }}
                        allowDecimals={false}
                    />
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (!active || !payload?.length) {
return null;
}

                            const clicks = payload[0].value as number;

                            return (
                                <div className="rounded-lg border border-nf-line bg-white px-2.5 py-1.5 shadow-[0_4px_16px_rgba(20,18,27,0.08)]">
                                    <p className="text-[11.5px] font-semibold text-nf-muted">
                                        {label}
                                    </p>
                                    <p className="text-[12.5px] font-bold text-nf-text">
                                        {clicks}{' '}
                                        {clicks === 1 ? 'click' : 'clicks'}{' '}
                                        overall
                                    </p>
                                </div>
                            );
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="clicks"
                        stroke="#6c5ce7"
                        strokeWidth={2.5}
                        dot={{
                            r: 3.5,
                            fill: '#6c5ce7',
                            stroke: '#ffffff',
                            strokeWidth: 2,
                        }}
                        activeDot={{
                            r: 6,
                            fill: '#6c5ce7',
                            stroke: '#ffffff',
                            strokeWidth: 2,
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default function Dashboard({
    products = 0,
    categories = [],
    users,
    userProducts = [],
    links,
    audienceGrowth,
}: {
    products?: number;
    categories?: CategoryItem[];
    users?: UserItem;
    userProducts?: string[];
    links?: LinksData;
    audienceGrowth?: AudienceGrowthPoint[];
}) {
    const totalClicks = links?.clicks ?? 0;
    const linksList = links?.items ?? [];

    const stats = [
        { label: 'Total Products', value: products },
        { label: 'Total Revenue', value: '₦40,000' },
        { label: 'Total Links', value: links?.count ?? 0 },
        { label: 'Total Link Clicks', value: totalClicks },
        { label: 'Total Categories', value: categories.length },
    ];

    const displayChips =
        userProducts.length > 0 ? userProducts : ['No products yet'];

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
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
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

                {/* ── Best Performing Links + Active Categories ── */}
                <div className="grid gap-5 md:grid-cols-2">
                    {/* Best Performing Links */}
                    <div className="flex flex-col gap-4 rounded-[var(--radius)] bg-white p-6 shadow-[0_8px_24px_rgba(20,18,27,.06)]">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[15.5px] font-bold tracking-tight text-nf-text">
                                Best Performing Links
                            </h2>
                            <span className="text-[12px] font-medium text-nf-muted">
                                Based on clicks
                            </span>
                        </div>
                        <BestPerformingLinksChart
                            links={linksList}
                            totalClicks={totalClicks}
                        />
                    </div>

                    {/* Active Categories */}
                    <div className="flex flex-col gap-4 rounded-[var(--radius)] bg-white p-6 shadow-[0_8px_24px_rgba(20,18,27,.06)]">
                        <h2 className="text-[15.5px] font-bold tracking-tight text-nf-text">
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
                        <h2 className="text-[15.5px] font-bold tracking-tight text-nf-text">
                            Weekly Performance
                        </h2>
                        <WeeklyBarChart />
                    </div>

                    {/* Audience Growth */}
                    <div className="flex flex-col gap-4 rounded-[var(--radius)] bg-white p-6 shadow-[0_8px_24px_rgba(20,18,27,.06)]">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[15.5px] font-bold tracking-tight text-nf-text">
                                Audience Growth
                            </h2>
                            <span className="rounded-full bg-nf-green-light px-2.5 py-0.5 text-[11.5px] font-bold text-nf-dark-green">
                                {totalClicks}{' '}
                                {totalClicks === 1
                                    ? 'overall click'
                                    : 'overall clicks'}
                            </span>
                        </div>
                        <GrowthChart
                            growthData={audienceGrowth}
                            totalClicks={totalClicks}
                        />
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
