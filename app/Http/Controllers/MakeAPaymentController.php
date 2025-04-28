<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoanDetail;
use Inertia\Inertia;
use Inertia\Response;

class MakeAPaymentController extends Controller
{
    //
    public function getMemberLoans($id) {
        $data = LoanDetail::where('loan_id', $id)
            ->orderBy('due_date', 'asc')
            ->paginate(10);
        return $data;
    }
}
