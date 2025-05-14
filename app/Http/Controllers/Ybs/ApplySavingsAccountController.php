<?php

namespace App\Http\Controllers\Ybs;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Models\SavingAccount;

class ApplySavingsAccountController extends Controller
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

        $exist = SavingAccount::where('user_id', $user->id)
            ->where('is_approved', 0)
            ->exists();

        return response()->json([
            'errors' => [
                'pending' => ['You already have a pending savings application.']
            ],
            'message' => 'You already have a pending savings application.'
        ], 422);

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
}
