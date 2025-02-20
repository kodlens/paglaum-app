<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'lname' => 'required|string|max:255',
            'fname' => 'required|string|max:255',
            'suffix' => 'required|string|max:255',
            
            'education_level' => 'required|string|max:255',
            'birthdate' => 'required',
            'birthplace' => 'required|string|max:255',
            'sex' => 'required|string|max:255',

            'civil_status' => 'required|string|max:255',
            'religion' => 'required|string|max:255',

            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'lname' => $request->lname,
            'fname' => $request->lname,
            'suffix' => $request->suffix,
            'suffix' => $request->suffix,
            'education_level' => $request->education_level,
            'birthdate' => $request->birthdate,
            'birthplace' => $request->birthplace,
            'sex' => $request->sex,
            'civil_status' => $request->civil_status,
            'religion' => $request->religion,
            'ethnic_group' => $request->ethnic_group,
            'nationality' => $request->nationality,
            'height' => $request->height,
            'weight' => $request->weight,
            'blood_type' => $request->blood_type,
            'sss' => $request->sss,
            'tin' => $request->tin,
            'driver_license' => $request->driver_license,
            'philhealth' => $request->philhealth,
            'umid' => $request->umid,
            'household_size' => $request->household_size,
            'occupation' => $request->occupation,
            'industry_code' => $request->industry_code,
            'occupational_code' => $request->occupational_code,
            'monthly_income' => $request->monthly_income,
            'sector_presented' => $request->sector_presented,
            'organization_affiliated' => $request->organization_affiliated,
            'org_aff_address' => $request->org_aff_address,
            'contact_no' => $request->contact_no,
            'email' => $request->email,
            'province' => $request->province,
            'city' => $request->city,
            'barangay' => $request->barangay,
            'street' => $request->street,
            'zip' => $request->zip,
            'role' => 'MEMBER',
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
