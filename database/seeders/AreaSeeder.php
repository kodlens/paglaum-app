<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'area' => 'AGRICULTURE',
                'description' => '',
                'active' => 1,
                'order_no' => 1
            ],
            [
                'area' => 'AQUACULTURE',
                'description' => '',
                'active' => 1,
                'order_no' => 2
            ],
            [
                'area' => 'HEALTH',
                'description' => '',
                'active' => 1,
                'order_no' => 3
            ],
            [
                'area' => 'CONSTRUCTION',
                'description' => '',
                'active' => 1,
                'order_no' => 4
            ],
            [
                'area' => 'ARTS / CRAFTS',
                'description' => '',
                'active' => 1,
                'order_no' => 5
            ],
            [
                'area' => 'TRANSPORTATION',
                'description' => '',
                'active' => 1,
                'order_no' => 6
            ],
            [
                'area' => 'CLOTHING',
                'description' => '',
                'active' => 1,
                'order_no' => 7
            ],
            [
                'area' => 'MANUFACTURING',
                'description' => '',
                'active' => 1,
                'order_no' => 8
            ],
            [
                'area' => 'SERVICES',
                'description' => '',
                'active' => 1,
                'order_no' => 9
            ],
            [
                'area' => 'RETAIL',
                'description' => '',
                'active' => 1,
                'order_no' => 10
            ],
            [
                'area' => 'FOOD PROCESSING',
                'description' => '',
                'active' => 1,
                'order_no' => 11
            ],
            [
                'area' => 'WHOLESALE',
                'description' => '',
                'active' => 1,
                'order_no' => 12
            ],
        ];
        

        \App\Models\Area::insertOrIgnore($data);
    }
}
