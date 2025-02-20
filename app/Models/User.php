<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'lname',
        'fname',
        'mname',
        'suffix',
        'education_level',
        'birthdate',
        'birthplace',
        'sex',
        'civil_status',
        'religion',
        'ethnic_group',
        'nationality',
        'height',
        'weight',
        'blood_type',
        'sss',
        'tin',
        'driver_license',
        'philhealth',
        'umid',
        'household_size',
        'occupation',
        'industry_code',
        'occupational_code',
        'monthly_income',
        'sector_presented',
        'organization_affiliated',
        'org_aff_address',
        'contact_no',
        'email',
        'password',
        'province',
        'city',
        'barangay',
        'street',
        'email_verified_at',
        'role',
        'membership_date',
        'image',
        'active'
    ];

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
