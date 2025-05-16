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
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class RegisterController extends Controller
{
    
    public function create(){

        $educationLevels = EducationLevel::orderBy('order_no', 'asc')->get();
        return Inertia::render('Public/RegisterPage', [
            'educationLevels' => $educationLevels
        ]);
    }


    public function store(Request $request){

        $dob = null;
        if($request->birthdate != null || $request->birthdate != ''){
            $dob = date('Y-m-d', strtotime($request->birthdate));
        }


        $request->validate([
            'username' => 'required|string|max:30|unique:users',
            'lname' => 'required|string|max:255',
            'fname' => 'required|string|max:255',
            //'education_level' => 'required|string|max:255',
            'birthdate' => 'required',
            'civil_status' => 'required|max:30',
            //'birthplace' => 'required|string|max:255',
            'sex' => 'required|string|max:20',
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'contact_no' => 'required|regex:/^9\d{9}$/',
            'password' => ['required', 'confirmed', Rules\Password::defaults(), 'max:30'],
            'id_type' => 'required',
            'province' => 'required',
            'city' => 'required',
            'barangay' => 'required',
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


        

        $user = User::create([
            'username' => $request->username,
            'lname' => $request->lname,
            'fname' => $request->fname,
            'mname' => $request->mname,
            'suffix' => $request->suffix,
            'contact_no' => $request->contact_no,
            'email' => $request->email,
            'education_level' => $request->education_level,
            'birthdate' => $dob,
            'birthplace' => $request->birthplace,
            'sex' => $request->sex,
            'civil_status' => $request->civil_status,
            
            // 'religion' => $request->religion,
            // 'ethnic_group' => $request->ethnic_group,
            // 'nationality' => $request->nationality,
            // 'height' => $request->height,
            // 'weight' => $request->weight,
            // 'blood_type' => $request->blood_type,
            'sss' => $request->sss,
            'gsis' => $request->gsis,
            'tin' => $request->tin,
            'id_type' => $request->id_type,
            'id_no' => $request->id_no,
            // 'umid' => $request->umid,
            'household_size' => $request->household_size,

           
            'occupation' => $request->occupation,
            'monthly_income' => $request->monthly_income,
            'business_name' => $request->business_name,
            'business_address' => $request->business_address,
            //'industry_code' => $request->industry_code,
            //'occupational_code' => $request->occupational_code,
            'contact_person' => $request->contact_person,
            'contact_person_no' => $request->contact_person_no,

            

            
            //'sector_presented' => $request->sector_presented,
            //'organization_affiliated' => $request->organization_affiliated,
            //'org_aff_address' => $request->org_aff_address,
            'id_image' => $request->id_image,
            'province' => $request->province,
            'city' => $request->city,
            'barangay' => $request->barangay,
            'street' => $request->street,
            'zip' => $request->zip,
            'role' => $request->role,
            'active' => 0,
            'password' => Hash::make($request->password),
        ]);

        $imgpath = $request->id_image;
        if (Storage::exists('public/temp/' . $imgpath)) {
            // Move the file
            Storage::move('public/temp/' . $imgpath, 'public/identifications/' . $imgpath); 
            Storage::delete('public/temp/' . $imgpath);
        }

       //return $request;

        $output = '';
        if(env('SMS') > 0){
            $apiKey = env('SMS_API_KEY');
            $response = Http::asForm()->post('https://semaphore.co/api/v4/messages', [
                'apikey'     => $apiKey,
                'number'     => $request->contact_no,
                'message'    => "You have successfully created an account with PAGLAUM. We will notify you once your account is approved.",
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
            'status' => 'registered'
        ], 200);
    }
}
