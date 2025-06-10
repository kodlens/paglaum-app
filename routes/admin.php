<?php
use Illuminate\Support\Facades\Route;


/* ===============================
    ADMINISTRATOR ROUTES
==================================*/




Route::middleware(['auth', 'admin', 'active'])->group(function () {
    Route::resource('/admin/dashboard', App\Http\Controllers\Administrator\DashboardController::class)->names('admin.dashboard');

    Route::resource('/admin/users', App\Http\Controllers\Administrator\UserController::class)->names('admin.users');
    Route::get('/admin/get-users', [App\Http\Controllers\Administrator\UserController::class, 'getData']);
    
    
    Route::resource('/admin/areas', App\Http\Controllers\Administrator\AdminAreaContoller::class)->names('admin.areas');
    Route::get('/admin/get-areas', [App\Http\Controllers\Administrator\AdminAreaContoller::class, 'getData']);

    Route::resource('/admin/id-types', App\Http\Controllers\Administrator\IdTypeController::class)->names('admin.id-types');
    Route::get('/admin/get-id-types', [App\Http\Controllers\Administrator\IdTypeController::class, 'getData']);
    
    Route::resource('/admin/education-levels', App\Http\Controllers\Administrator\AdminEducationLevelController::class)->names('admin.education-levels');
    Route::get('/admin/get-education-levels', [App\Http\Controllers\Administrator\AdminEducationLevelController::class, 'getData']);
    
    
    Route::post('/admin/user-set-active/{id}', [App\Http\Controllers\Administrator\UserController::class, 'userSetActive']);
    Route::post('/admin/user-set-inactive/{id}', [App\Http\Controllers\Administrator\UserController::class, 'userSetInactive']);
    
    Route::post('/admin/change-password/{id}', [App\Http\Controllers\Administrator\UserController::class, 'changePassword']);



    Route::resource('/admin/pending-loans', App\Http\Controllers\Admin\AdminPendingLoanController::class)->names('admin.pending-loans');
    Route::get('/admin/get-pending-loans', [App\Http\Controllers\Admin\AdminPendingLoanController::class, 'getData']);

    Route::resource('/admin/pending-users', App\Http\Controllers\Admin\AdminPendingUserController::class)->names('admin.pending-users');
    Route::get('/admin/get-pending-users', [App\Http\Controllers\Admin\AdminPendingUserController::class, 'getData']);

    

});

  /* ===============================
        ADMINISTRATOR ROUTES
    ==================================*/
    