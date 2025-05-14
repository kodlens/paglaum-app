<?php

use Illuminate\Support\Facades\Route;



Route::middleware(['auth', 'verified','active'])->group(function () {

    Route::resource('/ybs/dashboard', App\Http\Controllers\Ybs\YbsDashboardController::class)->names('ybs.dashboard');
    

    Route::resource('/ybs/profile', App\Http\Controllers\Ybs\YbsProfileController::class)->names('ybs.profile');

    Route::resource('/ybs/my-savings', App\Http\Controllers\Ybs\YbsMySavingsController::class)->names('ybs.my-savings');
    Route::get('/ybs/get-my-savings', [App\Http\Controllers\Ybs\YbsMySavingsController::class, 'getData']);
    Route::get('/ybs/my-savings-transactions/{id}', [App\Http\Controllers\Ybs\SavingsTransactionController::class, 'index'])->name('ybs.my-saving-transactions.index');
    Route::get('/ybs/get-my-savings-transactions/{id}', [App\Http\Controllers\Ybs\SavingsTransactionController::class, 'getSavingsTransaction']);

    Route::post('/ybs/apply-savings-account', [App\Http\Controllers\Ybs\ApplySavingsAccountController::class, 'applySavingsAccount']);


});