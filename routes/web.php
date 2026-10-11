<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketController;
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

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        $tickets = auth()->user()->tickets();

        return Inertia::render('Dashboard', [
            'stats' => [
                'total' => (clone $tickets)->count(),
                'open' => (clone $tickets)->where('status', 'Open')->count(),
                'in_progress' => (clone $tickets)->where('status', 'In Progress')->count(),
                'resolved' => (clone $tickets)->whereIn('status', ['Resolved', 'Closed'])->count(),
            ],
            'recent' => (clone $tickets)->latest()->take(5)->get(),
        ]);
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('tickets', TicketController::class);
});

require __DIR__.'/auth.php';
