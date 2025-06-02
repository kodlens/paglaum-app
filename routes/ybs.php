<?php

use Illuminate\Support\Facades\Route;



Route::middleware(['auth', 'verified','active' , 'ybs'])->group(function () {

    Route::resource('/ybs/dashboard', App\Http\Controllers\Ybs\YbsDashboardController::class)->names('ybs.dashboard');
 
    Route::resource('/ybs/my-savings', App\Http\Controllers\Ybs\YbsMySavingsController::class)->names('ybs.my-savings');
    Route::get('/ybs/get-my-savings', [App\Http\Controllers\Ybs\YbsMySavingsController::class, 'getData']);
    Route::get('/ybs/my-savings-transactions/{id}', [App\Http\Controllers\Ybs\SavingsTransactionController::class, 'index'])->name('ybs.my-saving-transactions.index');
    Route::get('/ybs/get-my-savings-transactions/{id}', [App\Http\Controllers\Ybs\SavingsTransactionController::class, 'getSavingsTransaction']);

    Route::post('/ybs/apply-savings-account', [App\Http\Controllers\Ybs\ApplySavingsAccountController::class, 'applySavingsAccount']);


    Route::get('/ybs/deposit-online/{id}', [App\Http\Controllers\Ybs\DepositOnlineController::class, 'index']);
    Route::post('/ybs/deposit-online/{id}', [App\Http\Controllers\Ybs\DepositOnlineController::class, 'depositOnline']);
    Route::get('/ybs/deposit-online-cancel', [App\Http\Controllers\Ybs\DepositOnlineController::class , 'cancel'])->name('paymongo.deposit-cancel');
    Route::get('/ybs/deposit-online-success', [App\Http\Controllers\Ybs\DepositOnlineController::class , 'success'])->name('paymongo.deposit-success');


    Route::get('/ybs/account-setting', [App\Http\Controllers\Ybs\YbsAccountSettingController::class, 'index'])->name('ybs.account-setting.index');
    Route::get('/ybs/get-account-settings', [App\Http\Controllers\Ybs\YbsAccountSettingController::class, 'getData']);
    Route::post('/ybs/request-code', [App\Http\Controllers\Ybs\YbsAccountSettingController::class, 'requestCode']);
    Route::post('/ybs/save-two-fa-setting', [App\Http\Controllers\Ybs\YbsAccountSettingController::class, 'saveSetting']);


    Route::resource('/ybs/profile', App\Http\Controllers\Ybs\YbsProfileController::class)->names('ybs.profile');
  
    // Route::get('/ybs/profile', [App\Http\Controllers\Ybs\YbsProfileController::class, 'edit'])->name('ybs.profile.edit');
    // Route::patch('/ybs/profile', [App\Http\Controllers\Ybs\YbsProfileController::class, 'update'])->name('ybs.profile.update');
    // Route::delete('/ybs/profile', [App\Http\Controllers\Ybs\YbsProfileController::class, 'destroy'])->name('ybs.profile.destroy');
    // Route::patch('/ybs/update-member-profile', [App\Http\Controllers\Ybs\YbsProfileController::class, 'updateProfile'])->name('ybs.update-ybs-profile');
    

});