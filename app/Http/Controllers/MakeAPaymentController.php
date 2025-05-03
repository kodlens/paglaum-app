<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoanDetail;
use Inertia\Inertia;
use Inertia\Response;
use App\Rules\CheckAmount;

class MakeAPaymentController extends Controller
{
    //
    public function getMemberLoans($id) {
        $data = LoanDetail::where('loan_id', $id)
            ->orderBy('due_date', 'asc')
            ->paginate(10);
        return $data;
    }

    public function makePayment(Request $req){
        //return $req->id;
        $req->validate([
            'id' => ['required'],
            'amount_paid' => ['required', 'gt:0', new CheckAmount($req->id)],
            'date_paid' => ['required']
        ]);

        //return $req;

        $id = $req->id;
        $amountPaid = $req->amount_paid;
        $datePaid = date('Y-m-d', strtotime($req->date_paid));

        $detail = LoanDetail::find($id);
        $detail->amount_paid = $amountPaid;
        $detail->datetime_paid = \Carbon\Carbon::now();
        $detail->is_paid = 1;
        $detail->payment_method = 'COUNTER';
        $detail->payment_transaction = 'COUNTER';
        $detail->save();


        return response()->json([
            'status' => 'saved'
        ], 200);
    }
}
