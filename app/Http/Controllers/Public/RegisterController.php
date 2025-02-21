<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Auth;
use Illuminate\Validation\Rules;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\EducationLevel;

class RegisterController extends Controller
{
    
    public function create(){

        $educationLevels = EducationLevel::orderBy('order_no', 'asc')->get();
        return Inertia::render('Public/RegisterPage', [
            'educationLevels' => $educationLevels
        ]);
    }


    public function store(Request $request){

        //return $request;

        $request->validate([
            'username' => 'required|string|max:30|unique:users',
            'lname' => 'required|string|max:255',
            'fname' => 'required|string|max:255',
            //'education_level' => 'required|string|max:255',
            //'birthdate' => 'required',
            //'birthplace' => 'required|string|max:255',
            'sex' => 'required|string|max:255',
            //'civil_status' => 'required|string|max:255',
            //'religion' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults(), 'max:30'],
        ]);

        $user = User::create([
            'username' => $request->username,
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
            'active' => 0,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status' => 'registered'
        ], 200);
    }
}
