<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $product
 * @property string $description
 * @property string $images
 * @property int $price
 * @property int $discount
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['product', 'description', 'images', 'price', 'discount'])]
class Products extends Model
{
    //
}
