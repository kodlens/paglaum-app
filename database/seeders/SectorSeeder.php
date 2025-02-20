<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SectorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'sector' => 'GOVERNMENT SECTOR',
                'description' => '',
                'active' => 1,
                'order_no' => 1
            ],
            [
                'sector' => 'PRIVATE SECTOR',
                'description' => '',
                'active' => 1,
                'order_no' => 2
            ],
            [
                'sector' => 'COOP SECTOR',
                'description' => '',
                'active' => 1,
                'order_no' => 3
            ],
            [
                'sector' => 'STUDENT',
                'description' => '',
                'active' => 1,
                'order_no' => 4
            ],
            [
                'sector' => 'INDIGENOUS PEOPLE',
                'description' => '',
                'active' => 1,
                'order_no' => 5
            ],
            [
                'sector' => 'NGO SECTOR',
                'description' => '',
                'active' => 1,
                'order_no' => 6
            ],
            [
                'sector' => 'PENSIONER',
                'description' => '',
                'active' => 1,
                'order_no' => 7
            ],
            [
                'sector' => 'PERSON WITH DISABILITY',
                'description' => '',
                'active' => 1,
                'order_no' => 8
            ],
            [
                'sector' => 'MICRO ENTREPRENEURSHIP',
                'description' => '',
                'active' => 1,
                'order_no' => 9
            ],
            [
                'sector' => 'AGRI FARMERS',
                'description' => '',
                'active' => 1,
                'order_no' => 10
            ],
            [
                'sector' => 'AQUA FARMERS',
                'description' => '',
                'active' => 1,
                'order_no' => 11
            ],
            [
                'sector' => 'ARB',
                'description' => '',
                'active' => 1,
                'order_no' => 12
            ],
            [
                'sector' => 'YOUTH',
                'description' => '',
                'active' => 1,
                'order_no' => 13
            ],
            [
                'sector' => 'NONE',
                'description' => '',
                'active' => 1,
                'order_no' => 14
            ],
        ];

        \App\Models\Sector::insertOrIgnore($data);
    }
}
