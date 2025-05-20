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
        $do = $req->do;
        $bm = $req->bm;

        $data = Loan::with(['user', 'loan_type', 'loan_subtype']);

        if($do != ''){
            $data->where('is_do_approve', $do);
        }

        if($bm != ''){
            $data->where('is_bm_approve', $bm);
        }

        return $data->paginate($req->perPage);
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

        $loan = Loan::find($req->id);
      

        if($loan->is_do_approve > 0){
            return response()->json([
                'errors' => [
                    'loan' => ['Loan already approved.']
                ],
                'message' => 'Loan already approved.'
            ], 422);
        }

        try{

            \DB::transaction(function () use ($req, $loan) {

                //$this->monthlyBreakdown($req);
                $loan->is_do_approve = 1;
                $loan->save();
            });

            return response()->json([
                'status' => 'approved'
            ], 200);
            
        }catch(\Exception  $e){
            return response()->json(['error' => ['Transaction failed: ' . $e->getMessage()], 'message' => $e->getMessage()], 500);
        }
    }
    public function disapproveLoan(Request $req){

        $loan = Loan::find($req->id);

        if($loan->is_bm_approve > 0){
            return response()->json([
                'errors' => [
                    'bm' => ['This loan was already approved by the Branch Manager.']    
                ],
                'message' => 'This loan was already approved by the Branch Manager.'
            ], 422);
        }

        $loan->is_do_approve = 0;
        $loan->save();

        return response()->json([
            'status' => 'disapproved'
        ], 200);
    }

    

    /*=========================================*/
    // private function monthlyBreakdown($loan){

    //     $principal = $loan->principal;
    //     $terms = $loan->terms_month / 12;
    //     $interest = $loan->interest / 100;
        
    //     $monthlyInterest = $principal * $interest * $terms;
    //     $totalPayment = $principal + ($monthlyInterest * $loan->terms_month);
    //     $monthlyAmortization = $totalPayment / $loan->terms_month;
        
    //     $loanDetails = [];

    //     for($i = 0; $i < $loan->terms_month; $i++){
    //         $loanDetails[] = [
    //             'loan_id' => $loan->id,
    //             'user_id' => $loan->user_id,
    //             'month' => $i + 1,
    //             'amount' => round($monthlyAmortization, 2),
    //             'due_date' => now()->addMonths($i + 1),
    //             'created_at' => now(),
    //             'updated_at' => now(),
    //         ];   
    //     }

    //     LoanDetail::insert($loanDetails);
    // }

   

}
