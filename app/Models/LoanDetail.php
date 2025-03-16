<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoanDetail extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'loan_id',
        'month',
        'user_id',
        'due_date',
        'date_paid',
        'amount',
        'is_paid'
    ];

}
