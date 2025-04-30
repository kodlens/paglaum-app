<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\SavingAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
