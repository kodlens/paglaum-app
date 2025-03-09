<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoanSubtype extends Model
{
    use HasFactory;

    protected $fillable = [
        'loan_type_id',
        'description',
        'active',
    ];
}
