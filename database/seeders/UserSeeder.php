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
                'role' => 'ADMIN',
                'province' => '',
                'city' => '',
                'barangay' => '',
                'street' => '',
                'email_verified_at' => null,
                'is_loan_allowed' => 1
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
                'role' => 'BM',
                'province' => '',
                'city' => '',
                'barangay' => '',
                'street' => '',
                'email_verified_at' => null,
                'is_loan_allowed' => 1

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
                'role' => 'MEMBER',
                'province' => '',
                'city' => '',
                'barangay' => '',
                'street' => '',
                'email_verified_at' => null,
                'is_loan_allowed' => 1

            ],
           
            [
                'username' => 'meldhee',
                'lname' => 'KAAMINO',
                'fname' => 'MELDHEE',
                'mname' => '',
                'suffix' => '',
                'sex' => 'FEMALE',
                'email' => 'meldhee@dev.org',
                'contact_no' => '9951156625',
                'password' => Hash::make('a'),
                'role' => 'MEMBER',
                'province' => '',
                'city' => '',
                'barangay' => '',
                'street' => '',
                'email_verified_at' => '2025-05-12 10:00:36',
                'is_loan_allowed' => 1

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
                'role' => 'MEMBER',
                'province' => '',
                'city' => '',
                'barangay' => '',
                'street' => '',
                'email_verified_at' => null,
                'is_loan_allowed' => 1

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
                'role' => 'DO',
                'province' => '',
                'city' => '',
                'barangay' => '',
                'street' => '',
                'email_verified_at' => null,
                'is_loan_allowed' => 1

            ],
        ];

        \App\Models\User::insertOrIgnore($data);
    }
}
