<?php


Route::middleware(['auth', 'bm'])->group(function () {
    Route::resource('/bm/dashboard', App\Http\Controllers\Bm\BmDashboardController::class)->names('bm.dashboard');


    Route::resource('/bm/loans', App\Http\Controllers\Bm\BmLoanController::class)->names('bm.loans');
    Route::get('/bm/get-loans', [App\Http\Controllers\Bm\BmLoanController::class, 'getData']);
    Route::post('/bm/approve-loan', [App\Http\Controllers\Bm\BmLoanController::class, 'approveLoan']);
    Route::post('/bm/disapprove-loan', [App\Http\Controllers\Bm\BmLoanController::class, 'disapproveLoan']);

    Route::resource('/bm/members', App\Http\Controllers\Bm\BmMemberController::class)->names('bm.members');
    Route::get('/bm/get-members', [App\Http\Controllers\Bm\BmMemberController::class, 'getData']);
    Route::post('/bm/member-disallow-loan/{id}', [App\Http\Controllers\Bm\BmMemberController::class, 'userDisallowLoan']);
    Route::post('/bm/member-allow-loan/{id}', [App\Http\Controllers\Bm\BmMemberController::class, 'userAllowLoan']);

    Route::resource('/bm/savings-accounts', App\Http\Controllers\Bm\BmSavingsAccountController::class)->names('bm.savings-accounts');
    Route::get('/bm/get-savings-accounts', [App\Http\Controllers\Bm\BmSavingsAccountController::class, 'getData']);
    
    Route::post('/bm/approve-savings-account/{id}', [App\Http\Controllers\Bm\BmSavingsAccountController::class, 'approve']); //approve
    Route::post('/bm/disapprove-savings-account/{id}', [App\Http\Controllers\Bm\BmSavingsAccountController::class, 'disapprove']); //disapprove

    Route::post('/bm/activate-savings-account/{id}', [App\Http\Controllers\Bm\BmSavingsAccountController::class, 'activate']); //approve
    Route::post('/bm/deactivate-savings-account/{id}', [App\Http\Controllers\Bm\BmSavingsAccountController::class, 'deactivate']); //disapprove

      /* ================WITHDRAWAL/DEPOSIT========================= */
      Route::get('/bm/withdraw-deposit/{id}', [App\Http\Controllers\Bm\BmWithdrawDepositController::class, 'index']);
      Route::post('/bm/withdraw-deposit/{id}', [App\Http\Controllers\Bm\BmWithdrawDepositController::class, 'store']);
  
      Route::get('/bm/savings-account-details/{id}', [App\Http\Controllers\Bm\BmSavingsAccountDetailController::class, 'index']);
      Route::get('/bm/get-savings-account-details', [App\Http\Controllers\Bm\BmSavingsAccountDetailController::class, 'getData']);


    // Route::resource('/admin/areas', App\Http\Controllers\Administrator\AdminAreaContoller::class)->names('admin.areas');
    // Route::get('/admin/get-areas', [App\Http\Controllers\Administrator\AdminAreaContoller::class, 'getData']);

    // Route::resource('/admin/education-levels', App\Http\Controllers\Administrator\AdminEducationLevelController::class)->names('admin.education-levels');
    // Route::get('/admin/get-education-levels', [App\Http\Controllers\Administrator\AdminEducationLevelController::class, 'getData']);


    // Route::post('/admin/user-set-active/{id}', [App\Http\Controllers\Administrator\UserController::class, 'userSetActive']);
    // Route::post('/admin/user-set-inactive/{id}', [App\Http\Controllers\Administrator\UserController::class, 'userSetInactive']);


});
