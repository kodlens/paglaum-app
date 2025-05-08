<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Auth;
use App\Models\User;
use App\Mail\OtpMail;

class AccountSettingController extends Controller
{
    public function index(){
        return Inertia::render('Member/AccountSetting/index');    
    }


    function generateOTP($length = 6) {
        $otp = '';
        for ($i = 0; $i < $length; $i++) {
            $otp .= mt_rand(0, 9);
        }
        return $otp;
    }

    public function requestCode(Request $req){
        $req->validate([
            'send_to' => ['required']
        ],[
            'send_to.required' => 'Please select how this OTP should be sent.'
        ]);
        $user = Auth::user();
        $otp = $this->generateOTP();

        $data = User::find($user->id);
        $data->code_2fa = $otp;
        $data->save();

        

        // $exists = User::where('code_2fa', $otp)
        //     ->exists();
        
        // if($exists){
        //     $otp = $this->generateOTP();
        // }

        if($req->send_to === 'email'){
            Mail::to($user->email)->send(new OtpMail($otp));
        }

        if($req->send_to === 'mobile'){
            
        }

        return response()->json([
            'status' => 'success',
            'otp' => $otp
        ], 200);

    }

    public function saveSetting(Request $req){
        return $req;
    }

    

}
