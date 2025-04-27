<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\LoanDetail;

class PaymongoController extends Controller
{
    //
    public function pay(Request $req){
        
        $user = Auth::user();

        $client = new \GuzzleHttp\Client();

        $amount = $req->amount;
        $name = $user->lname . ', ' . $user->fname;
        $refNo = $req->refno;

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
                        'name' => $name,
                        'payment_method' => $paymentMethod,
                        'email' => $user->email,
                        'contact' => $user->contact_no,
                        'ref' => $refNo,
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

        $paymentinfo = $paymongoDetails['data']['attributes']['metadata'];
        $paymentSession = $paymongoDetails['data']['id'];
        $userId = $paymentinfo['user_id'];
        $loanId = $paymentinfo['loan_id'];
        $ref = $paymentinfo['ref'];
        $paymentMethod = $paymentinfo['payment_method'];
        $loanDetailId = $paymentinfo['loan_detail_id'];

        $loanDetail = LoanDetail::find($loanDetailId);
        $loanDetail->is_paid = 1;
        $loanDetail->ref = $ref;
        $loanDetail->payment_method = 'ONLINE';
        $loanDetail->payment_transaction = 'ONLINE';
        $loanDetail->payment_session = $paymentSession;

        $loanDetail->save();

        //return $paymongoDetails;

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

