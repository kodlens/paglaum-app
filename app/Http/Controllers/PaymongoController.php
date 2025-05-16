<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\LoanDetail;
use Illuminate\Support\Facades\Http;
use App\Models\SavingTransaction;
use App\Models\SavingAccount;


class PaymongoController extends Controller
{
    //
    public function pay(Request $req){
        //return $req;
        $user = Auth::user();

        $client = new \GuzzleHttp\Client();

        $amount = $req->amount;
        $name = $user->lname . ', ' . $user->fname;
        $refNo = $req->refno;

        $detail = LoanDetail::find($req->loandetailid);

        $paymentMethod = $req->paymentmethod;

        $data = [
            'data' => [
                'attributes' => [
                    'send_email_receipt' => false,
                    'show_description' => true,
                    'show_line_items' => true,
                    'description' => 'Loan',
                    'cancel_url' => env('PAYMONGO_REDIRECT_MERCHANT') . '/paymongo/cancel',
                    'line_items' => [
                        [
                            'currency' => 'PHP',
                            'amount' => $amount * 100,
                            'description' => 'Loan Payment',
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
                    'success_url' => env('PAYMONGO_REDIRECT_MERCHANT') . '/paymongo/success',
                    'metadata' => [
                        'user_id' => $user->id,
                        'name' => $name,
                        'payment_method' => $paymentMethod,
                        'email' => $user->email,
                        'contact' => $user->contact_no,
                        'ref' => $refNo,
                        'principal' => $detail->amount,
                        'shared' => $detail->shared,
                        'amount_paid' => $amount,
                        'loan_id' => $req->loanid,
                        'loan_detail_id' => $req->loandetailid,
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
        $req->session()->put('paymongo', $data);
        
        return $data;
    }


    public function cancel(Request $req){
        $req->session()->forget('paymongo');
        return Inertia::render('Member/MyLoan/Paymongo/PaymongoLoanPaymentCancel');
    }


    public function success(Request $req){
        
        $paymongoDetails = $req->session()->get('paymongo');
        //return $paymongoDetails['data']['attributes']['payment_intent'];
        $paymentinfo = $paymongoDetails['data']['attributes']['metadata'];
        $paymentSession = $paymongoDetails['data']['id'];
        $userId = $paymentinfo['user_id'];
        $loanId = $paymentinfo['loan_id'];
        $ref = $paymentinfo['ref'];
        $paymentMethod = $paymentinfo['payment_method'];
        $loanDetailId = $paymentinfo['loan_detail_id'];
        $amounPaid = $paymentinfo['amount_paid'];
        $paymentIntent = $paymongoDetails['data']['attributes']['payment_intent'];

        $loanDetail = LoanDetail::find($loanDetailId);
        $loanDetail->is_paid = 1;
        $loanDetail->ref = $ref;
        $loanDetail->amount_paid = $amounPaid;
        $loanDetail->payment_method = 'ONLINE';
        $loanDetail->payment_transaction = 'ONLINE';
        $loanDetail->payment_session = $paymentSession;
        $loanDetail->payment_intent = $paymentIntent['id'];
        $loanDetail->datetime_paid = \Carbon\Carbon::now();
        $loanDetail->save();

        $userId = $paymentinfo['user_id'];
        $shared = $paymentinfo['shared'];

        $savingsAcc = SavingAccount::where('user_id', $userId)
            ->where('default_account', 1)->first();

        SavingTransaction::create([
            'saving_account_id' => $savingsAcc->id,
            'transaction_type' => 'ONLINE/LOAN PAYMENT',
            'payment_method' => 'ONLINE/LOAN PAYMENT',
            'refno' => 'loanref_'.$ref,
            'remarks' => 'SAVINGS FROM LOAN',
            'amount' => $shared,
            'balance' => $savingsAcc->balance + $shared,
            'fee' => 0,
            'datetime_deposit' => \Carbon\Carbon::now(),
            'payment_intent' => $paymentIntent['id']
        ]);

        SavingAccount::where('user_id', $userId)
            ->where('default_account', 1)
            ->update([
                'balance' => $savingsAcc->balance + $shared
            ]);

        if(env('SMS') > 0){
            $apiKey = env('SMS_API_KEY');
            $response = Http::asForm()->post('https://semaphore.co/api/v4/messages', [
                'apikey'     => $apiKey,
                'number'     => $paymentinfo['contact'],
                'message'    => "You have successfully paid the amount of P". $amounPaid .". Thank you.",
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

        return Inertia::render('Member/MyLoan/Paymongo/PaymongoLoanPaymentSuccess');
    }

    public function paymentMethod($id){

        $client = new \GuzzleHttp\Client();

        $response = $client->request('GET', 'https://api.paymongo.com/v1/payment_methods/'. $id, [
            'headers' => [
                'accept' => 'application/json',
                'authorization' => 'Basic '. env('PAYMONGO_SECRET_KEY'),
            ],
        ]);

        echo $response->getBody();
    }



}

