<?php

namespace App\Models;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('slug', 'user_id')]
class Link extends Model
{
    public function categories()
    {
        return $this->belongsToMany(
            Category::class,
            'category_link',
            'link_id',
            'category_id'
        );
    }

    // The actual product query — always live, never stale
    public function products()
    {
        return Product::whereHas('categories', function ($q) {
            $q->whereIn('categories.id', $this->categories()->pluck('categories.id'));
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
