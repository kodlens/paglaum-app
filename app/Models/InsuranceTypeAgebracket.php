<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InsuranceTypeAgebracket extends Model
{
    use HasFactory;

    protected $table = 'insurance_type_agebrackets';

    protected $fillable = [
        'insurance_type_id',
        'title',
        'benefits',
        'amount',
        'claimable_amount',
        'is_active',
    ];


}
