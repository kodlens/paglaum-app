<?php

namespace App\Http\Controllers\Ipp;

use App\Http\Controllers\Do\DoLoanController;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IppLoanController extends DoLoanController
{
    //
    public function index(){
        return Inertia::render('Ipp/IppLoan/index');
    }


    
}
