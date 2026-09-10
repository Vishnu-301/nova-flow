<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LinksController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('links', LinksController::class)->except(['show']);
    Route::resource('products', ProductController::class);
    Route::resource('categories', CategoryController::class)->only(['destroy']);
});

Route::get('/links/{link}', [LinksController::class, 'show'])->name('links.show');

require __DIR__.'/settings.php';

Route::get('/{link:slug}', [LinksController::class, 'show'])->name('links.view');
