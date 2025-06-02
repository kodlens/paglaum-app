<?php

namespace App\Http\Controllers\Ybs;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Auth;

class YbsProfileController extends Controller
{
    public function index() {
        $profile = Auth::user()->load(['province', 'city', 'barangay']);
        return Inertia::render('Ybs/Profile/index',[
            'profile' => $profile
        ]);
    }

    
}
