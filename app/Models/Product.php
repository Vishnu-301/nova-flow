<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

#[Fillable(
    'name',
    'slug',
    'description',
    'image',
    'price',
    'discount',
    'stock_quantity',
    'user_id'
)]
class Product extends Model
{
    /** @use HasFactory<ProductsFactory> */
    use HasFactory;

    protected $appends = ['slug'];

    protected static function booted(): void
    {
        static::saving(function (Product $product) {
            if (empty($product->slug) && ! empty($product->name)) {
                $product->slug = Str::slug($product->name);
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_products');
    }

    /**
     * Get the product's image URL.
     */
    protected function image(): Attribute
    {
        return Attribute::make(
            get: function (?string $value): ?string {
                if (! $value) {
                    return null;
                }

                if (Str::startsWith($value, ['http://', 'https://', '/'])) {
                    return $value;
                }

                return Storage::url($value);
            }
        );
    }

    /**
     * Get the product's slug attribute.
     */
    protected function slug(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value ?: Str::slug($this->name),
        );
    }
}
