<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MemberTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [

            [
                'member_type' => 'Regular (CBU P1,1500+)',
                'description' => '',
                'order_no' => 1,
                'active' => 1,
                'member_category_id' => 1
            ],
            [
                'member_type' => 'Associate (CBU < P1,1500)',
                'description' => '',
                'order_no' => 1,
                'active' => 1,
                'member_category_id' => 1
            ],
            

            [
                'member_type' => 'Regular (CBU P1,500 +)',
                'description' => '',
                'order_no' => 1,
                'active' => 1,
                'member_category_id' => 2
            ],
            [
                'member_type' => 'Associate (CBU < P1,500)',
                'description' => '',
                'order_no' => 1,
                'active' => 1,
                'member_category_id' => 2
            ],
            

            [
                'member_type' => 'Depositor',
                'description' => '',
                'order_no' => 1,
                'active' => 1,
                'member_category_id' => 3
            ],
            [
                'member_type' => 'Pensioner',
                'description' => '',
                'order_no' => 1,
                'active' => 1,
                'member_category_id' => 3
            ],
            
        ];

        \App\Models\MemberType::insertOrIgnore($data);

    }
}
