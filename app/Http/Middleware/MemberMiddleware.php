<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Auth;
use \Illuminate\Support\Facades\Session;

class MemberMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if(strtolower($user->role) == 'member'){
            
            // if($user->is_2fa && $user->code_2fa != null){
            //     return redirect()->intended(route('member.otp-form'));
            // }

            if(Session::has('is2fa') && session('is2fa') && !session('twoFAValidated')){
                return redirect()->intended(route('member.otp-form'));
            }
            return $next($request);
        }
        return abort(403);
  

    }
}
