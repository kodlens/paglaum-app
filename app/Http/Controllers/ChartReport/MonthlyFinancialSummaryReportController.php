<?php

namespace App\Http\Controllers\ChartReport;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MonthlyFinancialSummaryReportController extends Controller
{
    public function report(){
        $summary = DB::table('loan_details')
            ->selectRaw('
                DATE_FORMAT(due_date, "%b-%Y") as month,
                SUM(amount_paid) as total_repayments
            ')
            ->groupBy(DB::raw('DATE_FORMAT(due_date, "%Y-%m")'))
            ->orderBy('due_date', 'asc')
            ->get();


        //SUM(amount) as total_loans_issued,
        //(SUM(amount) - SUM(amount_paid)) as outstanding_balance
        return $summary;
    }
}
