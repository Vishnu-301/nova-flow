<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;

test('deleting a category deletes all products associated with that category', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create(['name' => 'Audio Gadgets']);

    $product1 = Product::factory()->create(['user_id' => $user->id, 'name' => 'Headphones']);
    $product2 = Product::factory()->create(['user_id' => $user->id, 'name' => 'Speakers']);

    $product1->categories()->attach($category->id);
    $product2->categories()->attach($category->id);

    $response = $this->actingAs($user)->delete(route('categories.destroy', $category));

    $response->assertRedirect(route('products.index'));

    $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    $this->assertDatabaseMissing('products', ['id' => $product1->id]);
    $this->assertDatabaseMissing('products', ['id' => $product2->id]);
    $this->assertDatabaseMissing('category_products', ['category_id' => $category->id]);
});

test('deleting a product removes it from all categories and deletes product record', function () {
    $user = User::factory()->create();
    $category1 = Category::factory()->create(['name' => 'Tech']);
    $category2 = Category::factory()->create(['name' => 'Wearables']);

    $product = Product::factory()->create(['user_id' => $user->id, 'name' => 'Smartband']);
    $product->categories()->attach([$category1->id, $category2->id]);

    $response = $this->actingAs($user)->delete(route('products.destroy', $product));

    $response->assertRedirect(route('products.index'));

    $this->assertDatabaseMissing('products', ['id' => $product->id]);
    $this->assertDatabaseMissing('category_products', ['product_id' => $product->id]);

    // Categories themselves remain intact
    $this->assertDatabaseHas('categories', ['id' => $category1->id]);
    $this->assertDatabaseHas('categories', ['id' => $category2->id]);
});
