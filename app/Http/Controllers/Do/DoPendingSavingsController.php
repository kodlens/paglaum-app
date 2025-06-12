<?php

namespace App\Http\Controllers\Do;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\SavingAccount;

class DoPendingSavingsController extends Controller
{
    public function index(){
        return Inertia::render('Do/DoPendingSavingsAccount/index');
    }

    public function getData(Request $req){

        $data = SavingAccount::where('account_name', 'like', $req->lname . '%')
            ->where('is_do_approved', 0);

        return $data->paginate($req->perPage);
    }
}
