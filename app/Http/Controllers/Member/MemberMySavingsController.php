<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\SavingAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use function Termwind\render;

class MemberMySavingsController extends Controller
{
    //

    public function index(){
        return Inertia::render('Member/MySavings/MySavingsIndex', []);
    }

    public function getData(Request $req){
        $user = Auth::user();

        return SavingAccount::where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->get();
    }


}
