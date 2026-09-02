<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Schema;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // truncate database on seed
        Schema::disableForeignKeyConstraints();
        User::truncate();
        Product::truncate();
        Category::truncate();
        Schema::enableForeignKeyConstraints();

        $usersToSeed = [
            [
                'name' => 'Test User',
                'email' => 'test@test.com',
            ],
            [
                'name' => 'Vishnu',
                'email' => 'vishnu@test.com',
            ],
        ];

        foreach ($usersToSeed as $userData) {
            $user = User::factory()->create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => bcrypt('12345678'),
            ]);

            $this->seedProductsAndCategoriesForUser($user);
        }
    }

    /**
     * Create categories and products (with pivot attachments) for a given user.
     */
    private function seedProductsAndCategoriesForUser(User $user): void
    {
        $data = require database_path('data/products_and_categories.php');

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
