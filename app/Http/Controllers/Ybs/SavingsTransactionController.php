<?php

namespace App\Http\Controllers\Ybs;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SavingAccount;
use App\Models\SavingTransaction;
use Inertia\Inertia;
use Inertia\Response;

class SavingsTransactionController extends Controller
{
     public function index($id){
        $savingsAccount = SavingAccount::with(['saving_transactions'])
            ->find($id);

        return Inertia::render('Ybs/MySavings/MySavingsTransactions/index',
        [
            'savingsAccount' => $savingsAccount
        ]);
    }

     public function getSavingsTransaction(Request $req){
        return SavingTransaction::where('saving_account_id', $req->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);
    }

}
