<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Loan;
use Inertia\Inertia;
use Inertia\Response;

class MemeberMyLoanDetailController extends Controller
{
    
    public function index($id){
        $loan = Loan::with(['loan_details', 'user', 'loan_type', 'loan_subtype'])
            ->where('id', $id)
            ->first();
        //return $loan;

        //$details = LoanDetail::where('loan_id', $id)->get();

        return Inertia::render('Member/MyLoan/MyLoanDetailsPage',[
            'loan' => $loan
        ]);
    }
}
