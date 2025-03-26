<?php

namespace App\Http\Controllers\Do;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class DoDashboardController extends Controller
{
    
    public function index(){
        return Inertia::render('Do/DoDashboard');
    }


}
