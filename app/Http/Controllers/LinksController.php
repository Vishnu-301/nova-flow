<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLinksRequest;
use App\Models\Category;
use App\Models\Link;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

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
                'slug' => $link->slug,
                'directory' => url('/'.$link->slug),
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
        $user = $request->user();

        $categoryIds = $validated['category_ids'];

        if (! empty($validated['name'])) {
            $baseSlug = Str::slug($validated['name']);
        } else {
            $categoryNames = Category::whereIn('id', $categoryIds)->pluck('name')->all();
            $baseSlug = Str::slug(implode('-', $categoryNames));
        }

        if (empty($baseSlug)) {
            $baseSlug = 'link';
        }

        $slug = $baseSlug;
        if (Link::where('slug', $slug)->exists()) {
            $field = ! empty($validated['name']) ? 'name' : 'category_ids';
            $message = ! empty($validated['name'])
                ? 'Link name not available. Please enter a different name.'
                : 'A link for this category combination already exists. Please enter a custom link name.';

            throw ValidationException::withMessages([
                $field => $message,
                'slug' => 'A link with this name already exists.',
            ]);
        }

        $link = $user->links()->create([
            'slug' => $slug,
            'user_id' => $user->id,
        ]);

        $link->categories()->attach($categoryIds);

        return redirect()->route('links.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Link $link)
    {
        $link->load('categories');

        return Inertia::render('links/show', [
            'link' => [
                'id' => $link->id,
                'name' => Str::headline($link->slug),
                'slug' => $link->slug,
            ],
            'categories' => $link->categories,
            'products' => $link->products()->with('categories')->latest()->paginate(20),
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
    public function destroy(Link $link): RedirectResponse
    {
        abort_unless($link->user_id === auth()->id(), 403);

        $link->categories()->detach();
        $link->delete();

        return redirect()->route('links.index');
    }
}
