<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class ReportInsuranceController extends Controller
{
    public function index(){
        return Inertia::render('Reports/Insurance/index');
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
                    l.insurance_type_id,
                    it.insurance_type AS insurance_type_name,
                    ita.claimable_amount AS claimable_amount,
                    ita.title, ita.benefits,
                    l.insurance_payment AS insurance_expected,
                    ROUND(SUM(ld.insurance_payment), 2) AS insurance_paid,
                    COUNT(ld.id) AS insurance_payment_count,
                    MIN(ld.due_date) AS first_due_date,
                    MAX(ld.datetime_paid) AS last_payment_date
                FROM 
                    loans l
                LEFT JOIN 
                    loan_details ld ON l.id = ld.loan_id
                LEFT JOIN 
                    users u ON u.id = l.user_id
                LEFT JOIN 
                    insurance_types it ON l.insurance_type_id = it.id
                LEFT JOIN
                    insurance_type_agebrackets ita ON l.insurance_type_agebracket_id = ita.id
                WHERE 
                    (l.insurance_payment > 0 OR ld.insurance_payment > 0)
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
                    l.insurance_type_id,
                    it.insurance_type AS insurance_type_name,
                    ita.claimable_amount AS claimable_amount,
                    ita.title, ita.benefits,
                    l.insurance_payment AS insurance_expected,
                    ROUND(SUM(ld.insurance_payment), 2) AS insurance_paid,
                    COUNT(ld.id) AS insurance_payment_count,
                    MIN(ld.due_date) AS first_due_date,
                    MAX(ld.datetime_paid) AS last_payment_date
                FROM 
                    loans l
                LEFT JOIN 
                    loan_details ld ON l.id = ld.loan_id
                LEFT JOIN 
                    users u ON u.id = l.user_id
                LEFT JOIN 
                    insurance_types it ON l.insurance_type_id = it.id
                LEFT JOIN
                    insurance_type_agebrackets ita ON l.insurance_type_agebracket_id = ita.id
                WHERE 
                    (l.insurance_payment > 0 OR ld.insurance_payment > 0)
                AND
                    l.date_approved BETWEEN ?  AND ?
                GROUP BY 
                    l.id
                ORDER BY 
                    u.lname, u.fname, l.id
                LIMIT 10;",
                [$startDate, $endDate]
            );
        }
        

        return $data;
    }
}
