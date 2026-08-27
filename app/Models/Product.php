<?php

namespace App\Models;

use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(
    'name',
    'description',
    'images',
    'price',
    'discount',
    'user_id'
)]
class Product extends Model
{
    /** @use HasFactory<ProductsFactory> */
    use HasFactory;

    // users can have many products
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // products can have many categories
    public function category(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_products');
    }
}
