<?php

test('products and categories test data file contains 10 products with valid cycled images', function () {
    $data = require database_path('data/products_and_categories.php');

    expect($data)->toHaveKeys(['categories', 'products']);
    expect($data['categories'])->toBeArray()->not->toBeEmpty();
    expect($data['products'])->toHaveCount(10);

    $availableImages = [
        '/images/nova-flow/haupes-I7iJOE4fsYo-unsplash.jpg',
        '/images/nova-flow/i-m-zion-YZHHrVhyc9I-unsplash.jpg',
        '/images/nova-flow/lars-kaizer-WGiKqDlVUCI-unsplash.jpg',
        '/images/nova-flow/oriol-pascual-4a717idftws-unsplash.jpg',
    ];

    foreach ($data['products'] as $index => $product) {
        expect($product)->toHaveKeys(['name', 'description', 'image', 'price', 'discount', 'stock_quantity', 'category_slugs']);
        expect($product['image'])->toBe($availableImages[$index % count($availableImages)]);
        expect(file_exists(public_path(ltrim($product['image'], '/'))))->toBeTrue();
    }
});
