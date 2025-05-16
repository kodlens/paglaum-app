<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class ReportSavingTransactionController extends Controller
{
    public function index(){
        return Inertia::render('Reports/SavingsTransaction/index');
    }

    public function getLoanTransaction(Request $req){
        
        $dateFrom = $req->from ? date('Y-m-d', strtotime($req->from)) : '';
        $dateTo = $req->to ? date('Y-m-d', strtotime($req->to)) : '';

        $data = \DB::select(
            'SELECT
            b.loan_type,
            COUNT(*) AS count_loantype

            FROM
            loans as a
            JOIN loan_types as b ON a.loan_type_id = b.id
            WHERE a.created_at >= ? AND a.created_at <= ?
            GROUP BY a.loan_type_id'
        , [$dateFrom, $dateTo]);
        
        return $data;
    }
}
