<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'user_id',
        'loan_type_id',
        'loan_subtype_id',
        'principal',
        'mode_payment',
        'terms_month',
        'previous_balance',
        'interest',
        'guarantor',
        'purpose',
        'is_approve',
        'is_do_approve',
        'is_bm_approve',
        'total_payment'
    ];


    public function loan_type(){
        return $this->belongsTo(LoanType::class);
    }

    public function loan_details(){
        return $this->hasMany(LoanDetail::class);
    }

    public function loan_subtype(){
        return $this->belongsTo(LoanSubtype::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

}
