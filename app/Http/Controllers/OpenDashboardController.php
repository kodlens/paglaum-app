<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OpenDashboardController extends Controller
{
    //

    public function loanRequestCount(){

        return Loan::where('is_bm_approve', 0)
            ->where('is_do_approve')
            ->count();
    }
}
