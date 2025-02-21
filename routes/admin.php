<?php
use Illuminate\Support\Facades\Route;


/* ===============================
    ADMINISTRATOR ROUTES
==================================*/


Route::get('/admin/dashboard', [App\Http\Controllers\Administrator\DashboardController::class, 'index']);

Route::resource('/admin/users', App\Http\Controllers\Administrator\UserController::class);
Route::get('/admin/get-users', [App\Http\Controllers\Administrator\UserController::class, 'getData']);



/* ===============================
    ADMINISTRATOR ROUTES
==================================*/

