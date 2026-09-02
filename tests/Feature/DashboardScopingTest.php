<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;

test('dashboard stats and active categories only show data belonging to the authenticated user', function () {
    $userA = User::factory()->create(['name' => 'User Alpha']);
    $userB = User::factory()->create(['name' => 'User Beta']);

    $category1 = Category::factory()->create(['name' => 'Electronics']);
    $category2 = Category::factory()->create(['name' => 'Clothing']);

    // User A has 3 products in Category 1
    $userAProducts = Product::factory()->count(3)->create(['user_id' => $userA->id]);
    foreach ($userAProducts as $product) {
        $product->categories()->attach($category1->id);
    }

    // User B has 5 products in Category 2
    $userBProducts = Product::factory()->count(5)->create(['user_id' => $userB->id]);
    foreach ($userBProducts as $product) {
        $product->categories()->attach($category2->id);
    }

    // Test User A view
    $responseA = $this->actingAs($userA)->get(route('dashboard'));

    $responseA->assertOk();
    $responseA->assertInertia(fn ($page) => $page
        ->component('dashboard')
        ->where('products', 3)
        ->where('categories.0.id', $category1->id)
        ->where('categories.0.products_count', 3)
        ->has('categories', 1)
    );

    // Test User B view
    $responseB = $this->actingAs($userB)->get(route('dashboard'));

    $responseB->assertOk();
    $responseB->assertInertia(fn ($page) => $page
        ->component('dashboard')
        ->where('products', 5)
        ->where('categories.0.id', $category2->id)
        ->where('categories.0.products_count', 5)
        ->has('categories', 1)
    );
});
