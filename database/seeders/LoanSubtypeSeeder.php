<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoanSubtypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'loan_type_id' => 1,
                'loan_subtype' => '3-6 months term - 2% per month or 24% per annum',
                'terms_month' => 6,
                'percent' => 2,
                'active' => 1
            ],
            [
                'loan_type_id' => 1,
                'loan_subtype' => '7-12 months term - 2.5% per month or 30% per annum',
                'terms_month' => 12,
                'percent' => 2.5,
                'active' => 1
            ],
            [
                'loan_type_id' => 1,
                'loan_subtype' => '12 months - 2 years  - 3% per month or 36% per annum',
                'terms_month' => 12,
                'percent' => 3,
                'active' => 1
            ],



            [
                'loan_type_id' => 2,
                'loan_subtype' => '1 year- 1.75% per month',
                'terms_month' => 12,
                'percent' => 1.75,
                'active' => 1
            ],
            [
                'loan_type_id' => 2,
                'loan_subtype' => '2 years - 2% per month',
                'terms_month' => 24,
                'percent' => 2,
                'active' => 1
            ],
            [
                'loan_type_id' => 2,
                'loan_subtype' => '3 years- 2.5 per month',
                'terms_month' => 36,
                'percent' => 2.5,
                'active' => 1
            ],


            [
                'loan_type_id' => 3,
                'loan_subtype' => '3% per month or 36% per annum',
                'terms_month' => 12,
                'percent' => 3,
                'active' => 1
            ],


            [
                'loan_type_id' => 4,
                'loan_subtype' => '3 months - 2 years - 2% per month flat rate ',
                'terms_month' => 24,
                'percent' => 2,
                'active' => 1
            ],


            [
                'loan_type_id' => 5,
                'loan_subtype' => '12% per annum flat rate ( salary only)',
                'terms_month' => 12,
                'percent' => 12,
                'active' => 1
            ],
            [
                'loan_type_id' => 5,
                'loan_subtype' => '14% per annum flat rate ( bonus only)',
                'terms_month' => 12,
                'percent' => 14,
                'active' => 1
            ],



        ];

        \App\Models\LoanSubtype::insertOrIgnore($data);
    }
}
