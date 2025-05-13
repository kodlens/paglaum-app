<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoanType;
use App\Models\EducationLevel;
use App\Models\IdType;
use App\Models\InsuranceType;
use App\Models\InsuranceTypeAgebracket;

class OpenController extends Controller
{
    public function loadLoanTypes(Request $req){
        return LoanType::with('loanSubtypes')->orderBy('id','asc')->get();
    }

    public function loadEducationLevels(){
        return EducationLevel::orderBy('id', 'asc')
            ->get();
    }

    public function loadIdTypes(){
        return IdType::orderBy('id', 'asc')
            ->get();
    }


    public function loadInsuranceTypes(){
        return InsuranceType::with(['insurance_types_agebrackets'])
            ->orderBy('id', 'asc')
            ->get();
    }

    public function loadInsuranceTypeAgeBracket($id){
        return InsuranceTypeAgebracket::where('insurance_type_id', $id)
            ->orderBy('id', 'asc')
            ->get();
    }
    
}
