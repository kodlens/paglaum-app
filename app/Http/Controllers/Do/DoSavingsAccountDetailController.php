<?php

namespace App\Http\Controllers\Do;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\SavingAccount;
use App\Models\SavingTransaction;


class DoSavingsAccountDetailController extends Controller
{
    public function index($id){
        $savingAccount = SavingAccount::find($id);
        return Inertia::render('Do/DoSavingsAccountDetail/index',
        [
            'savingAccount' => $savingAccount
        ]);
    }

    public function getData(Request $req){
        return SavingTransaction::where('saving_account_id', $req->id)
            ->orderBy('created_at', 'desc')
            ->paginate($req->perPage);
    }


}
