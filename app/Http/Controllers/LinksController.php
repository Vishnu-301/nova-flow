<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLinksRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\Link;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class LinksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = auth()->id();

        $categories = Category::query()
            ->whereHas('products', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->orderBy('name')
            ->get(['id', 'name']);

        $links = Link::query()
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get(['id', 'slug'])
            ->map(fn (Link $link) => [
                'id' => $link->id,
                'name' => Str::headline($link->slug),
                'directory' => url('/' . $link->slug),
            ])
            ->all();

        return Inertia::render('links/index', [
            'user' => $userId,
            'categories' => $categories,
            'links' => $links,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // return Inertia::render('links/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLinksRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $link = $request->user()->links()->create([
            'slug' => Str::slug(implode('-', $request->category_names)) . '-' . Str::random(4),
            'user_id' => auth()->id(),
        ]);


        $link->categories()->attach($request->category_ids);

        return redirect("/{$link->slug}");
    }

    /**
     * Display the specified resource.
     */
    public function show(Link $link)
    {
        return Inertia::render('Links/index', [
            'link' => $link->only('id', 'slug'),
            'categories' => $link->categories,
            'products' => $link->products()->with('categories')->paginate(20),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Link $link) {}
}
