<?php

namespace App\Http\Controllers\Bm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;


class BmPendingMemberController extends Controller
{
    public function index(){
        return Inertia::render('Bm/BmPendingMember/index');
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
