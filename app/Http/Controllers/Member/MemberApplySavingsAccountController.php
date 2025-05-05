<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\SavingAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class MemberApplySavingsAccountController extends Controller
{
    private function generateUniqueSavingsAccount()
    {
        do {
            $accountNumber = 'SA' . date('Ymd') . mt_rand(100000, 999999);
        } while (\App\Models\SavingAccount::where('account_no', $accountNumber)->exists());

        return $accountNumber;
    }
    public function applySavingsAccount() {
        $accountNumber = $this->generateUniqueSavingsAccount();
        $user = Auth::user();

        SavingAccount::create([
            'user_id' => $user->id,
            'account_no' => $accountNumber,
            'account_name' => strtoupper($user->lname) . ' ' . strtoupper($user->fname),
            'account_type' => 'PERSONAL',
            'balance' => 0,
            'interest_rate' => 0,
            'is_approved' => 0,
            'is_active' => 0
        ]);

        return response()->json([
            'status' => 'success',
        ], 200);
    }

   
    
    /** IMAGE HANDLING */
    /* ================= */
    public function tempUpload(Request $req){
        //return $req;
        $req->validate([
            'kyc_id' => ['required', 'mimes:jpg,jpeg,png', 'max:5120']
        ],[
            'kyc_id.max' => 'The upload image must not be greater than 1MB in size'
        ]);

        $file = $req->kyc_id;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $imageName = $fileGenerated . '.' . $file->getClientOriginalExtension();
        $imagePath = $file->storeAs('public/temp', $imageName);
        $n = explode('/', $imagePath);
        return $n[2];
    }

    public function removeUpload($fileName){
       
        if(Storage::exists('public/temp/' .$fileName)) {
            Storage::delete('public/temp/' . $fileName);
            return response()->json([
                'status' => 'temp_deleted'
            ], 200);
        }

        //this will remove the image from featured_image
        if(Storage::exists('public/featured_images/' . $fileName)) {
            Storage::delete('public/featured_images/' . $fileName);

            Post::where('featured_image', $fileName)
                ->update([
                    'featured_image' => null
                ]);
            return response()->json([
                'status' => 'removed'
            ], 200);
        }

        return response()->json([
            'status' => 'temp_error'
        ], 200);
    }
    

}
