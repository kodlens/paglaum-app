<?php

namespace App\Http\Controllers\Cron;

use App\Http\Controllers\SendSMS;
use Illuminate\Http\Request;
use App\Models\LoanDetail;
use \Carboon\Carbon;

class CheckDueDateController extends SendSMS
{
    public function checkDue(){

        $targetDate = \Carbon\Carbon::today()->addDays(5);

        $dueSoonLoans = LoanDetail::with('user')->whereDate('due_date', $targetDate)->get();
     
        foreach ($dueSoonLoans as $loan) {
            $user = $loan->user;

            if ($user && $user['contact_no']) {
                $dueDate = date('M d Y', strtotime($loan['due_date']));
                $message = 'Dear ' .$user['lname'] . ', '. $user['fname']. ', your loan is due on ' . $dueDate . '. Please make sure to pay on time.';
                $this->sendSMS($user['contact_no'], $message);
            }
        }

        //return $dueSoonLoans;

    }
}
