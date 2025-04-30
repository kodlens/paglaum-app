<?php


Route::middleware(['auth', 'do'])->group(function () {
    Route::resource('/do/dashboard', App\Http\Controllers\Do\DoDashboardController::class)->names('do.dashboard');


    Route::resource('/do/loans', App\Http\Controllers\Do\DoLoanController::class)->names('do.loans');
    Route::get('/do/get-loans', [App\Http\Controllers\Do\DoLoanController::class, 'getData']);
    Route::post('/do/approve-loan', [App\Http\Controllers\Do\DoLoanController::class, 'approveLoan']);
    Route::post('/do/disapprove-loan', [App\Http\Controllers\Do\DoLoanController::class, 'disapproveLoan']);


    Route::get('/do/make-a-payment/{id}', [App\Http\Controllers\Do\DoMakeAPaymentController::class, 'index']);

    Route::get('/do/do-member-loan-details/{id}',[App\Http\Controllers\Do\DoMemberLoanDetailController::class, 'index']);


    Route::resource('/do/members', App\Http\Controllers\Do\DoMemberController::class)->names('do.members');
    Route::get('/do/get-members', [App\Http\Controllers\Do\DoMemberController::class, 'getData']);
    Route::post('/do/member-disallow-loan/{id}', [App\Http\Controllers\Do\DoMemberController::class, 'userDisallowLoan']);
    Route::post('/do/member-allow-loan/{id}', [App\Http\Controllers\Do\DoMemberController::class, 'userAllowLoan']);

    Route::post('/do/users-set-inactive/{id}', [App\Http\Controllers\Do\DoMemberController::class, 'setInactive']);
    Route::post('/do/users-set-active/{id}', [App\Http\Controllers\Do\DoMemberController::class, 'setActive']);


    /* ============ OVER THE COUNTER FOR SAVINGS ROUTE ====================== */
    /* ============ TEMPORARY (MAYBE PANG DO, OR PANG BM ====================== */
    Route::resource('/do/member-savings-accounts', App\Http\Controllers\Do\DoMemberSavingsAccountController::class)->names('do.member-savings-accounts');
    Route::get('/do/get-member-savings-accounts', [App\Http\Controllers\Do\DoMemberSavingsAccountController::class, 'getData']); //this route for making a payment

    Route::post('/do/approve-savings-account/{id}', [App\Http\Controllers\Do\DoMemberSavingsAccountController::class, 'approve']); //approve
    Route::post('/do/disapprove-savings-account/{id}', [App\Http\Controllers\Do\DoMemberSavingsAccountController::class, 'disapprove']); //disapprove

    Route::post('/do/activate-savings-account/{id}', [App\Http\Controllers\Do\DoMemberSavingsAccountController::class, 'activate']); //approve
    Route::post('/do/deactivate-savings-account/{id}', [App\Http\Controllers\Do\DoMemberSavingsAccountController::class, 'deactivate']); //disapprove


    /* ================WITHDRAWAL/DEPOSIT========================= */
    Route::get('/do/member-withdrawal-deposit/{id}', [App\Http\Controllers\Do\MemberWithdrawalDepositController::class, 'index']);


});
