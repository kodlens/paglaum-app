<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoanType;

class OpenController extends Controller
{
    public function loadLoanTypes(Request $req){
        return LoanType::with('loanSubtypes')->orderBy('id','asc')->get();
    }

    
}
