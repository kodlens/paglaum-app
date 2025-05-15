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
        'kyc_id',
        'is_approve',
        'is_do_approve',
        'is_bm_approve',
        'total_payment',
        'co_maker',
        'co_maker_identification',
        'co_maker_signature',
        'signature',
        'insurance_type_id', 'insurance_type', 
        'insurance_type_agebracket_id', 
        'insurance_payment',
        'shared'
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

    public function insurance_type(){
        return $this->belongsTo(InsuranceType::class);
    }

    public function insurance_type_agebracket(){
        return $this->hasOne(InsuranceTypeAgebracket::class, 'id', 'insurance_type_agebracket_id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

}
