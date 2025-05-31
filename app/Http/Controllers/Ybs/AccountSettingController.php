<?php

namespace App\Http\Controllers\Ybs;

use App\Http\Controllers\Member;
use Illuminate\Http\Request;

class AccountSettingController extends AccountSettingController
{
    public function index(){
        return Inertia::render('Ybs/AccountSetting/index');    
    }
}
