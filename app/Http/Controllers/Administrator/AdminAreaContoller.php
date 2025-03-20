<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminAreaContoller extends Controller
{
    //
    public function index(){
        return Inertia::render('Admin/Area/AdminAreaIndex');

    }
}
