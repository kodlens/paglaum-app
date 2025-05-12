<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InsuranceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'insurance_type' => 'MMAP',
                'is_active' => 1,
            ],
             [
                'insurance_type' => 'DAKILA',
                'is_active' => 1,
            ],
           
        ];
        

        \App\Models\InsuranceType::insertOrIgnore($data);
    }
}
