<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Inertia\Inertia;
use Inertia\Response;

class MemberDepositOnlineController extends Controller
{

    public function index($id){
        return Inertia::render('Member/MySavings/DepositOnlineIndex');
    }

    // public function depositOnline($id){
    //     $user = Auth::user();

    //     $client = new \GuzzleHttp\Client();

    //     $amount = $req->amount;
    //     $name = $user->lname . ', ' . $user->fname;
    //     $refNo = $req->refno;

    //     $paymentMethod = $req->paymentmethod;

    //     $data = [
    //         'data' => [
    //             'attributes' => [
    //                 'send_email_receipt' => false,
    //                 'show_description' => true,
    //                 'show_line_items' => true,
    //                 'description' => 'Loan',
    //                 'cancel_url' => env('PAYMONGO_REDIRECT_MERCHANT') . '/paymongo/cancel',
    //                 'line_items' => [
    //                     [
    //                         'currency' => 'PHP',
    //                         'amount' => $amount * 100,
    //                         'description' => 'Loan Payment',
    //                         'name' => $name,
    //                         'quantity' => 1,
    //                     ]
    //                 ],
    //                 'billing' => [
    //                     'email' => $user->email,
    //                     'name' => $name,
    //                     'phone' => $user->contact_no
    //                 ],
    //                 'payment_method_types' => ['gcash','billease','card', 'grab_pay', 'paymaya'],
    //                 'reference_number' => $refNo,
    //                 'success_url' => env('PAYMONGO_REDIRECT_MERCHANT') . '/paymongo/success',
    //                 'metadata' => [
    //                     'name' => $name,
    //                     'payment_method' => $paymentMethod,
    //                     'email' => $user->email,
    //                     'contact' => $user->contact_no,
    //                     'ref' => $refNo,
    //                     'amount_paid' => $amount,
    //                     'loan_id' => $req->loanid,
    //                     'loan_detail_id' => $req->loandetailid,
    //                     'user_id' => $user->id
    //                 ]
    //             ],
                
    //         ]
    //     ];

    //     $response = $client->request('POST', 'https://api.paymongo.com/v1/checkout_sessions', [
    //         'body' => json_encode($data),
    //         'headers' => [
    //             'Content-Type' => 'application/json',
    //             'accept' => 'application/json',
    //             'authorization' => 'Basic '. env('PAYMONGO_SECRET_KEY'),
    //         ],
    //     ]);

    //     $data = json_decode($response->getBody()->getContents(), true);
    //     //$paymongoTransactionId = $data['data']['id'];
    //     $req->session()->put('paymongo', $data);
        
    //     return $data;
    // }
}
