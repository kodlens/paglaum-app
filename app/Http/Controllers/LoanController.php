<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoanController extends Controller
{
    
    public function getData(Request $req){
        $do = $req->do;
        $bm = $req->bm;

        $data = Loan::with(['user', 'loan_type', 'loan_subtype']);
        
        if($do != ''){
            $data->where('is_do_approve', $do);
        }

        if($bm != ''){
            $data->where('is_bm_approve', $bm);
        }


        return $data->paginate($req->perPage);
    }

}
