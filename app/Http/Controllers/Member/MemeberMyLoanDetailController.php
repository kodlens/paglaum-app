<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LoanDetail;
use Inertia\Inertia;
use Inertia\Response;

class MemeberMyLoanDetailController extends Controller
{
    
    public function index($id){
        $details = LoanDetail::where('loan_id', $id)->get();

        return Inertia::render('Member/MyLoan/MyLoanDetailsPage',[
            'loanDetails' => $details
        ]);
    }
}
