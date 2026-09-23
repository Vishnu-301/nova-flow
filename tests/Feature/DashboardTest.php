<?php

use App\Models\Link;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard')
        ->has('categories')
        ->has('products')
        ->has('links')
        ->has('audienceGrowth')
    );
});

test('dashboard provides link performance items and audience growth derived from overall link clicks', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    Link::create([
        'slug' => 'top-promo-link',
        'user_id' => $user->id,
        'clicks' => 30,
    ]);

    Link::create([
        'slug' => 'second-promo-link',
        'user_id' => $user->id,
        'clicks' => 15,
    ]);

    Link::create([
        'slug' => 'other-user-link',
        'user_id' => $otherUser->id,
        'clicks' => 50,
    ]);

    $response = $this->actingAs($user)->get(route('dashboard'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard')
        ->where('links.count', 2)
        ->where('links.clicks', 45)
        ->has('links.items', 2)
        ->where('links.items.0.slug', 'top-promo-link')
        ->where('links.items.0.clicks', 30)
        ->where('links.items.1.slug', 'second-promo-link')
        ->where('links.items.1.clicks', 15)
        ->has('audienceGrowth', 7)
        ->where('audienceGrowth.6.clicks', 45)
    );
});
