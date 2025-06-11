<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class ReportLoanController extends Controller
{
    public function index(){
        return Inertia::render('Reports/Loan/index');
    }

    

    public function report(Request $req){

        $startDate = $req->from ? $req->from : '';
        $endDate = $req->to ? $req->to : '';

        if($startDate =='' && $endDate == ''){
            $data = \DB::select(
                "SELECT 
                    l.user_id,
                    CONCAT(u.lname, ', ', u.fname, ' ', COALESCE(u.mname, '')) AS full_name,
                    u.sex,
                    l.id AS loan_id,

                    lt.loan_type,
                    lt.description AS loan_type_description,

                    lst.loan_subtype,
                    lst.terms_month,
                    lst.percent AS interest_percent,

                    ROUND(l.principal, 2) AS principal,
                    ROUND(l.interest, 2) AS interest,
                    ROUND(l.total_payment, 2) AS loan_expected,

                    ROUND(COALESCE(SUM(ld.amount_paid), 0), 2) AS loan_paid,
                    COUNT(ld.id) AS payment_count,
                    MIN(ld.due_date) AS first_due_date,
                    MAX(ld.datetime_paid) AS last_payment_date

                FROM 
                    loans l
                LEFT JOIN 
                    loan_details ld ON l.id = ld.loan_id
                LEFT JOIN 
                    users u ON u.id = l.user_id
                LEFT JOIN 
                    loan_types lt ON l.loan_type_id = lt.id
                LEFT JOIN 
                    loan_subtypes lst ON l.loan_subtype_id = lst.id
                WHERE 
                    (l.total_payment > 0 OR ld.amount_paid > 0)
                GROUP BY 
                    l.id
                ORDER BY 
                    u.lname, u.fname, l.id
                LIMIT 10;"
            );
        }else{
            $data = \DB::select(
                "SELECT 
                    l.user_id,
                    CONCAT(u.lname, ', ', u.fname, ' ', COALESCE(u.mname, '')) AS full_name,
                    u.sex,
                    l.id AS loan_id,

                    lt.loan_type,
                    lt.description AS loan_type_description,

                    lst.loan_subtype,
                    lst.terms_month,
                    lst.percent AS interest_percent,

                    ROUND(l.principal, 2) AS principal,
                    ROUND(l.interest, 2) AS interest,
                    ROUND(l.total_payment, 2) AS loan_expected,

                    ROUND(COALESCE(SUM(ld.amount_paid), 0), 2) AS loan_paid,
                    COUNT(ld.id) AS payment_count,
                    MIN(ld.due_date) AS first_due_date,
                    MAX(ld.datetime_paid) AS last_payment_date
                FROM 
                    loans l
                LEFT JOIN 
                    loan_details ld ON l.id = ld.loan_id
                LEFT JOIN 
                    users u ON u.id = l.user_id
                LEFT JOIN 
                    loan_types lt ON l.loan_type_id = lt.id
                LEFT JOIN 
                    loan_subtypes lst ON l.loan_subtype_id = lst.id
                WHERE 
                    (l.total_payment > 0 OR ld.amount_paid > 0)
                AND
                    l.date_approved BETWEEN ? AND ?
                GROUP BY 
                    l.id
                ORDER BY 
                    u.lname, u.fname, l.id;",
                [$startDate, $endDate]
            );
        }

       

        return $data;
    }
}
