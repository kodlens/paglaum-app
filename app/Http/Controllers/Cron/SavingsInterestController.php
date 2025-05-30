<?php

namespace App\Http\Controllers\Cron;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carboon\Carbon;
use App\Models\SavingAccount;
use App\Models\SavingTransaction;

class SavingsInterestController extends Controller
{
    public function savingsInterest(){
        $today = \Carbon\Carbon::today();
        
        $month = $today->month;
        $date = $today->day;
        $year = $today->year;

        $savings = SavingAccount::whereMonth('opened_at', $month)
            ->whereDay('opened_at', $date)
            
            ->where('is_active', 1)
            ->get();

        foreach($savings as $saving){
            $interestAmount = $saving['balance'] * .15;
            $balance = $saving['balance'] + $interestAmount;

            SavingTransaction::create([
                'saving_account_id' => $saving['id'],
                'transaction_type' => 'DEPOSIT',
                'payment_method' => 'INTEREST',
                'ref_no' => 'REF' .$saving['id'],
                'remarks' => 'INTEREST',
                'amount' => $interestAmount,
                'balance' => $balance
            ]);

            SavingAccount::where('id', $saving['id'])
                ->update([
                    'balance' => $balance
                ]);
        }

        \Log::info("Check saving interest");

        return response()->json([
            'status' => 'interest'
        ], 200);;
    }

    
}
