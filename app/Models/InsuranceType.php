<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InsuranceType extends Model
{
    use HasFactory;

    protected $table = 'insurance_types';
    protected $primaryKey = 'id';

    protected $fillable = [
        'insurance_type',
        'is_active',
    ];


   
}
