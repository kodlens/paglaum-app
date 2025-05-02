<?php

namespace App\Http\Controllers\Bm;

use App\Http\Controllers\Controller;
use App\Models\SavingAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BmSavingsAccountController extends Controller
{
    //
    public function index(){
        return Inertia::render('Bm/BmSavingsAccounts/BmSavingsAccountsIndex');
    }


    public function getData(Request $req){

        $data = SavingAccount::with(['user'])
            ->whereHas('user', function($q) use($req){
                $q->where('lname', 'like', $req->input('name').'%');
            })
            ->where('account_no', 'like', $req->input('sa').'%')
            ->paginate($req->perPage);

        return $data;
    }

}

