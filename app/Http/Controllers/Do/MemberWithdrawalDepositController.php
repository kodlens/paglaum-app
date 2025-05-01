<?php

namespace App\Http\Controllers\Do;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\SavingAccount;
use App\Models\SavingTransaction;

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


    public function store(Request $req, $id){

        //return $req;

        if($id == null || $id < 1){
            return response()->json([
                'errors' => [
                    'id' => ['Loan Identification is required.']
                ],
                'message' => ['Loan Identification is required.']
            ], 422);
        }

        $req->validate([
            'transaction_type' => ['required'],
            'amount' => ['gt:0', 'required']
        ]);

        SavingTransaction::create([
            'saving_account_id' => $id,
            'transaction_type' => $req->transaction_type,
            'amount' => $req->amount
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }
}
