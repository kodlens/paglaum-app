<?php

namespace App\Http\Controllers\Do;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DoMakeAPaymentController extends Controller
{
    //

    public function index($id){
        return Inertia::render('Do/DoLoans/DoMakeAPayment', [
            'loanId' => $id
        ]);
    }

   


}
