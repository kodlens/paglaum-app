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



}
