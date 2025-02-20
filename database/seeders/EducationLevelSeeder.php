<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EducationLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'education_level' => 'ELEMENTARY LEVEL',
                'order_no' => 1,
                'active' => 1
            ],
            [
                'education_level' => 'ELEMENTARY GRADUATE',
                'order_no' => 2,
                'active' => 1
            ],
            [
                'education_level' => 'HIGH SCHOOL LEVEL',
                'order_no' => 3,
                'active' => 1
            ],
            [
                'education_level' => 'HIGH SCHOOL GRADUATE',
                'order_no' => 4,
                'active' => 1
            ],
            [
                'education_level' => 'SHORT TERM COURSE',
                'order_no' => 5,
                'active' => 1
            ],
            [
                'education_level' => 'VOCATIONAL GRADUATE',
                'order_no' => 6,
                'active' => 1
            ],
            [
                'education_level' => 'TESDA GRADUATE',
                'order_no' => 7,
                'active' => 1
            ],
            [
                'education_level' => 'COLLEGE LEVEL',
                'order_no' => 8,
                'active' => 1
            ],
            [
                'education_level' => 'COLLEGE GRADUATE',
                'order_no' => 9,
                'active' => 1
            ],
            [
                'education_level' => 'GRADUATE SCHOOL',
                'order_no' => 10,
                'active' => 1
            ],
            [
                'education_level' => 'NONE',
                'order_no' => 11,
                'active' => 1
            ],
          
        ];

        \App\Models\EducationLevel::insertOrIgnore($data);
    }
}
