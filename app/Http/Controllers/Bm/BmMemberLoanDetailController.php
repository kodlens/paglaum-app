<?php

namespace App\Http\Controllers\Bm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Loan;
use Inertia\Inertia;
use Inertia\Response;

class BmMemberLoanDetailController extends Controller
{
     public function index($id){
        $loan = Loan::with(['loan_details', 'user'])
            ->where('id', $id)->first();

        return Inertia::render('Bm/BmLoans/BmMemberLoanDetails', [
            'loan' => $loan
        ]);
    }
}
