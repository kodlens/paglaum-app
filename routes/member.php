<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

/* ===============================
    MEMBER ROUTES
==================================*/


Route::get('/inactive', [App\Http\Controllers\InActiveController::class, 'index'])->name('inactive.index')
    ->middleware(['auth']);

Route::middleware(['auth', 'verified','active', 'member'])->group(function () {

    Route::resource('/member/dashboard', App\Http\Controllers\Member\MemberDashboardController::class)->names('member.dashboard');

    Route::get('/member/profile', [ProfileController::class, 'edit'])->name('member.profile.edit');
    Route::patch('/member/profile', [ProfileController::class, 'update'])->name('member.profile.update');
    Route::delete('/member/profile', [ProfileController::class, 'destroy'])->name('member.profile.destroy');
 
    Route::resource('/member/my-loans', App\Http\Controllers\Member\MemberMyLoanController::class)->names('member.my-loans');
    Route::get('/member/get-my-loans', [App\Http\Controllers\Member\MemberMyLoanController::class, 'getMyLoans']);
    Route::post('/member/co-maker-temp-upload', [App\Http\Controllers\Member\MemberMyLoanController::class, 'coMakerTempUpload']);
 
    Route::get('/member/loan-transactions', [App\Http\Controllers\Member\MemberLoanTransactionController::class, 'index'])->name('member.loan-transactions.index');

    Route::get('/member/my-loans-details/{id}', [App\Http\Controllers\Member\MemeberMyLoanDetailController::class, 'index']);

    /* ================SAVINGS ACCOUNT========================= */
    Route::post('/member/apply-savings-account', [App\Http\Controllers\Member\MemberApplySavingsAccountController::class, 'applySavingsAccount']);
    Route::post('/member/temp-upload', [App\Http\Controllers\Member\MemberApplySavingsAccountController::class, 'tempUpload']);
    Route::post('/member/temp-remove/{filename}', [App\Http\Controllers\Member\MemberApplySavingsAccountController::class, 'removeUpload']);
    Route::post('/member/image-remove/{id}/{filename}', [App\Http\Controllers\Member\MemberApplySavingsAccountController::class, 'imageRemove']);


    Route::resource('/member/my-savings', App\Http\Controllers\Member\MemberMySavingsController::class)->names('member.my-savings');
    Route::get('/member/get-my-savings', [App\Http\Controllers\Member\MemberMySavingsController::class, 'getData']);

    Route::get('/member/deposit-online/{id}', [App\Http\Controllers\Member\MemberDepositOnlineController::class, 'index']);
    Route::post('/member/deposit-online/{id}', [App\Http\Controllers\Member\MemberDepositOnlineController::class, 'depositOnline']);
    Route::get('/member/deposit-online-cancel', [App\Http\Controllers\Member\MemberDepositOnlineController::class , 'cancel'])->name('paymongo.deposit-cancel');
    Route::get('/member/deposit-online-success', [App\Http\Controllers\Member\MemberDepositOnlineController::class , 'success'])->name('paymongo.deposit-success');


    Route::get('/member/my-savings-transactions/{id}', [App\Http\Controllers\Member\MemberMySavingTransactionController::class, 'index'])->name('member.my-saving-transactions.index');
    Route::get('/member/get-my-savings-transactions/{id}', [App\Http\Controllers\Member\MemberMySavingTransactionController::class, 'getSavingsTransaction']);

    Route::resource('/member/account-settings', App\Http\Controllers\Member\AccountSettingController::class)->names('member.account-setting');
    Route::get('/member/get-account-settings', [App\Http\Controllers\Member\AccountSettingController::class, 'getData']);
    Route::post('/member/request-code', [App\Http\Controllers\Member\AccountSettingController::class, 'requestCode']);
    Route::post('/member/save-two-fa-setting', [App\Http\Controllers\Member\AccountSettingController::class, 'saveSetting']);

});





/* ===============================
    MEMBER ROUTES
==================================*/

