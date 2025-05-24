<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class ReportLoanPortfolioController extends Controller
{
    //

    
    public function index(){
        return Inertia::render('Reports/LoanPortfolio/index');
    }

    

    public function report(){
        $data = \DB::select(
            "SELECT 
                u.id AS user_id,
                CONCAT(u.lname, ', ', u.fname, ' ', COALESCE(u.mname, '')) AS full_name,
                u.sex,

                COUNT(DISTINCT l.id) AS loan_count,
                ROUND(COALESCE(SUM(l.principal), 0),2) AS total_disbursed,
                ROUND(COALESCE(SUM(l.total_payment), 0), 2) AS total_expected,
                ROUND(COALESCE(SUM(ld.amount_paid), 0), 2) AS total_paid,
                ROUND(COALESCE(SUM(l.total_payment),0) - COALESCE(SUM(ld.amount_paid), 0), 2) AS balance,

                CASE 
                    WHEN MAX(ld.due_date < CURDATE() - INTERVAL 30 DAY AND ld.is_paid = 0) THEN 'At Risk'
                    ELSE 'Current'
                END AS par_status

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
