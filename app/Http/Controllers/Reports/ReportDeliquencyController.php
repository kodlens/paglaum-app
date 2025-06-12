<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class ReportDeliquencyController extends Controller
{
    public function index(){
        return Inertia::render('Reports/DeliquencyReport/index');
    }

    

    public function report(Request $req){

        $startDate = $req->from ? $req->from : '';
        //$endDate = $req->to ? $req->to : '';

         if($startDate ==''){

            $data = \DB::select(
                "SELECT 
                    u.id AS user_id,
                    CONCAT(u.lname, ', ', u.fname, ' ', COALESCE(u.mname, '')) AS full_name,
                    u.sex,
                    l.id AS loan_id,
                    ld.due_date,
                    ROUND(ld.amount, 2) AS amount_due,
                    ROUND(COALESCE(ld.amount_paid, 0), 2) AS amount_paid,
                    DATEDIFF(CURDATE(), ld.due_date) AS days_overdue,

                    CASE
                        WHEN DATEDIFF(CURDATE(), ld.due_date) <= 30 THEN 'Delinquent'
                        WHEN DATEDIFF(CURDATE(), ld.due_date) <= 60 THEN '30-60 Days Late'
                        WHEN DATEDIFF(CURDATE(), ld.due_date) <= 90 THEN '60-90 Days Late'
                        ELSE '90+ Days Late'
                    END AS STATUS

                FROM 
                    loan_details ld
                JOIN 
                    loans l ON ld.loan_id = l.id
                JOIN 
                    users u ON l.user_id = u.id
                WHERE 
                    ld.is_paid = 0 
                    AND ld.due_date < CURDATE()
                ORDER BY 
                    days_overdue DESC, u.lname, u.fname;"
            );
            
         }else{

            $data = \DB::select(
                "SELECT 
                    u.id AS user_id,
                    CONCAT(u.lname, ', ', u.fname, ' ', COALESCE(u.mname, '')) AS full_name,
                    u.sex,
                    l.id AS loan_id,
                    ld.due_date,
                    ROUND(ld.amount, 2) AS amount_due,
                    ROUND(COALESCE(ld.amount_paid, 0), 2) AS amount_paid,
                    DATEDIFF(?, ld.due_date) AS days_overdue,

                    CASE
                        WHEN DATEDIFF(?, ld.due_date) <= 30 THEN 'Delinquent'
                        WHEN DATEDIFF(?, ld.due_date) <= 60 THEN '30-60 Days Late'
                        WHEN DATEDIFF(?, ld.due_date) <= 90 THEN '60-90 Days Late'
                        ELSE '90+ Days Late'
                    END AS STATUS

                FROM 
                    loan_details ld
                JOIN 
                    loans l ON ld.loan_id = l.id
                JOIN 
                    users u ON l.user_id = u.id
                WHERE 
                    ld.is_paid = 0 
                    AND ld.due_date <= ?
                ORDER BY 
                    days_overdue DESC, u.lname, u.fname;",
                [$startDate, $startDate, $startDate, $startDate, $startDate]
            );

         }
        

        return $data;
    }
}
