<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. The Public Homepage
Route::get('/', [StoryController::class, 'index']);

// 2. Protected Parent/Child Routes (Requires Login)
Route::middleware(['auth', 'verified'])->group(function () {
    
    // The Family Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // The Story Library
    Route::get('/library', [App\Http\Controllers\StoryController::class, 'library'])->name('library');

    // The Interactive Reader
   // Update your reader route to look like this:
    Route::get('/reader/{id}', [App\Http\Controllers\StoryController::class, 'read'])->name('reader')->middleware(['auth', 'verified']);

    // Standard Breeze Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Authentication Routes (Login, Register, etc.)
require __DIR__.'/auth.php';