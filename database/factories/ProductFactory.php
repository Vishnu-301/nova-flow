<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->sentence(),
            'image' => $this->faker->imageUrl(),
            'price' => $this->faker->numberBetween(1, 1000),
            'discount' => $this->faker->numberBetween(1, 100),
            'stock_quantity' => $this->faker->numberBetween(0, 100),
            'user_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
