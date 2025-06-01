<?php

namespace App\Http\Controllers\Ybs;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class YbsProfileController extends Controller
{
    public function index() {
        return Inertia::render('Ybs/Profile/index');
    }

    
}
