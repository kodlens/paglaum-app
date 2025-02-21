<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MemberMyLoanController extends Controller
{
    //
    public function index(){
        return Inertia::render('Member/MyLoan/MyLoanIndex');
    }
}
