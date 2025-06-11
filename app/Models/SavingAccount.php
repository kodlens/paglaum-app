<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavingAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'account_no',
        'account_name',
        'account_type',
        'balance',
        'interest_rate',
        'is_approved',
        'is_active',
        'is_bm_approved',
        'is_do_approved',
        'date_approved',
        'opened_at',
        'closed_at',
        'default_account'
    ];

    public function saving_transactions(){
        return $this->hasMany(SavingTransaction::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
