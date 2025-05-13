<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InsuranceTypeAgebracketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'insurance_type_id' => 1,
                'title' => '18-64 YEARS OLD',
                'benefits' => 'Natural Death (140,000 + 40,000) / Accidental Death (140,000 - 30,000(casket) - 5000 (groceries))',
                'amount' => 1750,
                'claimable_amount' => 180000,
                'is_active' => 1,
            ],
            [
                'insurance_type_id' => 1,
                'title' => '65-80 YEARS OLD',
                'benefits' => '25,000 (casket) 5,000 (groceries, tarpaulin, flowerstand and candle)',
                'amount' => 2500,
                'claimable_amount' => 100000,
                'is_active' => 1,
            ],
            [
                'insurance_type_id' => 1,
                'title' => '81-91 YEARS OLD',
                'benefits' => '25,000 (casket) 5,000 (groceries, tarpaulin, flowerstand and candle)',
                'amount' => 2800,
                'claimable_amount' => 100000,
                'is_active' => 1,
            ],
            [
                'insurance_type_id' => 1,
                'title' => '18 YEARS OLD AND BELOW',
                'benefits' => '30,000 (cash)',
                'amount' => 2800,
                'claimable_amount' => 30000,
                'is_active' => 1,
            ],
            [
                'insurance_type_id' => 1,
                'title' => 'MMAP ASSOCIATE MEMBER',
                'benefits' => '70,000 (cash) 25,000(casket) 5,000(groceries, tarpaulin, flowerstand and candle)',
                'amount' => 2800,
                'claimable_amount' => 70000,
                'is_active' => 1,
            ],
            [
                'insurance_type_id' => 2,
                'title' => '18-65 YEARS OLD',
                'benefits' => 'Natural Death 40,000 / Accidental Death 40,000',
                'amount' => 550,
                'claimable_amount' => 40000,
                'is_active' => 1,
            ],
            [
                'insurance_type_id' => 2,
                'title' => '66-75 YEARS OLD',
                'benefits' => 'Natural Death 40,000 / Accidental Death 40,000',
                'amount' => 1475,
                'claimable_amount' => 40000,
                'is_active' => 1,
            ],
           
        ];
        

        \App\Models\InsuranceTypeAgebracket::insertOrIgnore($data);
    }
}
