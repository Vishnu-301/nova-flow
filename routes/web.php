<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::inertia('links', 'links')->name('links');
    Route::resource('products', ProductController::class);
    Route::resource('categories', CategoryController::class)->only(['destroy']);
});

require __DIR__.'/settings.php';
