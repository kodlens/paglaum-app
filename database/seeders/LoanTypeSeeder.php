<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoanTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'loan_type' => 'PROJECT LOAN (FLAT INTEREST RATE)',
                'description' => 'FLAT INTEREST RATE',
                'active' => 1
            ],

            [
                'loan_type' => 'DIMINISHING LOANS',
                'description' => 'MOTORCYCLE/MOTOR VEHICLE',
                'active' => 1
            ],

            [
                'loan_type' => 'PROJECT DIMINISHING',
                'description' => 'PROJECT DIMINISHING',
                'active' => 1
            ],

            [
                'loan_type' => 'PENSION LOAN',
                'description' => 'SALARY LOAN',
                'active' => 1
            ],

            [
                'loan_type' => 'SALARY LOAN',
                'description' => 'SALARY LOAN',
                'active' => 1
            ],

        ];

        \App\Models\LoanType::insertOrIgnore($data);
    }
}
