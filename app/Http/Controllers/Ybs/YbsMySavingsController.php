<?php

namespace App\Http\Controllers\Ybs;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\SavingAccount;
use Auth;

class YbsMySavingsController extends Controller
{
    public function index(){
        return Inertia::render('Ybs/MySavings/index');
    }


    public function getData(Request $req){
        $user = Auth::user();

        return SavingAccount::where('user_id', $user->id)
            //->where('is_approved', 1)
            ->where('is_active', 1)
            ->orderBy('id', 'desc')
            ->get();
    }
}
