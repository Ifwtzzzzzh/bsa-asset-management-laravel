<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home', function () {
    return Inertia::render('Home', [
        'mapImageUrl' => asset('images/location.png')
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/portal/dashboard', function () {
        return Inertia::render('Portal/Dashboard');
    })->name('portal.dashboard');
    Route::get('/client/dashboard', function () {
        return Inertia::render('Client/Dashboard');
    })->name('client.dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
