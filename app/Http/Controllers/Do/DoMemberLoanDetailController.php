<?php

namespace App\Http\Controllers\Do;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Loan;


class DoMemberLoanDetailController extends Controller
{
    //
    public function index($id){
        $loan = Loan::with(['loan_details', 'user'])
            ->where('id', $id)->first();

        return Inertia::render('Do/DoLoans/DoMemberLoanDetails', [
            'loan' => $loan
        ]);
    }
}
