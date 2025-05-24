<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class ReportIncomeInterestController extends Controller
{
    public function index(){
        return Inertia::render('Reports/IncomeInterest/index');
    }

    

    public function report(){
        $data = \DB::select(
            "SELECT 
                u.id AS user_id,
                CONCAT(u.lname, ', ', u.fname, ' ', COALESCE(u.mname, '')) AS full_name,
                u.sex,

                COUNT(DISTINCT l.id) AS loan_count,
                ROUND(COALESCE(SUM(l.interest), 0), 2) AS interest_expected,
                ROUND(COALESCE(SUM(ld.interest_amount), 0), 2) AS interest_collected,
                ROUND(COALESCE(SUM(l.interest), 0) - COALESCE(SUM(ld.interest_amount), 0), 2) AS interest_balance

            FROM 
                users u
            LEFT JOIN 
                loans l ON l.user_id = u.id AND l.is_approve = 1
            LEFT JOIN 
                loan_details ld ON ld.loan_id = l.id

            GROUP BY 
                u.id
            ORDER BY 
                u.lname, u.fname;"
        );

        return $data;
    }
}
