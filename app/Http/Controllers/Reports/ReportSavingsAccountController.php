<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class ReportSavingsAccountController extends Controller
{
    
    public function index(){
        return Inertia::render('Reports/SavingsAccount/index');
    }

    

    public function reportSavingsAccount(){
        
        $data = \DB::select(
            "SELECT 
                sa.user_id,
                u.lname AS user_lname,
                u.fname AS user_fname,
                u.mname AS user_mname,
                u.sex AS user_sex, -- Assuming you have a users table for joining names
                COUNT(DISTINCT sa.id) AS total_accounts,
                SUM(CASE WHEN st.transaction_type = 'deposit' THEN st.amount ELSE 0 END) AS total_deposits,
                SUM(CASE WHEN st.transaction_type = 'withdrawal' THEN st.amount ELSE 0 END) AS total_withdrawals,
                SUM(sa.balance) AS total_balance
            FROM 
                saving_accounts sa
            LEFT JOIN 
                saving_transactions st ON sa.id = st.saving_account_id
            LEFT JOIN 
                users u ON u.id = sa.user_id -- Optional, if you want to show user names
            WHERE 
                sa.is_active = 1
            GROUP BY 
                sa.user_id
            ORDER BY 
                total_balance DESC;"
        );

        return $data;
    }

}
