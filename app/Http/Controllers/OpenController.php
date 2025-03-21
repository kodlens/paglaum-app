<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoanType;
use App\Models\EducationLevel;

class OpenController extends Controller
{
    public function loadLoanTypes(Request $req){
        return LoanType::with('loanSubtypes')->orderBy('id','asc')->get();
    }

    public function loadEducationLevels(){
        return EducationLevel::orderBy('id', 'asc')
            ->get();
    }

    
}
