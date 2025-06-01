<?php

namespace App\Http\Controllers\Ybs;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SavingTransaction;
use App\Models\SavingAccount;
use Auth;
use Inertia\Inertia;
use Inertia\Response;

class DepositOnlineController extends Controller
{
     public function index($id){
        $savings = SavingAccount::with(['user'])
            ->find($id);

        return Inertia::render('Ybs/MySavings/DepositOnlineIndex', [
            'savingsAccount' => $savings,
            'id' => $id,
        ]);
    }

    public function depositOnline(Request $req){
        $user = Auth::user();

        $client = new \GuzzleHttp\Client();

        $amount = $req->deposit_amount;
        $name = $user->lname . ', ' . $user->fname;
        $refNo = $req->refno;

        $paymentMethod = $req->paymentmethod;

        $data = [
            'data' => [
                'attributes' => [
                    'send_email_receipt' => false,
                    'show_description' => true,
                    'show_line_items' => true,
                    'description' => 'Savings Deposit',
                    'cancel_url' => env('PAYMONGO_REDIRECT_MERCHANT') . '/ybs/deposit-online-cancel',
                    'line_items' => [
                        [
                            'currency' => 'PHP',
                            'amount' => $amount * 100,
                            'description' => 'Savings Deposit',
                            'name' => $name,
                            'quantity' => 1,
                        ]
                    ],
                    'billing' => [
                        'email' => $user->email,
                        'name' => $name,
                        'phone' => $user->contact_no
                    ],
                    'payment_method_types' => ['gcash','billease','card', 'grab_pay', 'paymaya'],
                    'reference_number' => $refNo,
                    'success_url' => env('PAYMONGO_REDIRECT_MERCHANT') . '/ybs/deposit-online-success',
                    'metadata' => [
                        'name' => $name,
                        'payment_method' => $paymentMethod,
                        'email' => $user->email,
                        'contact' => $user->contact_no,
                        'ref' => $refNo,
                        'amount_paid' => $amount,
                        'savings_account_id' => $req->savingsAccountId,
                        'user_id' => $user->id
                    ]
                ],
                
            ]
        ];

        $response = $client->request('POST', 'https://api.paymongo.com/v1/checkout_sessions', [
            'body' => json_encode($data),
            'headers' => [
                'Content-Type' => 'application/json',
                'accept' => 'application/json',
                'authorization' => 'Basic '. env('PAYMONGO_SECRET_KEY'),
            ],
        ]);

        $data = json_decode($response->getBody()->getContents(), true);
        //$paymongoTransactionId = $data['data']['id'];
        $req->session()->put('paymongo_deposit', $data);
        
        return $data;
    }


    public function success(Request $req){

        $paymongoDetails = $req->session()->get('paymongo_deposit');

        $paymentinfo = $paymongoDetails['data']['attributes']['metadata'];
        
        $paymentSession = $paymongoDetails['data']['id'];
        $userId = $paymentinfo['user_id'];
        $savingsId = $paymentinfo['savings_account_id'];
        $refno = $paymentinfo['ref'];
        $paymentMethod = $paymentinfo['payment_method'];
        $paymentIntent = $paymongoDetails['data']['attributes']['payment_intent'];

        $data = SavingAccount::find($savingsId);
        // $data->refno = $refno;
        // $data->payment_method = 'ONLINE';
        // $data->transaction_type = 'ONLINE';
        // $data->payment_session = $paymentSession;
        // $data->datetime_deposit = \Carbon\Carbon::now();
        // $data->save();
        
        SavingTransaction::create([
            'saving_account_id' => $savingsId,
            'transaction_type' => 'DEPOSIT',
            'payment_method' => $paymentMethod,
            'payment_session' => $paymentSession,
            'payment_intent' => $paymentIntent['id'],
            'refno' => $refno,
            'remarks' => 'DEPOSIT',
            'amount' => $paymentinfo['amount_paid'],
            'balance' => $data->balance + $paymentinfo['amount_paid'],
            'fee' => 0,
            'datetime_deposit' => \Carbon\Carbon::now(),
        ]);

        $data->balance = $data->balance + $paymentinfo['amount_paid'];

        //return $data;
        $data->save();

        //return $paymongoDetails;

        return Inertia::render('Ybs/MySavings/Paymongo/SavingsDepositSuccess');
    }

    public function cancel(Request $req){
        return Inertia::render('Ybs/MySavings/Paymongo/SavingsDepositCancel');
    }
}
