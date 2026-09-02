<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        $productsCount = Product::query()
            ->where('user_id', $user->id)
            ->count();

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
        ]);
    }
}
