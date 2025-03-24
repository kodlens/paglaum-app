<?php

namespace App\Http\Controllers\Bm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Loan;
use App\Models\LoanDetail;

class BmLoanController extends Controller
{
    public function index(){
        return Inertia::render('Bm/BmLoans/BmLoansIndex');
    }

    public function getData(Request $req){

        $data = Loan::with(['user', 'loan_type', 'loan_subtype'])
            ->paginate($req->perPage);

        return $data;
    }

    public function approveLoan(Request $req, $id){
        //return $req;
        $principal = (double)$req->principal;

        if($principal < 100){
            return response()->json([
                'errors' => [
                    'principal' => ['Principal amount must not less than 100.'] 
                ],
                'message' => 'Principal amount must not less than 100.'
            ], 422);
        }

        $req->validate([
            'loan_type_id' => ['required', 'gt:0'],
            'loan_subtype_id' => ['required','gt:0'],
            'terms_month' => ['required', 'gt:0'],
            'interest' => ['required', 'gt:0']
        ],[
            'loan_type_id.required' => 'Please select loan type',
            'loan_type_id.gt' => 'Please select loan type',
            'loan_subtype_id.required' => 'Please select loan sub type',
            'loan_subtype_id.gt' => 'Please select loan sub type',
            'interest.required' => 'Please select loan and loan subtype.',
            'interest.gt' => 'Please select loan and loan subtype.',
            'terms_month.required' => 'Please select loan sub type',
            'terms_month.gt' => 'Please select loan sub type',

        ]);


        //return $req;
        try{

            \DB::transaction(function () use ($req, $id) {

                $this->monthlyBreakdown($req, $req, $id);

                Loan::find($req->id)
                    ->update([
                        'is_approve' => 1
                    ]);
                
            });

            return response()->json([
                'status' => 'approved'
            ], 200);
            
        }catch(\Exception  $e){
            return response()->json(['error' => ['Transaction failed: ' . $e->getMessage()], 'message' => $e->getMessage()], 500);
        }
    }

    /*=========================================*/
    private function monthlyBreakdown($loan, $req, $id){

        $principal = $req->principal;
        $terms = $req->terms_month / 12;
        $interest = $req->interest / 100;
        
        $monthlyInterest = $principal * $interest * $terms;
        $totalPayment = $principal + ($monthlyInterest * $req->terms_month);
        $monthlyAmortization = $totalPayment / $req->terms_month;
        
        $loanDetails = [];

        for($i = 0; $i < $req->terms_month; $i++){
            $loanDetails[] = [
                'loan_id' => $loan->id,
                'user_id' => $id,
                'month' => $i + 1,
                'amount' => round($monthlyAmortization, 2),
                'due_date' => now()->addMonths($i + 1),
                'created_at' => now(),
                'updated_at' => now(),
            ];   
        }

        LoanDetail::insert($loanDetails);
    }



}
