<?php

use App\Models\Category;
use App\Models\Link;
use App\Models\Product;
use App\Models\User;

test('link index page renders only the current user link name and directory', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $userLink = Link::create([
        'slug' => 'summer-sale',
        'user_id' => $user->id,
    ]);

    Link::create([
        'slug' => 'other-users-link',
        'user_id' => $otherUser->id,
    ]);

    $response = $this->actingAs($user)->get(route('links.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('links/index')
        ->where('links.0.id', $userLink->id)
        ->where('links.0.name', 'Summer Sale')
        ->where('links.0.directory', url('/summer-sale'))
    );
});

test('authenticated users can create a link for multiple categories', function () {
    $user = User::factory()->create();
    $category1 = Category::factory()->create(['name' => 'Shoes']);
    $category2 = Category::factory()->create(['name' => 'Bags']);

    $response = $this->actingAs($user)->post(route('links.store'), [
        'category_ids' => [$category1->id, $category2->id],
    ]);

    $response->assertRedirect(route('links.index'));

    $this->assertDatabaseHas('links', [
        'user_id' => $user->id,
        'slug' => 'shoes-bags',
    ]);

    $link = Link::where('slug', 'shoes-bags')->firstOrFail();
    expect($link->categories()->pluck('categories.id')->all())
        ->toEqualCanonicalizing([$category1->id, $category2->id]);
});

test('creating a link with a custom name creates the link with the slugified name', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create(['name' => 'Electronics']);

    $response = $this->actingAs($user)->post(route('links.store'), [
        'name' => 'Mega Flash Sale',
        'category_ids' => [$category->id],
    ]);

    $response->assertRedirect(route('links.index'));

    $this->assertDatabaseHas('links', [
        'user_id' => $user->id,
        'slug' => 'mega-flash-sale',
    ]);
});

test('creating a link requires at least one category', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->from(route('links.index'))
        ->post(route('links.store'), [
            'name' => 'Empty Collection',
            'category_ids' => [],
        ]);

    $response->assertRedirect(route('links.index'));
    $response->assertSessionHasErrors(['category_ids']);
});

test('creating a link returns error message if link already exists instead of appending random string', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create(['name' => 'Gadgets']);

    Link::create([
        'slug' => 'gadgets',
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)
        ->from(route('links.index'))
        ->post(route('links.store'), [
            'category_ids' => [$category->id],
        ]);

    $response->assertRedirect(route('links.index'));
    $response->assertSessionHasErrors(['category_ids', 'slug']);
    expect(Link::where('user_id', $user->id)->count())->toBe(1);

    // Test with explicit existing name as well
    Link::create([
        'slug' => 'special-offer',
        'user_id' => $user->id,
    ]);

    $responseWithName = $this->actingAs($user)
        ->from(route('links.index'))
        ->post(route('links.store'), [
            'name' => 'Special Offer',
            'category_ids' => [$category->id],
        ]);

    $responseWithName->assertRedirect(route('links.index'));
    $responseWithName->assertSessionHasErrors(['name', 'slug']);
    expect(Link::where('slug', 'special-offer')->count())->toBe(1);
});

test('when link is accessed only products in the selected categories can be seen', function () {
    $user = User::factory()->create();

    $catShoes = Category::factory()->create(['name' => 'Shoes']);
    $catBags = Category::factory()->create(['name' => 'Bags']);
    $catWatches = Category::factory()->create(['name' => 'Watches']);

    // User's products in Shoes (selected)
    $shoeProduct = Product::factory()->create([
        'user_id' => $user->id,
        'name' => 'Running Sneakers',
    ]);
    $shoeProduct->categories()->attach($catShoes->id);

    // User's products in Bags (selected)
    $bagProduct = Product::factory()->create([
        'user_id' => $user->id,
        'name' => 'Leather Backpack',
    ]);
    $bagProduct->categories()->attach($catBags->id);

    // User's products in Watches (NOT selected)
    $watchProduct = Product::factory()->create([
        'user_id' => $user->id,
        'name' => 'Gold Watch',
    ]);
    $watchProduct->categories()->attach($catWatches->id);

    // Create link for Shoes and Bags only
    $link = Link::create([
        'slug' => 'shoes-and-bags',
        'user_id' => $user->id,
    ]);
    $link->categories()->attach([$catShoes->id, $catBags->id]);

    // Access via public link route /{link:slug}
    $response = $this->get('/shoes-and-bags');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('links/show')
        ->where('link.slug', 'shoes-and-bags')
        ->has('products.data', 2)
        ->where('products.data.0.name', fn ($name) => in_array($name, ['Running Sneakers', 'Leather Backpack']))
        ->where('products.data.1.name', fn ($name) => in_array($name, ['Running Sneakers', 'Leather Backpack']))
    );

    // Access via /links/{link}
    $responseShow = $this->get(route('links.show', $link));
    $responseShow->assertOk();
    $responseShow->assertInertia(fn ($page) => $page
        ->component('links/show')
        ->where('link.slug', 'shoes-and-bags')
        ->has('products.data', 2)
    );
});

test('when link is accessed products from other users are not seen', function () {
    $userA = User::factory()->create();
    $userB = User::factory()->create();

    $category = Category::factory()->create(['name' => 'Sneakers']);

    $userAProduct = Product::factory()->create([
        'user_id' => $userA->id,
        'name' => 'User A Sneaker',
    ]);
    $userAProduct->categories()->attach($category->id);

    $userBProduct = Product::factory()->create([
        'user_id' => $userB->id,
        'name' => 'User B Sneaker',
    ]);
    $userBProduct->categories()->attach($category->id);

    // User A creates a link for Sneakers
    $link = Link::create([
        'slug' => 'user-a-sneakers',
        'user_id' => $userA->id,
    ]);
    $link->categories()->attach($category->id);

    $response = $this->get('/user-a-sneakers');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('links/show')
        ->has('products.data', 1)
        ->where('products.data.0.name', 'User A Sneaker')
    );
});

test('user can delete their own link', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create(['name' => 'Dresses']);

    $link = Link::create([
        'slug' => 'summer-dresses',
        'user_id' => $user->id,
    ]);
    $link->categories()->attach($category->id);

    $response = $this->actingAs($user)->delete(route('links.destroy', $link));

    $response->assertRedirect(route('links.index'));
    $this->assertDatabaseMissing('links', ['id' => $link->id]);
    $this->assertDatabaseMissing('category_link', ['link_id' => $link->id]);
});

test('user cannot delete another users link', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $otherUserLink = Link::create([
        'slug' => 'other-user-link',
        'user_id' => $otherUser->id,
    ]);

    $response = $this->actingAs($user)->delete(route('links.destroy', $otherUserLink));

    $response->assertForbidden();
    $this->assertDatabaseHas('links', ['id' => $otherUserLink->id]);
});
