<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
{
    /**
     * Remove the specified category and all products associated with it.
     */
    public function destroy(Category $category): RedirectResponse
    {
        $products = $category->products()->where('user_id', auth()->id())->get();

        foreach ($products as $product) {
            $product->categories()->detach();
            $product->delete();
        }

        $category->products()->detach();
        $category->delete();

        return to_route('products.index');
    }
}
