<?php

namespace App\Http\Controllers\Do;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Loan;

class DoPendingLoanController extends Controller
{
    public function index(){
        return Inertia::render('Do/DoPendingLoan/index');
    }


    public function getData(Request $req){

        $data = Loan::with(['user', 'loan_type', 'loan_subtype'])
            ->where('is_do_approve', 0)
            ->where('is_bm_approve', 0);
      

        return $data->paginate($req->perPage);
    }

}
