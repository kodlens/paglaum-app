<?php
use Illuminate\Support\Facades\Route;


/* ===============================
    ADMINISTRATOR ROUTES
==================================*/


Route::resource('/admin/dashboard', App\Http\Controllers\Administrator\DashboardController::class)->names('admin.dashboard');

Route::resource('/admin/users', App\Http\Controllers\Administrator\UserController::class)->names('admin.users');
Route::get('/admin/get-users', [App\Http\Controllers\Administrator\UserController::class, 'getData']);

Route::post('/admin/user-set-active/{id}', [App\Http\Controllers\Administrator\UserController::class, 'userSetActive']);
Route::post('/admin/user-set-inactive/{id}', [App\Http\Controllers\Administrator\UserController::class, 'userSetInactive']);


/* ===============================
    ADMINISTRATOR ROUTES
==================================*/

