<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          $data = [
            [
                'user_id' => 4,
                'purpose' => "For tuition fee",
                'loan_type_id' => 1,
                'loan_subtype_id' => 1,
                'mode_payment' => 'MONTHLY',
                'principal' => 20000,
                'interest' => 2,
                'terms_month' => 6,
                'previous_balance' => 0,
                'kyc_id' => 'bd6ee627d31e38c5a8eb199e41795a8d.jpg',
                'is_approve'=> 1,
                'is_paid'=> 0,
                'is_do_approve' => 1,
                'is_bm_approve' => 1,
                'total_payment' => 2120,
                'co_maker' => 'zapanta',
                'co_maker_identification' => '9bce6ccf206289c97dcfa77d80ca937a.jpg',
                'co_maker_identification' => '',
                'co_maker_signature' => ''
            ],
          
           
        ];
        

        \App\Models\Loan::insertOrIgnore($data);
    }
}
