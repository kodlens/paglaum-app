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
           
            [
                'username' => 'meldhee',
                'lname' => 'KAAMINO',
                'fname' => 'MELDHEE',
                'mname' => '',
                'suffix' => '',
                'sex' => 'FEMALE',
                'email' => 'meldhee@dev.org',
                'contact_no' => '09951156625',
                'password' => Hash::make('a'),
                'role' => 'USER',
                'province' => '',
                'city' => '',
                'barangay' => '',
                'street' => '',
            ],

            [
                'username' => 'jessel',
                'lname' => 'ZAPANTA',
                'fname' => 'JESSEL',
                'mname' => '',
                'suffix' => '',
                'sex' => 'MALE',
                'email' => 'jessel@dev.org',
                'contact_no' => '09951156625',
                'password' => Hash::make('a'),
                'role' => 'USER',
                'province' => '',
                'city' => '',
                'barangay' => '',
                'street' => '',
            ],

            [
                'username' => 'juan',
                'lname' => 'DELA CRUZ',
                'fname' => 'JUAN',
                'mname' => '',
                'suffix' => '',
                'sex' => 'MALE',
                'email' => 'juan@dev.org',
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
