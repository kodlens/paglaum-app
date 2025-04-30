<?php

namespace App\Http\Controllers\Do;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\SavingAccount;


class MemberWithdrawalDepositController extends Controller
{
    //
    public function index($id){
        $savingsAccount = SavingAccount::with(['user'])
            ->where('id',$id)
            ->first();
            
        return Inertia::render('Do/DoWithdrawDeposit/DoWithdrawDepositIndex',
        [
            'savingsAccount' => $savingsAccount
        ]);
    }
}
