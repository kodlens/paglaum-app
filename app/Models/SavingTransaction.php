<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavingTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'saving_account_id',
        'transaction_type',
        'payment_method',
        'payment_session',
        'ref',
        'remarks',
        'amount',
        'balance',
        'fee',
        'datetime_deposit'
    ];

    public function saving_account(){
        return $this->belongsTo(SavingAccount::class);
    }

}
