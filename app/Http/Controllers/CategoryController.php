<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Remove the specified category and all products associated with it.
     */
    public function destroy(Category $category): RedirectResponse
    {
        $products = $category->products()->where('user_id', Auth::id())->get();

        foreach ($products as $product) {
            $product->delete();
        }

        $category->delete();

        return to_route('products.index');
    }
}
