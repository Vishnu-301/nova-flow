<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('slug', 'user_id')]
class Link extends Model
{
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function categories()
    {
        return $this->belongsToMany(
            Category::class,
            'category_link',
            'link_id',
            'category_id'
        );
    }

    // The actual product query — always live, never stale, scoped to link owner and selected categories
    public function products()
    {
        return Product::query()
            ->when($this->user_id, fn ($query) => $query->where('user_id', $this->user_id))
            ->whereHas('categories', function ($q) {
                $q->whereIn('categories.id', $this->categories()->pluck('categories.id'));
            });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
