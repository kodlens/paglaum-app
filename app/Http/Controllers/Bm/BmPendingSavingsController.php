<?php

namespace App\Http\Controllers\Bm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\SavingAccount;

class BmPendingSavingsController extends Controller
{
    public function index(){
        return Inertia::render('Bm/BmPendingSavingsAccount/index');
    }

    public function getData(Request $req){

        $data = SavingAccount::where('account_name', 'like', $req->lname . '%')
            ->where('is_bm_approved', 0)
            ->where('is_do_approved', 0);
        return $data->paginate($req->perPage);
    }

    
}
