<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\LoanDetail;

class CheckAmount implements ValidationRule
{

    private $id;

    public function __construct($id){
        $this->id = $id;
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */

    
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
        $detail = LoanDetail::find($this->id);

        if($detail->amount !== $value){

            $fail('The :attribute must be equal to the loan amount.');
        }
    }
}
