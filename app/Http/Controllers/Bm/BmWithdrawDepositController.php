<?php

namespace App\Http\Controllers\Bm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\SavingAccount;
use App\Models\SavingTransaction;

class BmWithdrawDepositController extends Controller
{
    public function index($id){
        $savingsAccount = SavingAccount::with(['user'])
            ->where('id',$id)
            ->first();

        return Inertia::render('Bm/BmWithdrawDeposit/BmWithdrawDepositIndex',
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

        $data = SavingAccount::find($id);
        $balance = $data->balance;

        //check if account is approved and active
        if(!$data->is_active){
            return response()->json([
                'errors' => [
                    'amount' => ['Account is not active.']
                ],
                'message' => 'Account is not active.'
            ], 422);
        }
        if(!$data->is_approved){
            return response()->json([
                'errors' => [
                    'amount' => ['The account has not been approved yet.']
                ],
                'message' => 'The account has not been approved yet.'
            ], 422);
        }

        if($req->transaction_type === 'DEPOSIT'){
            $data->increment('balance', $req->amount);
            $data->save();

            $balance = $balance + $req->amount;
        }
        if($req->transaction_type === 'WITHDRAW'){

            $nextBalance = $data->balance - $req->amount;

            if($nextBalance < 300){
                return response()->json([
                    'errors' => [
                       'amount' => ['Your balance must not lower than 300']
                    ],
                    'message' => 'Your balance must not lower than 300'
                ], 422);
            }

            if($data->balance < $req->amount){
                return response()->json([
                    'errors' => [
                       'amount' => ['Your don\'t have sufficient balance to do this transaction']
                    ],
                    'message' => 'Your don\'t have sufficient balance to do this transaction'
                ], 422);
            }
            $data->decrement('balance', $req->amount);
            $data->save();
            $balance = $balance - $req->amount;
        }

        //save the transaction
        SavingTransaction::create([
            'saving_account_id' => $id,
            'transaction_type' => $req->transaction_type,
            'amount' => $req->amount,
            'balance' => $balance
        ]);


        return response()->json([
            'status' => 'saved'
        ], 200);
    }

    
}
