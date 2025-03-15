<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MemberMyLoanController extends Controller
{
    //
    public function index(){
        return Inertia::render('Member/MyLoan/MyLoanIndex');
    }

    public function store(Request $req){
        //return $req;
        $principal = (double)$req->principal;
      
        if($principal < 100){
            return response()->json([
                'errors' => [
                    'principal' => ['Principal amount must not less than 100.'] 
                ],
                'message' => 'Principal amount must not less than 100.'
            ], 422);
        }

        $req->validate([
            'loan_type_id' => ['required'],
            'loan_subtype_id' => ['required'],
            //'principal' => ['required', 'min:100'],
            'terms' => ['required', 'min:1']
        ],[
            'loan_type_id.required' => 'Please select loan type',
            'loan_subtype_id.required' => 'Please select loan sub type',

        ]);

        $user = Auth::user();

        Loan::create([
            'user_id' => $user->id,
            'purpose' => $req->purpose,
            'loan_type_id' => $req->loan_type_id,
            'loan_subtype_id' => $req->loan_subtype_id,
            'principal' => $req->principal,
            'interest' => $req->interest,
            'terms' => $req->terms,
            
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }
}
