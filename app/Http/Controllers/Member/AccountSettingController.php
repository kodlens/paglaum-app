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
use Carbon\Carbon;

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
        $data->expiration_code_2fa = Carbon::now()->addMinutes(5);
        $data->save();

        

        // $exists = User::where('code_2fa', $otp)
        //     ->exists();
        
        // if($exists){
        //     $otp = $this->generateOTP();
        // }

        if($req->send_to === 'email'){
            Mail::to($user->email)->send(new OtpMail($otp));

            return response()->json([
                'status' => 'success',
                'otp' => $otp,
                'message' => 'OTP successfully sent to your email.'
            ], 200);
        }

        if($req->send_to === 'mobile'){
            return response()->json([
                'status' => 'success',
                'otp' => $otp,
                'message' => 'OTP successfully sent to your mobile no.'
            ], 200);
        }

        return response()->json([
            'status' => 'error',
        ], 500);

    }

    public function saveSetting(Request $req){
        $req->validate([
            'code_2fa' => ['required'],
        ],[
            'code_2fa.required' => 'OTP is required.'
        ]);

        $user = Auth::user();
        $otp = $req->code_2fa;
        $now = Carbon::now();

        //check is otp is exist on the current auth user
        $exist = User::where('id', $user->id)
            ->where('code_2fa', $otp)
            ->where('expiration_code_2fa', '>=', $now)
            ->exists();
        
        if(!$exist){
            return response()->json([
                'errors' => [
                    'code_2fa' => ['Error!']
                ],
                'message' => 'Error!'
            ], 422);
        }
        
      
        $data = User::find($user->id);
        $data->is_2fa = $req->is_2fa ? 1 : 0;
        $data->save();

        return response()->json([
            'status' => 'updated',
            'is_2fa' => $req->is_2fa
        ], 200);

    }

    

}
