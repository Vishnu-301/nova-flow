<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('product edit screen renders with product details and categories', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create(['name' => 'Electronics']);

    $product = Product::factory()->create([
        'user_id' => $user->id,
        'name' => 'Noise Cancelling Headphones',
        'price' => 35000,
    ]);
    $product->categories()->attach($category->id);

    $response = $this->actingAs($user)->get(route('products.edit', $product));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('products/edit')
        ->where('product.id', $product->id)
        ->where('product.name', 'Noise Cancelling Headphones')
        ->where('categories.0.id', $category->id)
    );
});

test('authenticated user can update product details without changing image', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create(['name' => 'Audio']);

    $product = Product::factory()->create([
        'user_id' => $user->id,
        'name' => 'Old Product Name',
        'description' => 'Old Description',
        'image' => 'products/existing_image.png',
        'price' => 10000,
        'discount' => 1000,
        'stock_quantity' => 5,
    ]);
    $product->categories()->attach($category->id);

    $response = $this->actingAs($user)->put(route('products.update', $product), [
        'name' => 'Updated Product Name',
        'description' => 'Updated Description',
        'price' => 15000,
        'discount' => 2000,
        'stock_quantity' => 12,
        'category_ids' => [$category->id],
    ]);

    $response->assertRedirect(route('products.index'));

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'name' => 'Updated Product Name',
        'description' => 'Updated Description',
        'price' => 15000,
        'discount' => 2000,
        'stock_quantity' => 12,
        'image' => 'products/existing_image.png',
    ]);
});

test('authenticated user can update product with a new image and new category', function () {
    Storage::fake('public');
    $user = User::factory()->create();

    $product = Product::factory()->create([
        'user_id' => $user->id,
        'name' => 'Smart Glasses',
        'image' => 'products/old_glasses.png',
    ]);

    $response = $this->actingAs($user)->put(route('products.update', $product), [
        'name' => 'Smart Glasses Pro',
        'description' => 'Updated smart glasses description',
        'image' => UploadedFile::fake()->image('new_glasses.png'),
        'price' => 45000,
        'stock_quantity' => 8,
        'new_category' => 'Wearables',
    ]);

    $response->assertRedirect(route('products.index'));

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'name' => 'Smart Glasses Pro',
        'price' => 45000,
    ]);
    $this->assertDatabaseHas('categories', ['name' => 'Wearables', 'slug' => 'wearables']);

    $updatedProduct = $product->fresh();
    Storage::disk('public')->assertExists($updatedProduct->getRawOriginal('image'));
    expect($updatedProduct->categories()->pluck('name')->all())
        ->toContain('Wearables');
});

test('user cannot edit or update another users product', function () {
    $owner = User::factory()->create();
    $otherUser = User::factory()->create();

    $product = Product::factory()->create(['user_id' => $owner->id]);

    $this->actingAs($otherUser)
        ->get(route('products.edit', $product))
        ->assertForbidden();

    $this->actingAs($otherUser)
        ->put(route('products.update', $product), [
            'name' => 'Hacked Name',
            'description' => 'Hacked Description',
            'price' => 1,
            'stock_quantity' => 1,
        ])
        ->assertForbidden();
});
