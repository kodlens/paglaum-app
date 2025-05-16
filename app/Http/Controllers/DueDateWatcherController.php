<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoanDetail;

class DueDateWatcherController extends Controller
{
    public function dueDateWatcherFourDays(){
        $targetDate = Carbon::now()->addDays(4);
        $results = LoanDetail::with(['user'])
            ->where('due_date', '<=', $targetDate)->get();

        return $results;
    }

    public function dueDateWatcherOneDay(){
        $targetDate = Carbon::now()->addDays(1);
        $results = LoanDetail::with(['user'])
            ->where('due_date', '<=', $targetDate)->get();

        return $results;
    }
}
