<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpMail;
use Carbon\Carbon;
use App\Models\User;
use Auth;
use Illuminate\Support\Facades\Http;


class OtpAuthenticationController extends Controller
{

    
    function generateOTP($length = 6) {
        $otp = '';
        for ($i = 0; $i < $length; $i++) {
            $otp .= mt_rand(0, 9);
        }
        return $otp;
    }


    public function index(){
        $user = Auth::user();

        return Inertia::render('Member/OTP/index',[
            'otpSender' => $user->otp_sender
        ]);
    }

    public function requestOTP() {
        $user = Auth::user();
        $otp = $this->generateOTP();

        $data = User::find($user->id);
        $data->code_2fa = $otp;
        $data->expiration_code_2fa = Carbon::now()->addMinutes(5);
        $data->save();

        if($user->otp_sender === 'email'){
            Mail::to($user->email)->send(new OtpMail($otp));
        }

        if($user->otp_sender === 'mobile'){
            $output = '';
            if(env('SMS') > 0){
                $apiKey = env('SMS_API_KEY');
                $response = Http::asForm()->post('https://semaphore.co/api/v4/messages', [
                    'apikey'     => $apiKey,
                    'number'     => $user->contact_no,
                    'message'    => 'Hello ' . $user->lname . ', '. $user->fname . ', Your PAGLAUM OTP is '.$otp.'. Thank you.',
                    'sendername' => 'LARATSYS',
                ]);
                
                
                // Check if request was successful
                if ($response->successful()) {
                    $output = $response->json(); // Optional: handle the JSON response
                } else {
                    // Handle the error
                    \Log::error('SMS sending failed', [
                        'response' => $response->body(),
                        'status' => $response->status(),
                    ]);
                }
            }
            \Log::info('Your otp ' . $otp);
        }
    }


    public function checkOTP(Request $req){
        $req->validate([
            'otp' => ['required'],
        ],[
            'otp.required' => 'OTP is required.'
        ]);

        $user = Auth::user();
        $otp = $req->otp;
        $otp_sender = $req->send_to;
        $now = Carbon::now();

        //$req->session()->put('otp', $otp);
        
        //check is otp is exist on the current auth user
        $exist = User::where('id', $user->id)
            ->where('code_2fa', $otp)
            ->where('expiration_code_2fa', '>=', $now)
            ->exists();
        
        if(!$exist){
            return response()->json([
                'errors' => [
                    'otp' => ['Error!']
                ],
                'message' => 'Error!'
            ], 422);
        }

        session(['twoFAValidated' => true]);
        
        return response()->json([
            'status' => 'approved',
        ], 200);
    }
}
