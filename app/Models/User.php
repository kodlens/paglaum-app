<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'password',

        'lname',
        'fname',
        'mname',
        'suffix',
        'contact_no',
        'email',

        'education_level',
        'birthdate',
        'birthplace',
        'sex',
        'civil_status',

        // 'religion',
        // 'ethnic_group',
        // 'nationality',
        // 'height',
        // 'weight',
        // 'blood_type',

        'sss',
        'gsis',
        'tin',

        'id_type',
        'id_no',
       
        // 'philhealth',
        // 'umid',

        'household_size',
        'occupation',
        //'industry_code',
        //'occupational_code',
        'monthly_income',
        'business_name',
        'business_address',
        'contact_person',
        'contact_person_no',
        //'sector_presented',
        //'organization_affiliated',
        //'org_aff_address',

        'province',
        'city',
        'barangay',
        'street',
        'email_verified_at',
        'role',
        'membership_date',
        'image',
        'active',
        'last_login',
        'is_loan_allowed',
        'expiration_code_2fa',
        'otp_sender'
    ];

    public function province(){
        return $this->hasOne(Province::class, 'provCode', 'province');
    }

    public function city(){
        return $this->hasOne(City::class, 'citymunCode', 'city');
    }

    public function barangay(){
        return $this->hasOne(Barangay::class, 'brgyCode', 'barangay');
    }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
