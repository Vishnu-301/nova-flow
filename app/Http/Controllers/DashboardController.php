<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::count();
        $categories = Category::withCount('products')->get();
        $users = User::findOrFail(auth()->id());

        return Inertia::render('dashboard', [
            'products' => $products,
            'categories' => $categories,
            'users' => $users,
        ]);
    }
}
