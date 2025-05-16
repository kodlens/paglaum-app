<?php

namespace App\Http\Controllers\Bm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\EducationLevel;
use Illuminate\Support\Facades\Http;

class BmMemberController extends Controller
{
    public function index(){
        return Inertia::render('Bm/Member/BmMemberIndex');
    }

    public function getData(Request $req){

        $data = User::where('lname', 'like', $req->lname . '%')
            ->where('role', 'MEMBER')
            ->orWhere('role', 'YBS')
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

        $output = '';
        if(env('SMS') > 0){
            $apiKey = env('SMS_API_KEY');
            $response = Http::asForm()->post('https://semaphore.co/api/v4/messages', [
                'apikey'     => $apiKey,
                'number'     => $user->contact_no,
                'message'    => 'Hello ' . $user->lname . ', '. $user->fname . ', Your PAGLAUM account is now activated. Thank you.',
                'sendername' => 'LARATSYS',
            ]);
            
            // Check if request was successful
            if ($response->successful()) {
                $output = $response->json(); // Optional: handle the JSON response
            } else {
                // Handle the error
                \Log::error('SMS sending failed', [
                    'response' => $response->body(),
                    'status' => $response->status(),
                ]);
            }
        }
        

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

        $output = '';
        if(env('SMS') > 0){
            $apiKey = env('SMS_API_KEY');
            $response = Http::asForm()->post('https://semaphore.co/api/v4/messages', [
                'apikey'     => $apiKey,
                'number'     => $user->contact_no,
                'message'    => 'Hello ' . $user->lname . ', '. $user->fname . ', Your PAGLAUM account is now eligible for Loan. Thank you.',
                'sendername' => 'LARATSYS',
            ]);
            
            // Check if request was successful
            if ($response->successful()) {
                $output = $response->json(); // Optional: handle the JSON response
            } else {
                // Handle the error
                \Log::error('SMS sending failed', [
                    'response' => $response->body(),
                    'status' => $response->status(),
                ]);
            }
        }

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

        return Inertia::render('Bm/Member/BmMemberCreateEdit', [
            'user' => $user,
            'educationLevels' => $educationLevels
        ]);
    }

    public function update(Request $req, $id){

        $req->validate([
            'fname' => 'required',
            'lname' => 'required',
            'sex' => 'required',
            'contact_no' => 'required|regex:/^9\d{9}$/',
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
        $user->lname = strtoupper($req->lname);
        $user->fname = strtoupper($req->fname);
        $user->mname = strtoupper($req->mname);
        $user->suffix = strtoupper($req->suffix);
        $user->sex = $req->sex;
        $user->education_level = $req->education_level;
        $user->email = $req->email;
        $user->contact_no = $req->contact_no;
        $user->role = $req->role;
        $user->active = $req->active ? 1 : 0;
        $user->province = $req->province;
        $user->city = $req->city;
        $user->barangay = $req->barangay;
        $user->street = $req->street;

        $user->save();

        return response()->json([
            'status' => 'updated'
        ], 200);
    }




}
