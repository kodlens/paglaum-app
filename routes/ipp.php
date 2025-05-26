<?php

use Illuminate\Support\Facades\Route;



Route::middleware(['auth', 'ipp'])->group(function () {

    Route::resource('/ipp/dashboard', App\Http\Controllers\Ipp\IppDashboardController::class)->names('ipp.dashboard');
    

    Route::resource('/ipp/profile', App\Http\Controllers\Ipp\IppProfileController::class)->names('ipp.profile');

    Route::resource('/ipp/loans', App\Http\Controllers\Ipp\IppLoanController::class)->names('ipp.loans');
    Route::get('/ipp/get-loans', [App\Http\Controllers\Ipp\IppLoanController::class, 'getData']);

    Route::get('/ipp/ipp-loan-details/{id}',[App\Http\Controllers\Ipp\IppLoanDetailController::class, 'index']);

    // Route::post('/ipp/approve-loan', [App\Http\Controllers\Ipp\IppLoanController::class, 'approveLoan']);
    // Route::post('/ipp/disapprove-loan', [App\Http\Controllers\Ipp\IppLoanController::class, 'disapproveLoan']);

});