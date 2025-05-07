<?php

use Illuminate\Support\Facades\Route;



Route::middleware(['auth', 'verified','active'])->group(function () {

    Route::resource('/ybs/dashboard', App\Http\Controllers\Ybs\YbsDashboardController::class)->names('ybs.dashboard');
    
});