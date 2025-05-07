<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            
            if (Auth::guard($guard)->check()) {
                
                $user = Auth::user();
                $role = $user->role;

                if(strtolower($role) == 'admin')
                    return redirect(RouteServiceProvider::ADMIN);
                
                if(strtolower($role) == 'member')
                    return redirect(RouteServiceProvider::MEMBER);

                if(strtolower($role) == 'bm')
                    return redirect(RouteServiceProvider::BM);

                if(strtolower($role) == 'do')
                    return redirect(RouteServiceProvider::DO);

                if(strtolower($role) == 'ybs')
                    return redirect(RouteServiceProvider::YBS);
            }
        }

        return $next($request);
    }
}
