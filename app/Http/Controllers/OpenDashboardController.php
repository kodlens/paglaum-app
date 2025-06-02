<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class OpenDashboardController extends Controller
{
    //

     public function pendingLoanApplication(){

        return Loan::where('is_bm_approve', 0)
            ->where('is_do_approve', 0)
            ->count();
     }

    public function loadPendingAccounts(){
        return User::where('active', 0)
            ->count();
    }

    public function loadLoanPaymentToday(){
        $totalPaymentToday = DB::table('loan_details')
            ->whereDate('datetime_paid', Carbon::today())
            ->sum('amount_paid');

        return $totalPaymentToday;
    }

    public function loadLoanDepositToday(){
        $total = DB::table('saving_transactions')
            ->where('transaction_type', 'deposit') // adjust if your value differs
            ->whereDate('datetime_deposit', Carbon::today())
            ->sum('amount');

        return $total;
    }

    
}
