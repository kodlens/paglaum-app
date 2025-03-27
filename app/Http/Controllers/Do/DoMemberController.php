<?php

namespace App\Http\Controllers\Do;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\EducationLevel;

class DoMemberController extends Controller
{
    public function index(){
        return Inertia::render('Do/Member/DoMemberIndex');
    }

    public function getData(Request $req){

        $data = User::where('lname', 'like', $req->lname . '%')
            ->where('role', 'MEMBER')
            ->paginate($req->perPage);

        return $data;
    }

    public function show($id){
        $user = User::where('id', $id)
            ->with(['province', 'city', 'barangay'])
            ->first();

        return $user;
    }


    public function userSetActive($id){

        $user = User::find($id);
        $user->active = 1;
        $user->save();

        return response()->json([
            'status' => 'active'
        ], 200);
    }

    public function userSetInactive($id){

        $user = User::find($id);
        $user->active = 0;
        $user->save();

        return response()->json([
            'status' => 'inactive'
        ], 200);
    }


    public function userAllowLoan($id){
        $user = User::find($id);
        $user->is_loan_allowed = 1;
        $user->save();

        return response()->json([
            'status' => 'active'
        ], 200);
    }

    public function userDisallowLoan($id){

        $user = User::find($id);
        $user->is_loan_allowed = 0;
        $user->save();

        return response()->json([
            'status' => 'inactive'
        ], 200);
    }


    
    public function edit(Request $req, $id){
        $educationLevels = EducationLevel::orderBy('order_no', 'asc')->get();
        $user = User::where('id', $id)
            ->with(['province', 'city', 'barangay'])
            ->first();

        return Inertia::render('Do/Member/DoMemberCreateEdit', [
            'user' => $user,
            'educationLevels' => $educationLevels
        ]);
    }

    public function update(Request $req, $id){

        $dob = null;
        if($req->birthdate != null || $req->birthdate != ''){
            $dob = date('Y-m-d', strtotime($req->birthdate));
        }

        $req->validate([
            'fname' => 'required',
            'lname' => 'required',
            'sex' => 'required',
            'education_level' => 'required',
            'contact_no' => 'required',
            'email' => 'required|email|unique:users,email,' . $id . ',id',
            'birthdate' => ['required'],

           
        ],[
            'fname.required' => 'First name is required',
            'lname.required' => 'Last name is required',
            'email.required' => 'Email is required',
            'email.email' => 'Email is invalid',
            'email.unique' => 'Email is already taken'
        ]);

        

        $user = User::find($id);

        $user->lname = strtoupper($req->lname);
        $user->fname = strtoupper($req->fname);
        $user->mname = strtoupper($req->mname);
        $user->suffix = strtoupper($req->suffix);
        $user->contact_no = $req->contact_no;
        $user->email = $req->email;
        $user->education_level = $req->education_level;
        $user->birthdate = $dob;
        $user->birthplace = $req->birthplace;
        
        $user->sex = $req->sex;
        $user->civil_status = $req->civil_status;
        $user->sss = $req->sss;
        $user->gsis = $req->gsis;
        $user->tin = $req->tin;

        $user->id_type = $req->id_type;
        $user->id_no = $req->id_no;
        $user->household_size = $req->household_size;

        $user->province = $req->province;
        $user->city = $req->city;
        $user->barangay = $req->barangay;
        $user->street = $req->street;

        $user->occupation = $req->occupation;
        $user->monthly_income = $req->monthly_income;
        $user->business_name = $req->business_name;
        $user->business_address = $req->business_address;
        $user->contact_person = $req->contact_person;
        $user->contact_person_no = $req->contact_person_no;


        $user->active = $req->active ? 1 : 0;
        $user->is_loan_allowed = $req->is_loan_allowed ? 1 : 0;

        $user->save();

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function setActive($id){
        User::find($id)
            ->update([
                'active' => 1
            ]);

        return response()->json([
            'status' => 'active'
        ], 200);
    }

    public function setInactive($id){
        User::find($id)
            ->update([
                'active' => 0
            ]);

        return response()->json([
            'status' => 'inactive'
        ], 200);
    }

}
