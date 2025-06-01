<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use \Illuminate\Support\Facades\Session;
use App\Models\User;
use \Carboon\Carbon;
use Illuminate\Support\Facades\Http;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)//: RedirectResponse
    {
        //return $request;
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();
       
        $role = $user->role;

        \Log::info('Role is: ' . $role);

        if($user->hasVerifiedEmail()){

            if(strtolower($role) == 'admin')
                return redirect()->intended(RouteServiceProvider::ADMIN);
        
            if(strtolower($role) == 'do' || strtolower($role) == 'ipp')
                return redirect()->intended(RouteServiceProvider::DO);    

            if(strtolower($role) == 'bm')
                return redirect()->intended(RouteServiceProvider::BM);   
            
            if(strtolower($role) == 'member'){
                if($user->is_2fa){
                    
                    Session::put('is2fa', true);
                    Session::put('twoFAValidated', false);
                }
                return redirect()->intended(RouteServiceProvider::MEMBER);  
            }

            if(strtolower($role) == 'ybs'){
                if($user->is_2fa){
                    Session::put('is2fa', true);
                    Session::put('twoFAValidated', false);
                }
                return redirect()->intended(RouteServiceProvider::YBS);
            }

        }else{
            return redirect()->route('verification.notice');
        }
    }

    function generateOTP($length = 6) {
        $otp = '';
        for ($i = 0; $i < $length; $i++) {
            $otp .= mt_rand(0, 9);
        }
        return $otp;
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $user->update(['last_login' => now()]);
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
