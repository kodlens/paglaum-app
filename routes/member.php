<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

/* ===============================
    MEMBER ROUTES
==================================*/


Route::resource('/member/dashboard', App\Http\Controllers\Member\MemberDashboardController::class)->names('member.dashboard');


Route::middleware('auth', 'active')->group(function () {
    
    Route::get('/member/profile', [ProfileController::class, 'edit'])->name('member.profile.edit');
    Route::patch('/member/profile', [ProfileController::class, 'update'])->name('member.profile.update');
    Route::delete('/member/profile', [ProfileController::class, 'destroy'])->name('member.profile.destroy');

    Route::resource('/member/my-loans', App\Http\Controllers\Member\MemberMyLoanController::class)->names('member.my-loans');


});





/* ===============================
    MEMBER ROUTES
==================================*/

