<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Auth;

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
        //return redirect(RouteServiceProvider::HOME);
        if(strtolower($user->role) == 'member'){

            if($user->is_2fa > 0){
                return redirect('/member/otp-form');
            }

            return $next($request);
        }
        return abort(403);
  

    }
}
