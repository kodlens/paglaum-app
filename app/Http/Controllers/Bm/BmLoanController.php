<?php

namespace App\Http\Controllers\Bm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Loan;
use App\Models\LoanDetail;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Http;


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
        //return $req;

        $loan = Loan::find($req->id);
        $loan->loan_type_id = $req->loan_type_id;
        $loan->loan_subtype_id = $req->loan_subtype_id;
        $loan->principal = $req->principal;
        $loan->interest = $req->interest;
        $loan->terms_month = $req->terms_month;
        $loan->mode_payment = $req->mode_payment;
        $loan->shared = $req->shared;
        $loan->save();
        
        if($loan->is_do_approve < 1){
            return response()->json([
                'errors' => [
                    'loan' => ['Development Officer need to approve this loan first.']
                ],
                'message' => 'Development Officer need to approve this loan first'
            ], 422);
        }

        if($loan->is_bm_approve > 0){
            return response()->json([
                'errors' => [
                    'loan' => ['Loan already approved.']
                ],
                'message' => 'Loan already approved.'
            ], 422);
        }

        
        try{

            \DB::transaction(function () use ($req) {
               
                /* -------------- filter by mode of payment (daily, weekly, monthly) ------------------ */
                if($req->mode_payment == 'MONTHLY'){
                    $this->monthlyBreakdown($req);
                }

                if($req->mode_payment == 'DAILY'){
                    $this->dailyBreakDown($req);
                }

                if($req->mode_payment == 'WEEKLY'){
                    $this->weeklyBreakdown($req);
                }

                if($req->mode_payment == 'QUARTERLY'){
                    $this->quarterlyBreakdown($req);
                }

                if($req->mode_payment == 'LUMP-SUM'){
                    $this->lumpSumBreakdown($req);
                }

                Loan::find($req->id)
                    ->update([
                        'is_bm_approve' => 1,
                        'is_approve' => 1,
                    ]);
            });
            
            $output = '';
            if(env('SMS') > 0){
                $apiKey = env('SMS_API_KEY');
                $response = Http::asForm()->post('https://semaphore.co/api/v4/messages', [
                    'apikey'     => $apiKey,
                    'number'     => $user->contact_no,
                    'message'    => "Your loan application with reference no '.$loan->id.' has been successfully approved.",
                    'sendername' => 'LARATSYS',
                ]);
                
                // Check if request was successful
                if ($response->successful()) {
                    $output = $response->json(); // Optional: handle the JSON response
                } else {
                    // Handle the error
                    \Log::error('SMS sending failed', [
                        'response' => $response->body(),
                        'status' => $response->status(),
                    ]);
                }
            }


            return response()->json([
                'status' => 'approved',
                'sms' => $output
            ], 200);
            
        }catch(\Exception  $e){
            return response()->json(['error' => ['Transaction failed: ' . $e->getMessage()], 'message' => $e->getMessage()], 500);
        }
    }

    /*=========================================*/
    private function monthlyBreakdown($loan){

        $principal = $loan->principal;
        $terms = $loan->terms_month;
        $interest = ($loan->interest * $terms) / 100;
        $monthly = $principal / $terms;
        
        $interestRate = $monthly * $interest;
        $monthlyAmortization = $monthly + $interestRate;
        
        $insurancePayment = $loan->insurance_payment;
        $insurancePaymentBreakDown = $loan->insurance_payment / $loan->terms_month;
        
        $loanDetails = [];

        for($i = 0; $i < $loan->terms_month; $i++){
            $loanDetails[] = [
                'loan_id' => $loan->id,
                'user_id' => $loan->user_id,
                'month' => $i + 1,
                'shared' => $loan->shared,
                'amount' => round($monthlyAmortization, 2),
                'due_date' => now()->addMonths($i + 1),
                'insurance_payment' => round($insurancePaymentBreakDown, 2),
                'total_amount' => round($monthlyAmortization, 2) + round($insurancePaymentBreakDown, 2),
                'created_at' => now(),
                'updated_at' => now(),
            ];   
        }

        LoanDetail::insert($loanDetails);
    }



    /* ================= DAILY ================== */
    private function dailyBreakDown($req){
        
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

        $insurancePayment = $req->insurance_payment;
        $insurancePaymentBreakDown = $req->insurance_payment / count($period);

        //Loop through each day
        foreach ($period as $i => $date) {
            //echo $date->format('Y-m-d') . "\n";
            $loanDetails[] = [
                'loan_id' => $req->id,
                'user_id' => $req->user['id'],
                'month' => $date->month,
                'amount' => round($payment, 2),
                'due_date' => $date->format('Y-m-d'),
                'insurance_payment' => round($insurancePaymentBreakDown, 2),
                'total_amount' => round($payment, 2) + round($insurancePaymentBreakDown, 2),
                'created_at' => now(),
                'updated_at' => now(),
            ]; 
        }

        LoanDetail::insert($loanDetails);
    }


    /* ================= WEEKLY ================== */
    private function weeklyBreakdown($req){
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

        $insurancePayment = $req->insurance_payment;
        $insurancePaymentBreakDown = $req->insurance_payment / count($period);

        //Loop through each day
        foreach ($period as $i => $date) {
            $loanDetails[] = [
                'loan_id' => $req->id,
                'user_id' => $req->user['id'],
                'month' => $date->month,
                'amount' => round($payment, 2),
                'due_date' => $date->format('Y-m-d'),
                'insurance_payment' => round($insurancePaymentBreakDown, 2),
                'total_amount' => round($payment, 2) + round($insurancePaymentBreakDown, 2),
                'created_at' => now(),
                'updated_at' => now(),
            ]; 
        }
        LoanDetail::insert($loanDetails);
    }

    /* ================= QUARTERLY ================== */
    private function quarterlyBreakdown($req){
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

        $insurancePayment = $req->insurance_payment;
        $insurancePaymentBreakDown = $req->insurance_payment / count($period);

        //Loop through each day
        foreach ($period as $i => $date) {
            $loanDetails[] = [
                'loan_id' => $req->id,
                'user_id' => $req->user['id'],
                'month' => $date->month,
                'amount' => round($payment, 2),
                'due_date' => $date->format('Y-m-d'),
                'insurance_payment' => round($insurancePaymentBreakDown, 2),
                'total_amount' => round($payment, 2) + round($insurancePaymentBreakDown, 2),
                'created_at' => now(),
                'updated_at' => now(),
            ]; 
        }

        LoanDetail::insert($loanDetails);
    }

    /* ================= lumpsum ================== */
    private function lumpSumBreakdown($req){
        //Starting date
        $startDate = Carbon::now()->addDay();  // Add one day to current date
        //End date = $req->terms_month months later
        $endDate = Carbon::now()->addMonth();
        // $endDate->month;

        $principal = $req->principal;
        $terms = $req->terms_month / 12;
        $interest = $req->interest / 100;
        
        $monthlyInterest = $principal * $interest * $terms;
        $totalPayment = $principal + ($monthlyInterest * $req->terms_month);

        $insurancePayment = $req->insurance_payment;


        LoanDetail::create([
            'loan_id' => $req->id,
            'user_id' => $req->user['id'],
            'month' => $endDate->month,
            'amount' => round($totalPayment, 2),
            'due_date' => $endDate->format('Y-m-d'),
            'insurance_payment' => $insurancePayment,
            'total_amount' => round($totalPayment, 2) + $insurancePayment,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }



}
