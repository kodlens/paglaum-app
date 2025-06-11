<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class ReportMonthlySavingsController extends Controller
{

    public function index(){
        return Inertia::render('Reports/MonthlySavings/index');
    }

    

    public function report(Request $req){

        $startMonth = $req->from ? date('m', strtotime($req->from)) : '';
        $endMonth = $req->to ? date('m', strtotime($req->to)) : '';

        $startYear = $req->from ? date('Y', strtotime($req->from)) : '';
        $endYear = $req->to ? date('Y', strtotime($req->to)) : '';

        if($startMonth =='' && $endMonth == ''){
            $data = \DB::select(
                "SELECT 
                    sa.user_id,
                    CONCAT(u.lname, ', ', u.fname, ' ', COALESCE(u.mname, '')) AS full_name,
                    u.sex,
                    sa.account_no,
                    DATE_FORMAT(st.datetime_deposit, '%M %Y') AS month_year,
    
                    ROUND(SUM(CASE WHEN st.transaction_type = 'deposit' THEN st.amount ELSE 0 END), 2) AS total_deposit,
                    ROUND(SUM(CASE WHEN st.transaction_type = 'withdrawal' THEN st.amount ELSE 0 END), 2) AS total_withdrawal,
                    ROUND(
                        SUM(CASE WHEN st.transaction_type = 'deposit' THEN st.amount ELSE 0 END) -
                        SUM(CASE WHEN st.transaction_type = 'withdrawal' THEN st.amount ELSE 0 END),
                        2
                    ) AS net_savings
    
                FROM 
                    saving_transactions st
                JOIN 
                    saving_accounts sa ON st.saving_account_id = sa.id
                LEFT JOIN 
                    users u ON sa.user_id = u.id
    
                WHERE 
                    sa.is_active = 1 AND sa.is_approved = 1
    
                GROUP BY 
                    sa.user_id,
                    sa.account_no,
                    DATE_FORMAT(st.datetime_deposit, '%M %Y')
    
                ORDER BY 
                    sa.user_id,
                    STR_TO_DATE(DATE_FORMAT(st.datetime_deposit, '%M %Y'), '%M %Y');"
            );
        }
        else{
            
            $data = \DB::select(
                "SELECT 
                    sa.user_id,
                    CONCAT(u.lname, ', ', u.fname, ' ', COALESCE(u.mname, '')) AS full_name,
                    u.sex,
                    sa.account_no,
                    DATE_FORMAT(st.datetime_deposit, '%M %Y') AS month_year,
    
                    ROUND(SUM(CASE WHEN st.transaction_type = 'deposit' THEN st.amount ELSE 0 END), 2) AS total_deposit,
                    ROUND(SUM(CASE WHEN st.transaction_type = 'withdrawal' THEN st.amount ELSE 0 END), 2) AS total_withdrawal,
                    ROUND(
                        SUM(CASE WHEN st.transaction_type = 'deposit' THEN st.amount ELSE 0 END) -
                        SUM(CASE WHEN st.transaction_type = 'withdrawal' THEN st.amount ELSE 0 END),
                        2
                    ) AS net_savings
    
                FROM 
                    saving_transactions st
                JOIN 
                    saving_accounts sa ON st.saving_account_id = sa.id
                LEFT JOIN 
                    users u ON sa.user_id = u.id
    
                WHERE 
                    sa.is_active = 1 AND sa.is_approved = 1
                AND
                    MONTH(st.datetime_deposit) BETWEEN ? AND ?
                AND
                    YEAR(st.datetime_deposit) BETWEEN ? AND ?
    
                GROUP BY 
                    sa.user_id,
                    sa.account_no,
                    DATE_FORMAT(st.datetime_deposit, '%M %Y')
    
                ORDER BY 
                    sa.user_id,
                    STR_TO_DATE(DATE_FORMAT(st.datetime_deposit, '%M %Y'), '%M %Y');",
                [$startMonth, $endMonth, $startYear, $endYear]
            );
        }


        return $data;
    }
}
