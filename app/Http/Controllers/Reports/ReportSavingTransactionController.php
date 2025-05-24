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
            a.transaction_type,
            COUNT(*) AS count_transaction_type
            FROM saving_transactions a
            WHERE a.created_at >= ? AND a.created_at <= ?
            GROUP BY a.transaction_type'
                    , [$dateFrom, $dateTo]);
        
        return $data;
    }

}
