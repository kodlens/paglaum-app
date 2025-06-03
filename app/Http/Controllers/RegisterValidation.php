<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class RegisterValidation extends Controller
{
    public function checkUsername(Request $req){
        $req->validate([
            'username' => ['required', 'string', 'unique:users'],
            'password' => ['required', 'string', 'confirmed', 'min:4']
        ]);

        // $exist = User::where('username', $req->username)
        //     ->exists();
        // if($exist){
        //     return response()->json([
        //         'errors' => [
        //             'username' => ['Duplicate username.']
        //         ],
        //         'message' => 'Duplicate username.'
        //     ], 422);
        // }
        return response()->json([
            'status' => 'valid'
        ], 200);
    }


    public function checkAccountInformation(Request $req){
        $dob = null;
        if($req->birthdate != null || $req->birthdate != ''){
            $dob = date('Y-m-d', strtotime($req->birthdate));
        }

        if($req->role === 'YBS'){

            $req->validate([
                'lname' => 'required|string|max:255',
                'fname' => 'required|string|max:255',
                'birthdate' => 'required',
                'civil_status' => 'required|max:30',
                'sex' => 'required|string|max:20',
                'email' => 'required|string|lowercase|email|max:255|unique:users',
                'contact_no' => 'required|regex:/^9\d{9}$/',
                'id_type' => 'required',
                // 'province' => 'required',
                // 'city' => 'required',
                // 'barangay' => 'required',
                'role' => 'required|string|max:50'
            ]);

        }else if($req->role === 'MEMBER'){

            $req->validate([
                'lname' => 'required|string|max:255',
                'fname' => 'required|string|max:255',
                'birthdate' => 'required',
                'civil_status' => 'required|max:30',
                'sex' => 'required|string|max:20',
                'email' => 'required|string|lowercase|email|max:255|unique:users',
                'contact_no' => 'required|regex:/^9\d{9}$/',
                'id_type' => 'required',
                // 'province' => 'required',
                // 'city' => 'required',
                // 'barangay' => 'required',
                'monthly_income' => 'required|gt:1000',
                'occupation' => 'required|string|max:255',
                'business_name' => 'required|string|max:255',
                'business_address' => 'required|string|max:255',
                'contact_person' => 'required|string|max:255',
                'contact_person_no' => 'required|string|max:255',
                'role' => 'required|string|max:50',
            ],[
                'business_name.required' => 'Office/Business name is required.',
                'business_address.required' => 'Office/Business address is required.'
            ]);

        }else{

             return response()->json([
                'errors' => [
                    'error' => ['Information not allowed.']
                ],
                'message' => 'Information not allowed.'
            ], 422);

        }

        return response()->json([
            'status' => 'valid'
        ], 200);
    }
}
