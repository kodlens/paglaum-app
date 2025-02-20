<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MemberCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            
            [
                'member_category' => 'INDIVIDUAL',
                'description' => 'Individual member',
                'order_no' => 1,
                'active' => 1
            ],
            [
                'member_category' => 'MICRO FINANCE',
                'description' => 'Micro finance member',
                'order_no' => 2,
                'active' => 1
            ],
            [
                'member_category' => 'ASSOCIATE',
                'description' => 'Associate member',
                'order_no' => 3,
                'active' => 1
            ],

        ];

        \App\Models\MemberCategory::insertOrIgnore($data);
        
    }
}
