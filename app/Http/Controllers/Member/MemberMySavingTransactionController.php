<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SavingTransaction;
use App\Models\SavingAccount;
use Inertia\Inertia;
use Inertia\Response;

class MemberMySavingTransactionController extends Controller
{
    public function index($id){
        $savingsAccount = SavingAccount::with(['saving_transactions'])
            ->find($id);

        return Inertia::render('Member/MySavings/MySavingsTransactions/MySavingsTransactionsIndex',
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
