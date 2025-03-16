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
        'amount',
        'interest_rate',
        'term',
        'due_date'
    ];

}
