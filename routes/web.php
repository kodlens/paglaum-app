<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Public/LandingPage', [
        
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


/* ===============================
    ADMINISTRATOR ROUTES
==================================*/


Route::get('/admin/dashboard', [App\Http\Controllers\Administrator\DashboardController::class, 'index']);

Route::resource('/admin/users', App\Http\Controllers\Administrator\UserController::class);
Route::get('/admin/get-users', [App\Http\Controllers\Administrator\UserController::class, 'getData']);



/* ===============================
    ADMINISTRATOR ROUTES
==================================*/





require __DIR__.'/auth.php';
