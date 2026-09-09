<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = auth()->id();

        $products = Product::query()
            ->where('user_id', $userId)
            ->with('categories')
            ->latest()import { store } from '@/actions/App/Http/Controllers/LinksController';
            ->get();

        $categories = Category::query()
            ->whereHas('products', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $userId = auth()->id();

        return Inertia::render('products/create', [
            'categories' => Category::query()
                ->whereHas('products', function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                })
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $product = $request->user()->product()->create([
            ...Arr::except($validated, ['category_ids', 'image', 'new_category']),
            'image' => $request->file('image')->store('products', 'public'),
        ]);

        $categoryIds = $validated['category_ids'] ?? [];

        if (filled($validated['new_category'] ?? null)) {
            $categoryIds[] = Category::query()->firstOrCreate(
                ['name' => $validated['new_category']],
                ['slug' => Str::slug($validated['new_category'])],
            )->id;
        }

        $product->categories()->sync($categoryIds);

        return to_route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        abort_unless($product->user_id === auth()->id(), 403);

        return Inertia::render('products/edit', [
            'product' => $product->load('categories'),
            'categories' => Category::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        abort_unless($product->user_id === auth()->id(), 403);

        $validated = $request->validated();

        $data = Arr::except($validated, ['category_ids', 'image', 'new_category']);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);

        $categoryIds = $validated['category_ids'] ?? [];

        if (filled($validated['new_category'] ?? null)) {
            $categoryIds[] = Category::query()->firstOrCreate(
                ['name' => $validated['new_category']],
                ['slug' => Str::slug($validated['new_category'])],
            )->id;
        }

        $product->categories()->sync($categoryIds);

        return to_route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        abort_unless($product->user_id === auth()->id(), 403);

        $product->categories()->detach();
        $product->delete();

        return to_route('products.index');
    }
}
