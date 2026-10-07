<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Link;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();

        $productsCount = Product::query()
            ->where('user_id', $user->id)
            ->count();

        $linksQuery = Link::query()
            ->where('user_id', $user->id);

        $linksCount = (clone $linksQuery)->count();
        $linksClickCount = (int) (clone $linksQuery)->sum('clicks');

        $userLinks = (clone $linksQuery)
            ->orderByDesc('clicks')
            ->orderByDesc('created_at')
            ->get(['id', 'slug', 'clicks'])
            ->map(fn (Link $link): array => [
                'id' => $link->id,
                'name' => Str::headline($link->slug),
                'slug' => $link->slug,
                'clicks' => (int) $link->clicks,
            ])
            ->values();

        $categories = Category::query()
            ->whereHas('products', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->withCount(['products' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }])
            ->get();

        $userProducts = Product::query()
            ->where('user_id', $user->id)
            ->latest()
            ->take(3)
            ->pluck('name');

        $stockLevels = Product::query()
            ->where('user_id', $user->id)
            ->orderByDesc('stock_quantity')
            ->take(6)
            ->get(['name', 'stock_quantity'])
            ->map(fn (Product $product): array => [
                'name' => $product->name,
                'quantity' => (int) $product->stock_quantity,
            ])
            ->values();

        $audienceGrowth = $this->calculateAudienceGrowth($linksClickCount);

        return Inertia::render('dashboard', [
            'products' => $productsCount,
            'categories' => $categories,
            'users' => $user,
            'userProducts' => $userProducts,
            'stockLevels' => $stockLevels,
            'links' => [
                'count' => $linksCount,
                'clicks' => $linksClickCount,
                'items' => $userLinks,
            ],
            'audienceGrowth' => $audienceGrowth,
        ]);
    }

    /**
     * Calculate cumulative audience growth trajectory based on overall link clicks.
     *
     * @return array<int, array{period: string, clicks: int}>
     */
    private function calculateAudienceGrowth(int $totalClicks): array
    {
        $periods = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        if ($totalClicks <= 0) {
            return array_map(fn (string $period): array => [
                'period' => $period,
                'clicks' => 0,
            ], $periods);
        }

        $weights = [0.12, 0.24, 0.38, 0.52, 0.68, 0.84, 1.00];
        $growth = [];
        $runningClicks = 0;

        foreach ($periods as $index => $period) {
            if ($index === count($periods) - 1) {
                $runningClicks = $totalClicks;
            } else {
                $target = (int) round($weights[$index] * $totalClicks);
                $runningClicks = max($runningClicks, min($target, $totalClicks));
            }

            $growth[] = [
                'period' => $period,
                'clicks' => $runningClicks,
            ];
        }

        return $growth;
    }
}
