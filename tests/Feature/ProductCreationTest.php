<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('product creation screen includes the available categories', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create(['name' => 'Accessories']);

    $response = $this->actingAs($user)->get(route('products.create'));

    $response->assertInertia(fn ($page) => $page
        ->component('products/create')
        ->where('categories.0.id', $category->id)
        ->where('categories.0.name', 'Accessories')
    );
});

test('authenticated users can create a product and add a category', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $category = Category::factory()->create(['name' => 'Accessories']);

    $response = $this->actingAs($user)->post(route('products.store'), [
        'name' => 'Wireless Earbuds',
        'description' => 'Noise-cancelling earbuds with a charging case.',
        'image' => UploadedFile::fake()->image('earbuds.png'),
        'price' => 12500,
        'discount' => 1500,
        'stock_quantity' => 18,
        'category_ids' => [$category->id],
        'new_category' => 'Audio',
    ]);

    $response->assertRedirect(route('products.index'));
    $this->assertDatabaseHas('products', [
        'name' => 'Wireless Earbuds',
        'user_id' => $user->id,
        'price' => 12500,
        'discount' => 1500,
        'stock_quantity' => 18,
    ]);
    $this->assertDatabaseHas('categories', ['name' => 'Audio', 'slug' => 'audio']);

    $product = $user->product()->where('name', 'Wireless Earbuds')->firstOrFail();
    Storage::disk('public')->assertExists($product->image);
    expect($product->categories()->pluck('name')->all())
        ->toEqualCanonicalizing(['Accessories', 'Audio']);
});

test('product creation requires its essential details', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->from(route('products.create'))->post(route('products.store'), []);

    $response
        ->assertRedirect(route('products.create'))
        ->assertSessionHasErrors(['name', 'description', 'image', 'price', 'stock_quantity']);
});
