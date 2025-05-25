<?php

use Illuminate\Support\Facades\Route;



Route::middleware(['auth', 'ipp'])->group(function () {

    Route::resource('/ipp/dashboard', App\Http\Controllers\Ipp\IppDashboardController::class)->names('ybs.dashboard');
    

    Route::resource('/ipp/profile', App\Http\Controllers\Ybs\YbsProfileController::class)->names('ybs.profile');

    Route::resource('/ipp/loans', App\Http\Controllers\Ipp\IppLoanController::class)->names('ipp.loans');
    Route::get('/ipp/get-loans', [App\Http\Controllers\Ipp\IppLoanController::class, 'getData']);
    Route::post('/ipp/approve-loan', [App\Http\Controllers\Ipp\IppLoanController::class, 'approveLoan']);
    Route::post('/ipp/disapprove-loan', [App\Http\Controllers\Ipp\IppLoanController::class, 'disapproveLoan']);

});