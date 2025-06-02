<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {   
        $user = Auth::user()->load(['province', 'city', 'barangay']);
        //return $user;

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'profile' => $user
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('member.profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }



    //custom update
    public function updateProfile(Request $req){

        $dob = date('Y-m-d', strtotime($req->birthdate));

        $user = Auth::user();

        $req->validate([
            'fname' => 'required',
            'lname' => 'required',
            'sex' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ],[
            'fname.required' => 'First name is required',
            'lname.required' => 'Last name is required',
            'email.required' => 'Email is required',
            'email.email' => 'Email is invalid',
            'email.unique' => 'Email is already taken'
        ]);

        $user = User::find($user->id);
        $user->lname = strtoupper($req->lname);
        $user->fname = strtoupper($req->fname);
        $user->mname = strtoupper($req->mname);
        $user->suffix = strtoupper($req->suffix);
        $user->sex = $req->sex;
        $user->education_level = $req->education_level;

        $user->birthdate = $dob;
        $user->birthplace = $req->birthplace;
        $user->civil_status = strtoupper($req->civil_status);
        $user->religion = strtoupper($req->religion);
        $user->ethnic_group = strtoupper($req->ethnic_group);
        $user->nationality = strtoupper($req->nationality);
        
        $user->height = $req->height;
        $user->weight = $req->weight;
        $user->blood_type = strtoupper($req->blood_type);

        $user->sss = $req->sss;
        $user->tin = $req->tin;
        $user->gsis = $req->gsis;
        $user->id_type = $req->id_type;
        $user->id_no = $req->id_no;

        $user->household_size = $req->household_size;
        $user->contact_no = $req->contact_no;
        $user->occupation = $req->occupation;
        $user->monthly_income = $req->monthly_income;
        $user->business_name = $req->business_name;
        $user->business_address = $req->business_address;
        $user->contact_person = $req->contact_person;
        $user->contact_person_no = $req->contact_person_no;
        
        $user->province = $req->province;
        $user->city = $req->city;
        $user->barangay = $req->barangay;
        $user->street = $req->street;

        $user->email = $req->email;
        $user->save();

        return response()->json([
            'status' => 'updated'
        ], 200);
    }
}
