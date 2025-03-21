<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdType extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_type',
        'order_no',
        'active'
    ];

}
