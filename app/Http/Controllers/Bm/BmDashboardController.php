<?php

namespace App\Http\Controllers\Bm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BmDashboardController extends Controller
{
    public function index(){
        return Inertia::render('Bm/BmDashboard');
    }
}
