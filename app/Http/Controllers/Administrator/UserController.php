<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\EducationLevel;

class UserController extends Controller
{
    public function index(){
        return Inertia::render('Admin/User/AdminUserIndex');
    }

    public function getData(Request $req){

        $data = User::where('lname', 'like', $req->lname . '%')
            ->paginate($req->perPage);

        return $data;
    }

    public function show($id){
        return User::find($id);
    }

    public function create(){ 
        return Inertia::render('Admin/User/AdminUserAddEdit');
    }

    public function store(Request $req){

        $req->validate([
            'fname' => 'required',
            'lname' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'role' => 'required'
        ],[
            'fname.required' => 'First name is required',
            'lname.required' => 'Last name is required',
            'email.required' => 'Email is required',
            'email.email' => 'Email is invalid',
            'email.unique' => 'Email is already taken',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 8 characters',
            'role.required' => 'Role is required'
        ]);

        User::create([
            'username' => $req->username,
            'title' => $req->title,
            'fname' => strtoupper($req->fname),
            'lname' => strtoupper($req->lname),
            'mname' => strtoupper($req->mname),
            'suffix' => strtoupper($req->suffix),
            'sex' => $req->sex,
            'education_level' => $req->education_level,
            'email' => $req->email,
            'password' => Hash::make($req->password),
            'role' => $req->role,
            'active' => $req->active ? 1 : 0
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }


    public function edit(Request $req, $id){ 
        $educationLevels = EducationLevel::orderBy('order_no', 'asc')->get();
        return Inertia::render('Admin/User/AdminUserAddEdit', [
            'user' => User::find($id),
            'educationLevels' => $educationLevels   
        ]);
    }


    public function update(Request $req, $id){

        $req->validate([
            'fname' => 'required',
            'lname' => 'required',
            'sex' => 'required',
            'email' => 'required|email|unique:users,email,' . $id . ',id',
            'role' => 'required'
        ],[
            'fname.required' => 'First name is required',
            'lname.required' => 'Last name is required',
            'email.required' => 'Email is required',
            'email.email' => 'Email is invalid',
            'email.unique' => 'Email is already taken',
            'role.required' => 'Role is required'
        ]);

        $user = User::find($id);
        $user->title = $req->title;
        $user->lname = strtoupper($req->lname);
        $user->fname = strtoupper($req->fname);
        $user->mname = strtoupper($req->mname);
        $user->suffix = strtoupper($req->suffix);
        $user->sex = $req->sex;
        $user->education_level = $req->education_level;
        $user->email = $req->email;
        $user->role = $req->role;
        $user->active = $req->active ? 1 : 0;
        $user->save();

        return response()->json([
            'status' => 'updated'
        ], 200);
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

    public function destroy($id){
        User::destroy($id);
        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
