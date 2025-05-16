<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SavingAccount;


class SavingsAccountController extends Controller
{
    //

    public function setDefaultAccount(Request $req){

        $savingsAccId = $req->accountid;
        $userId = $req->userid;

        SavingAccount::where('user_id', $userId)
            ->update([
                'default_account' => 0
            ]);

        SavingAccount::where('user_id', $userId)
            ->where('id', $savingsAccId)
            ->update([
                'default_account' => 1
            ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }
}
