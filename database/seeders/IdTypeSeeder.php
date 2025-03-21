<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IdTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'id_type' => 'DRIVER LICENSE',
                'order_no' => 1,
                'active' => 1
            ],
            [
                'id_type' => 'SSS',
                'order_no' => 2,
                'active' => 1
            ],
            [
                'id_type' => 'UMID',
                'order_no' => 3,
                'active' => 1
            ],
            [
                'id_type' => 'PASSPORT',
                'order_no' => 4,
                'active' => 1
            ],
        ];
        

        \App\Models\IdType::insertOrIgnore($data);
    }
}
