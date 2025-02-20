<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemberCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_category',
        'description',
        'order_no',
        'active',
    ];
}
