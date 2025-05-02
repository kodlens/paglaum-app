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


    public function approve($id){
        $data = SavingAccount::find($id);
        $data->is_approved = 1;
        $data->save();

        return response()->json([
            'status' => 'approved',
        ], 200);
    }

    public function disapprove($id){
        $data = SavingAccount::find($id);
        $data->is_approved = 0;
        $data->save();

        return response()->json([
            'status' => 'disapproved',
        ], 200);
    }


    public function activate($id){
        $data = SavingAccount::find($id);
        $data->is_active = 1;
        $data->save();

        return response()->json([
            'status' => 'activated',
        ], 200);
    }

    public function deactivate($id){
        $data = SavingAccount::find($id);
        $data->is_active = 0;
        $data->save();

        return response()->json([
            'status' => 'deactivated',
        ], 200);
    }

}

