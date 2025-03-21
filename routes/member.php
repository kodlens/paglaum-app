<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

/* ===============================
    MEMBER ROUTES
==================================*/


Route::get('/inactive', [App\Http\Controllers\InActiveController::class, 'index'])->name('inactive.index')
    ->middleware(['auth']);

Route::middleware(['auth', 'active'])->group(function () {

    Route::resource('/member/dashboard', App\Http\Controllers\Member\MemberDashboardController::class)->names('member.dashboard');

    Route::get('/member/profile', [ProfileController::class, 'edit'])->name('member.profile.edit');
    Route::patch('/member/profile', [ProfileController::class, 'update'])->name('member.profile.update');
    Route::delete('/member/profile', [ProfileController::class, 'destroy'])->name('member.profile.destroy');
    Route::patch('/member/update-member-profile', [App\Http\Controllers\Member\MemberProfileController::class, 'updateProfile'])->name('member.update-member-profile');

    Route::resource('/member/my-loans', App\Http\Controllers\Member\MemberMyLoanController::class)->names('member.my-loans');
    Route::get('/member/get-my-loans', [App\Http\Controllers\Member\MemberMyLoanController::class, 'getMyLoans']);


    Route::get('/member/my-loans-details/{id}', [App\Http\Controllers\Member\MemeberMyLoanDetailController::class, 'index']);



});





/* ===============================
    MEMBER ROUTES
==================================*/

