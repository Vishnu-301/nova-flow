<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Link;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
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

        $linksCount = Link::query()
            ->where('user_id', $user->id)
            ->count();

        $linksClickCount = Link::query()
            ->where('user_id', $user->id)
            ->sum('clicks');

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

        return Inertia::render('dashboard', [
            'products' => $productsCount,
            'categories' => $categories,
            'users' => $user,
            'userProducts' => $userProducts,
            'links' => [
                'count' => $linksCount,
                'clicks' => $linksClickCount,
            ],
        ]);
    }
}
