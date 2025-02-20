<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->nullable()
                ->unique();
            $table->string('title', 10)->nullable();
            $table->string('lname', 100)->nullable();
            $table->string('fname', 100)->nullable();
            $table->string('mname', 100)->nullable();
            $table->string('suffix', 30)->nullable();
           
            $table->string('education_level')->nullable();
            $table->date('birthdate')->nullable();
            $table->string('birthplace')->nullable();

            $table->string('sex', 30)->nullable();
            $table->string('civil_status', 30)->nullable();
            $table->string('religion', 30)->nullable();
            $table->string('ethnic_group', 30)->nullable();
            $table->string('nationality', 30)->nullable();
            $table->double('height')->default(0)->nullable();
            $table->double('weight')->default(0)->nullable();
            $table->string('blood_type', 10)->nullable();
            $table->string('sss', 15)->nullable();
            $table->string('tin', 15)->nullable();
            $table->string('driver_license', 15)->nullable();
            $table->string('philhealth', 15)->nullable();
            $table->string('umid', 15)->nullable();
            $table->integer('household_size')->nullable()
                ->default(0);
            $table->string('occupation')->nullable();
            $table->string('industry_code', 20)->nullable();
            $table->string('occupational_code', 20)->nullable();
            $table->string('monthly_income', 30)->nullable();
            $table->string('sector_presented', 50)->nullable();
            $table->string('organization_affiliated', 50)->nullable();
            $table->string('org_aff_address', 50)->nullable();
            $table->string('contact_no', 30)->nullable();
            $table->string('email')->unique();
            $table->string('province', 30)->nullable();
            $table->string('city', 30)->nullable();
            $table->string('barangay', 30)->nullable();
            $table->string('street', 30)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('image')->nullable();
            $table->string('role', 30)->nullable();
            $table->date('membership_date')->nullable();
            $table->tinyInteger('active')->nullable()
                ->default(1);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
