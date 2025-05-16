<?php

namespace App\Http\Controllers\Do;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\SavingAccount;
use App\Models\SavingTransaction;
use App\Models\User;
use Illuminate\Support\Facades\Http;

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
        $msg = '';
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
            $msg = 'An amount of '. $req->amount . ' has been deposited from your account. Thank you.';

            $data->increment('balance', $req->amount);
            $data->save();

            $balance = $balance + $req->amount;
        }
        if($req->transaction_type === 'WITHDRAW'){
            $msg = 'An amount of '. $req->amount . ' has been withdrawn from your account. Thank you.';

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

        $user = User::where('id', $data->user_id)->first();
        $output = '';
        if(env('SMS') > 0){
            $apiKey = env('SMS_API_KEY');
            $response = Http::asForm()->post('https://semaphore.co/api/v4/messages', [
                'apikey'     => $apiKey,
                'number'     => $user->contact_no,
                'message'    => $msg,
                'sendername' => 'LARATSYS',
            ]);
            
            // Check if request was successful
            if ($response->successful()) {
                $output = $response->json(); // Optional: handle the JSON response
            } else {
                // Handle the error
                \Log::error('SMS sending failed', [
                    'response' => $response->body(),
                    'status' => $response->status(),
                ]);
            }
        }
        


        return response()->json([
            'status' => 'saved'
        ], 200);
    }
}
