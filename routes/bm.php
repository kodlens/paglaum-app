<?php


Route::middleware(['auth', 'bm'])->group(function () {
    Route::resource('/bm/dashboard', App\Http\Controllers\Bm\BmDashboardController::class)->names('bm.dashboard');


    Route::resource('/bm/loans', App\Http\Controllers\Bm\BmLoanController::class)->names('bm.loans');
    Route::get('/bm/get-loans', [App\Http\Controllers\Bm\BmLoanController::class, 'getData']);

    // Route::resource('/admin/users', App\Http\Controllers\Administrator\UserController::class)->names('admin.users');
    // Route::get('/admin/get-users', [App\Http\Controllers\Administrator\UserController::class, 'getData']);
    
    
    // Route::resource('/admin/areas', App\Http\Controllers\Administrator\AdminAreaContoller::class)->names('admin.areas');
    // Route::get('/admin/get-areas', [App\Http\Controllers\Administrator\AdminAreaContoller::class, 'getData']);
    
    // Route::resource('/admin/education-levels', App\Http\Controllers\Administrator\AdminEducationLevelController::class)->names('admin.education-levels');
    // Route::get('/admin/get-education-levels', [App\Http\Controllers\Administrator\AdminEducationLevelController::class, 'getData']);
    
    
    // Route::post('/admin/user-set-active/{id}', [App\Http\Controllers\Administrator\UserController::class, 'userSetActive']);
    // Route::post('/admin/user-set-inactive/{id}', [App\Http\Controllers\Administrator\UserController::class, 'userSetInactive']);

    
});
