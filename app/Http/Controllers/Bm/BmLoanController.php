<?php

namespace App\Http\Controllers\Bm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Loan;

class BmLoanController extends Controller
{
    public function index(){
        return Inertia::render('Bm/BmLoans/BmLoansIndex');
    }

    public function getData(Request $req){

        $data = Loan::with(['user', 'loan_type', 'loan_subtype'])
            ->paginate($req->perPage);

        return $data;
    }


}
