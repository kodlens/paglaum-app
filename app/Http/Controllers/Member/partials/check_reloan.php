<?php
use App\Models\Loan;

$prevLoan = Loan::where('is_paid', 0)
    ->orderBy('created_at', 'desc')->first();

//get all total payment and total paid
$queryDetails = \DB::select('SELECT SUM(amount_paid) AS total_paid,
    ROUND(SUM(amount),2) AS total_payment FROM loan_details WHERE loan_id = ?', [$prevLoan->id]);

//get all total payment and total paid
$queryCountMonths = \DB::select('SELECT COUNT(*) AS count_month FROM loan_details
    WHERE loan_id = ? and is_paid = 1', [$prevLoan->id]);

$countMonthsPaid = $queryCountMonths[0]->count_month;

$totalPaid = $queryDetails[0]->total_paid;
$totalPayment = $queryDetails[0]->total_payment;

//lets use 80% of total months to pay
$totalMonthsToPay = $prevLoan->terms_month;
$totalMonthsMustPaid = round(($totalMonthsToPay * 0.08) * 10);