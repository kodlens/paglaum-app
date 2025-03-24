<?php

namespace App\Http\Controllers\Bm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class BmMemberController extends Controller
{
    public function index(){
        return Inertia::render('Bm/Member/BmMemberIndex');
    }

    public function getData(Request $req){

        $data = User::where('lname', 'like', $req->lname . '%')
            ->where('role', 'MEMBER')
            ->paginate($req->perPage);

        return $data;
    }

    public function show($id){
        return User::find($id);
    }


    public function userSetActive($id){

        $user = User::find($id);
        $user->active = 1;
        $user->save();

        return response()->json([
            'status' => 'active'
        ], 200);
    }

    public function userSetInactive($id){

        $user = User::find($id);
        $user->active = 0;
        $user->save();

        return response()->json([
            'status' => 'inactive'
        ], 200);
    }


    public function userAllowLoan($id){
        $user = User::find($id);
        $user->is_loan_allowed = 1;
        $user->save();

        return response()->json([
            'status' => 'active'
        ], 200);
    }

    public function userDisallowLoan($id){

        $user = User::find($id);
        $user->is_loan_allowed = 0;
        $user->save();

        return response()->json([
            'status' => 'inactive'
        ], 200);
    }

}
