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
        'datetime_paid',
        'amount',
        'amount_paid',
        'is_paid',
        'ref',
        'payment_method',
        'payment_transaction',
        'payment_session'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

}
