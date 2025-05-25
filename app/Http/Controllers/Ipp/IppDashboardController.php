<?php

namespace App\Http\Controllers\Ipp;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IppDashboardController extends Controller
{
    public function index(){
        return Inertia::render('Ipp/IppDashboard');
    }
}
