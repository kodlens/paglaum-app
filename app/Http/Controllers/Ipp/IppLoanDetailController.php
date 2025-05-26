<?php

namespace App\Http\Controllers\Ipp;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Loan;

class IppLoanDetailController extends Controller
{
    //
    public function index($id){
        
        $loan = Loan::with(['loan_details', 'user'])
            ->where('id', $id)->first();

        return Inertia::render('Ipp/IppLoan/LoanDetails', [
            'loan' => $loan
        ]);
    }
}
