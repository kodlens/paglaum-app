<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoanType extends Model
{
    use HasFactory;

    protected $fillable = [
        'loan_type',
        'description',
        'percentage',
        'active',
    ];

    public function loanSubtypes(){
        return $this->hasMany(LoanSubtype::class);
    }

}
