<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Loan;

class AdminPendingLoanController extends Controller
{
    public function index(){
        return Inertia::render('Admin/AdminPendingLoan/index');
    }


    public function getData(Request $req){

        $data = Loan::with(['user', 'loan_type', 'loan_subtype'])
            ->where('is_approve', 0);
      

        return $data->paginate($req->perPage);
    }
}
