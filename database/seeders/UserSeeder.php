<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'username' => 'admin',
                'lname' => 'SINARILLOS',
                'fname' => 'HARBY CAMUS',
                'mname' => '',
                'suffix' => '',
                'sex' => 'MALE',
                'email' => 'admin@dev.org',
                'contact_no' => '09951156623',
                'password' => Hash::make('a'),
                'role' => 'ADMINISTRATOR',
                'province' => '',
                'city' => '',
                'barangay' => '',
                'street' => '',
            ],

            [
                'username' => 'marianita',
                'lname' => 'JALLAHA',
                'fname' => 'MARIANITA',
                'mname' => '',
                'suffix' => '',
                'sex' => 'FEMALE',
                'email' => 'marianita@dev.org',
                'contact_no' => '09951156624',
                'password' => Hash::make('a'),
                'role' => 'STAFF',
                'province' => '',
                'city' => '',
                'barangay' => '',
                'street' => '',
            ],

            [
                'username' => 'cheriluna',
                'lname' => 'REDOBLE',
                'fname' => 'CHERILUNA',
                'mname' => '',
                'suffix' => '',
                'sex' => 'FEMALE',
                'email' => 'cheriluna@dev.org',
                'contact_no' => '09951156625',
                'password' => Hash::make('a'),
                'role' => 'USER',
                'province' => '',
                'city' => '',
                'barangay' => '',
                'street' => '',
            ],
           
        ];

        \App\Models\User::insertOrIgnore($data);
    }
}
