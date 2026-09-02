<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Schema;

// use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // trauncate database on seed
        Schema::disableForeignKeyConstraints();
        User::truncate();
        Product::truncate();
        Category::truncate();
        Schema::enableForeignKeyConstraints();

        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => bcrypt('12345678'),
        ]);

        $data = require database_path('data/products_and_categories.php');

        $createdCategories = [];
        foreach ($data['categories'] as $catData) {
            $createdCategories[$catData['slug']] = Category::create($catData);
        }

        foreach ($data['products'] as $prodData) {
            $categorySlugs = $prodData['category_slugs'] ?? [];
            unset($prodData['category_slugs']);

            $product = $testUser->product()->create($prodData);

            $catIds = array_filter(array_map(
                fn (string $slug) => $createdCategories[$slug]->id ?? null,
                $categorySlugs
            ));

            $product->categories()->attach($catIds);
        }
    }
}
