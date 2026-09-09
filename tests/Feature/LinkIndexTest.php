<?php

use App\Models\Link;
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
