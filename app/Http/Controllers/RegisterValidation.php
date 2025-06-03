<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class RegisterValidation extends Controller
{
    public function checkUsername(Request $req){
        $req->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string', 'confirmed', 'min:4']
        ]);

        $exist = User::where('username', $req->username)
            ->exists();
        if($exist){
            return response()->json([
                'errors' => [
                    'username' => ['Duplicate username.']
                ],
                'message' => 'Duplicate username.'
            ], 422);
        }
        return response()->json([
            'status' => 'valid'
        ], 200);;
    }
}
