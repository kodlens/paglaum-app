<?php


Route::middleware(['auth', 'do'])->group(function () {
    Route::resource('/do/dashboard', App\Http\Controllers\Do\DoDashboardController::class)->names('do.dashboard');


    Route::resource('/do/loans', App\Http\Controllers\Do\DoLoanController::class)->names('do.loans');
    Route::get('/do/get-loans', [App\Http\Controllers\Do\DoLoanController::class, 'getData']);
    Route::post('/do/approve-loan', [App\Http\Controllers\Do\DoLoanController::class, 'approveLoan']);

    Route::resource('/do/members', App\Http\Controllers\Do\DoMemberController::class)->names('do.members');
    Route::get('/do/get-members', [App\Http\Controllers\Do\DoMemberController::class, 'getData']);
    Route::post('/do/member-disallow-loan/{id}', [App\Http\Controllers\Do\DoMemberController::class, 'userDisallowLoan']);
    Route::post('/do/member-allow-loan/{id}', [App\Http\Controllers\Do\DoMemberController::class, 'userAllowLoan']);
    
   
});
