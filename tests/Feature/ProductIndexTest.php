<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

test('product index page renders products with storage image urls and categories', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $category = Category::factory()->create(['name' => 'Gadgets']);

    $product = Product::factory()->create([
        'user_id' => $user->id,
        'name' => 'Smart Watch',
        'image' => 'products/sample_watch.png',
        'price' => 25000,
    ]);

    $product->categories()->attach($category->id);

    $response = $this->actingAs($user)->get(route('products.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('products/index')
        ->where('products.0.id', $product->id)
        ->where('products.0.name', 'Smart Watch')
        ->where('products.0.image', Storage::url('products/sample_watch.png'))
        ->where('products.0.categories.0.id', $category->id)
        ->where('categories.0.id', $category->id)
    );
});
