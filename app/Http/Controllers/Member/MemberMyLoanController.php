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

        // // check if the user have loan history
        // $exists = Loan::where('user_id', $user->id)->existS();
        // if($exists){
        //     /* -------------- add checking if allowed reloan ------------------ */
        //     /* -------------- prevent the user to reloan ------------------ */
        //     require __DIR__.'/partials/check_reloan.php';
        //     if($totalMonthsMustPaid > $countMonthsPaid){
        //         return response()->json([
        //             'errors' => [
        //                 'principal' => ['Reloan is not allowed this time.']
        //             ],
        //             'message' => 'Reloan is not allowed this time.'
        //         ], 422);
        //     }
        //     /* -------------- *************END*********** ------------------ */
        // }

        try{

            \DB::transaction(function () use ($req, $user) {
               
               
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
                ]);

                /* -------------- filter by mode of payment (daily, weekly, monthly) ------------------ */
                if($req->mode_payment == 'MONTHLY'){
                    $this->monthlyBreakdown($loan, $req, $user);
                }

                if($req->mode_payment == 'DAILY'){
                    $this->dailyBreakDown($loan, $req, $user);
                }

                if($req->mode_payment == 'WEEKLY'){
                    $this->weeklyBreakdown($loan, $req, $user);
                }

                if($req->mode_payment == 'QUARTERLY'){
                    $this->quarterlyBreakdown($loan, $req, $user);
                }

                if($req->mode_payment == 'LUMP-SUM'){
                    $this->lumpSumBreakdown($loan, $req, $user);
                }
                
                
            });
            
            return response()->json([
                'status' => 'saved11'
            ], 200);
            
        }catch(\Exception  $e){
            return response()->json(['error' => ['Transaction failed: ' . $e->getMessage()], 'message' => $e->getMessage()], 500);
        }
    }


    public function create(){
        return Inertia::render('Member/MyLoan/CreateEdit');
    }





    /*==================MONTHLY=======================*/
    private function monthlyBreakdown($loan, $req, $user){

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
                'user_id' => $user->id,
                'month' => $i + 1,
                'amount' => round($monthlyAmortization, 2),
                'due_date' => now()->addMonths($i + 1),
                'created_at' => now(),
                'updated_at' => now(),
            ];   
        }

        LoanDetail::insert($loanDetails);
    }

    /* ================= DAILY ================== */
    private function dailyBreakDown($loan, $req, $user){
        
        //Starting date
        $startDate = Carbon::now()->addDay();  // Add one day to current date

        //End date = $req->terms_month months later
        $endDate = $startDate->copy()->addMonths($req->terms_month);

        //Create daily period
        $period = CarbonPeriod::create($startDate, '1 day', $endDate);


        $principal = $req->principal;
        $terms = $req->terms_month / 12;
        $interest = $req->interest / 100;
        
        $monthlyInterest = $principal * $interest * $terms;
        $totalPayment = $principal + ($monthlyInterest * $req->terms_month);
        $monthlyAmortization = $totalPayment / $req->terms_month;

        $payment = $totalPayment / count($period);

        //Loop through each day
        foreach ($period as $i => $date) {
            //echo $date->format('Y-m-d') . "\n";
            $loanDetails[] = [
                'loan_id' => $loan->id,
                'user_id' => $user->id,
                'month' => $date->month,
                'amount' => round($payment, 2),
                'due_date' => $date->format('Y-m-d'),
                'created_at' => now(),
                'updated_at' => now(),
            ]; 
        }

        LoanDetail::insert($loanDetails);
    }


    /* ================= WEEKLY ================== */
    private function weeklyBreakdown($loan, $req, $user){
        //Starting date
        $startDate = Carbon::now()->addDay();  // Add one day to current date

        //End date = $req->terms_month months later
        $endDate = $startDate->copy()->addMonths($req->terms_month);

        //Create daily period
        $period = CarbonPeriod::create($startDate, '1 week', $endDate);

        $principal = $req->principal;
        $terms = $req->terms_month / 12;
        $interest = $req->interest / 100;
        
        $monthlyInterest = $principal * $interest * $terms;
        $totalPayment = $principal + ($monthlyInterest * $req->terms_month);
        $monthlyAmortization = $totalPayment / $req->terms_month;

        $payment = $totalPayment / count($period);

        //Loop through each day
        foreach ($period as $i => $date) {
            echo $date->format('Y-m-d') . "\n";
            $loanDetails[] = [
                'loan_id' => $loan->id,
                'user_id' => $user->id,
                'month' => $date->month,
                'amount' => round($payment, 2),
                'due_date' => $date->format('Y-m-d'),
                'created_at' => now(),
                'updated_at' => now(),
            ]; 
        }
        LoanDetail::insert($loanDetails);
    }

    /* ================= QUARTERLY ================== */
    private function quarterlyBreakdown($loan, $req, $user){
        //Starting date
        $startDate = Carbon::now()->addDay();  // Add one day to current date

        //End date = $req->terms_month months later
        $endDate = $startDate->copy()->addMonths($req->terms_month);

        //Create daily period
        $period = CarbonPeriod::create($startDate, '3 months', $endDate);

        $principal = $req->principal;
        $terms = $req->terms_month / 12;
        $interest = $req->interest / 100;
        
        $monthlyInterest = $principal * $interest * $terms;
        $totalPayment = $principal + ($monthlyInterest * $req->terms_month);
        $monthlyAmortization = $totalPayment / $req->terms_month;

        $payment = $totalPayment / count($period);

        //Loop through each day
        foreach ($period as $i => $date) {
            echo $date->format('Y-m-d') . "\n";
            $loanDetails[] = [
                'loan_id' => $loan->id,
                'user_id' => $user->id,
                'month' => $date->month,
                'amount' => round($payment, 2),
                'due_date' => $date->format('Y-m-d'),
                'created_at' => now(),
                'updated_at' => now(),
            ]; 
        }

        LoanDetail::insert($loanDetails);
    }

    /* ================= lumpsum ================== */
    private function lumpSumBreakdown($loan, $req, $user){
        //Starting date
        $startDate = Carbon::now()->addDay();  // Add one day to current date
        //End date = $req->terms_month months later
        $endDate = Carbon::now()->addMonth();
        echo $endDate->month;

        $principal = $req->principal;
        $terms = $req->terms_month / 12;
        $interest = $req->interest / 100;
        
        $monthlyInterest = $principal * $interest * $terms;
        $totalPayment = $principal + ($monthlyInterest * $req->terms_month);

        LoanDetail::create([
            'loan_id' => $loan->id,
            'user_id' => $user->id,
            'month' => $endDate->month,
            'amount' => round($totalPayment, 2),
            'due_date' => $endDate->format('Y-m-d'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }










}
