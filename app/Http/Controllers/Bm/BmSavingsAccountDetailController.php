<?php

namespace App\Http\Controllers\Bm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SavingAccount;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\SavingTransaction;

class BmSavingsAccountDetailController extends Controller
{
    public function index($id){
        $savingAccount = SavingAccount::find($id);
        return Inertia::render('Bm/BmSavingsAccountDetail/BmSavingsAccountDetailIndex',
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
