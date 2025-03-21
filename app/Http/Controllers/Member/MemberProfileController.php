<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Auth;
use App\Models\User;


class MemberProfileController extends Controller
{
    //

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
        $user->id_type = $req->id_type;
        $user->id_no = $req->id_no;

        $user->household_size = $req->household_size;
        $user->contact_no = $req->contact_no;
        $user->occupation = $req->occupation;
        $user->monthly_income = $req->monthly_income;
        $user->office_address = $req->office_address;
        $user->contact_person = $req->contact_person;
        $user->contact_person_no = $req->contact_person_no;

        $user->email = $req->email;
        $user->save();

        return response()->json([
            'status' => 'updated'
        ], 200);
    }
}
