<?php

namespace App\Http\Controllers\Ybs;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class YbsDashboardController extends Controller
{
    
    public function index(){
        return Inertia::render('Ybs/YbsDashboard');
    }


}
