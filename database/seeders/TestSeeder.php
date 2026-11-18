<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class TestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // truncate database on seed
        Schema::withoutForeignKeyConstraints(function () {
            User::truncate();
            Product::truncate();
            Category::truncate();
        });

        $extraUser = [
            [
                'name' => 'Zalum',
                'email' => 'zalum@test.com',
                'password' => 12345678,
            ],
        ];

        // \extra user for zalum products
        $extraUser = User::factory()->create([
            'name' => $extraUser[0]['name'],
            'email' => $extraUser[0]['email'],
            'password' => bcrypt('12345678'),
        ]);

        $this->seed_zalum_products($extraUser);
    }

    private function seed_zalum_products(User $user): void
    {
        $data = require database_path('data/zalum_products.php');

        $createdCategories = [];
        foreach ($data['categories'] as $catData) {
            $createdCategories[$catData['slug']] = Category::create($catData);
        }

        foreach ($data['products'] as $prodData) {
            $categorySlugs = $prodData['category_slugs'] ?? [];
            unset($prodData['category_slugs']);

            $product = $user->product()->create($prodData);

            $catIds = array_filter(array_map(
                fn (string $slug) => $createdCategories[$slug]->id ?? null,
                $categorySlugs
            ));

            $product->categories()->attach($catIds);
        }
    }
}
