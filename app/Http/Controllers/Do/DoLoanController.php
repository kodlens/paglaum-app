<?php

namespace App\Http\Controllers\Do;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Loan;
use App\Models\LoanDetail;
use App\Models\User;

class DoLoanController extends Controller
{
    public function index(){
        return Inertia::render('Do/DoLoans/DoLoansIndex');
    }

    public function getData(Request $req){

        $data = Loan::with(['user', 'loan_type', 'loan_subtype'])
            ->paginate($req->perPage);

        return $data;
    }

    public function approveLoan(Request $req){
        //return $req;
        $principal = (double)$req->principal;

        $user = User::where('id', $req->user_id)->first(); //check if the member is allowed to LOAN

        if($user->is_loan_allowed == 0){
            return response()->json([
                'errors' => [
                    'principal' => ['Loan is now allowed to this member.']
                ],
                'message' => 'Loan is now allowed to this member.'
            ], 422);
        }

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

        try{

            \DB::transaction(function () use ($req) {

                $this->monthlyBreakdown($req);

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
    private function monthlyBreakdown($loan){

        $principal = $loan->principal;
        $terms = $loan->terms_month / 12;
        $interest = $loan->interest / 100;
        
        $monthlyInterest = $principal * $interest * $terms;
        $totalPayment = $principal + ($monthlyInterest * $loan->terms_month);
        $monthlyAmortization = $totalPayment / $loan->terms_month;
        
        $loanDetails = [];

        for($i = 0; $i < $loan->terms_month; $i++){
            $loanDetails[] = [
                'loan_id' => $loan->id,
                'user_id' => $loan->user_id,
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
