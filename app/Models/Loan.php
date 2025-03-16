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
        'terms_month',
        'interest',
        'purpose'
    ];


    public function loan_type(){
        return $this->belongsTo(LoanType::class);
    }

    public function loan_subtype(){
        return $this->belongsTo(LoanSubtype::class);
    }
}
