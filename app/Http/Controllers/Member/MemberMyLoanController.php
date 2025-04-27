<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Loan;
use App\Models\LoanDetail;
use Auth;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class MemberMyLoanController extends Controller
{
    //
    public function index(){
        return Inertia::render('Member/MyLoan/MyLoanIndex');
    }

    public function getMyLoans(Request $req){
        $user = Auth::user();
        
        return Loan::with(['loan_type', 'loan_subtype'])
            ->where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->get();
    }


    public function store(Request $req){
      
        $principal = (double)$req->principal;
        $user = Auth::user();

        if($user->is_loan_allowed == 0){
            return response()->json([
                'errors' => [
                    'principal' => ['Your account is not yet approved for any loan at this time.']
                ],
                'message' => 'Your account is not yet approved for any loan at this time.'
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

        // check if the user have loan history
        $exists = Loan::where('user_id', $user->id)->existS();
        if($exists){
            /* -------------- add checking if allowed reloan ------------------ */
            /* -------------- prevent the user to reloan ------------------ */
            require __DIR__.'/partials/check_reloan.php';
            if($totalMonthsMustPaid > $countMonthsPaid){
                return response()->json([
                    'errors' => [
                        'principal' => ['Reloan is not allowed this time.']
                    ],
                    'message' => 'Reloan is not allowed this time.'
                ], 422);
            }
            /* -------------- *************END*********** ------------------ */
        }

        try{

            \DB::transaction(function () use ($req, $user) {

                $principal = $req->principal;
                $terms = $req->terms_month / 12;
                $interest = $req->interest / 100;
                $monthlyInterest = $principal * $interest * $terms;
                $totalPayment = $principal + ($monthlyInterest * $req->terms_month);
              
               
                $loan = Loan::create([
                    'user_id' => $user->id,
                    'guarantor' => $req->guarantor,
                    'purpose' => $req->purpose,
                    'loan_type_id' => $req->loan_type_id,
                    'loan_subtype_id' => $req->loan_subtype_id,
                    'principal' => $req->principal,
                    'interest' => $req->interest,
                    'mode_payment' => $req->mode_payment,
                    'terms_month' => $req->terms_month,
                    'total_payment' => $totalPayment
                ]);
                
            });
            
            return response()->json([
                'status' => 'saved'
            ], 200);
            
        }catch(\Exception  $e){
            return response()->json(['error' => ['Transaction failed: ' . $e->getMessage()], 'message' => $e->getMessage()], 500);
        }
    }


    public function create(){
        return Inertia::render('Member/MyLoan/CreateEdit');
    }



}
