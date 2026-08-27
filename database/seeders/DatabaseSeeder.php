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

        User::factory(10)->create();
        Product::factory(10)->create();
        Category::factory(10)->create();

        // create test user + real products owned by them
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => 12345678,
        ]);

        $newProducts = $testUser->product()->createMany(
            Product::factory()->count(10)->make()->toArray()
        );
        // $newProducts is now a Collection of persisted Product models with real IDs

        // create test category
        $testCategory = Category::factory()->create([
            'name' => 'Test Category',
        ]);

        // attach the actual persisted products (or their IDs) to the category
        $testCategory->product()->attach($newProducts);
    }
}
