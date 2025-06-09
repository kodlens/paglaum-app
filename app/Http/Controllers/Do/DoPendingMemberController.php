<?php

namespace App\Http\Controllers\Do;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DoPendingMemberController extends Controller
{
    public function index(){
        return Inertia::render('Do/DoPendingMember/index');
    }

    public function getData(Request $req){

        $data = User::where('lname', 'like', $req->lname . '%')
            ->where(function($q){
                $q->where('role', 'MEMBER')
                    ->orWhere('role', 'YBS');
            })
            ->where('active', 0);

        return $data->paginate($req->perPage);
    }
}
