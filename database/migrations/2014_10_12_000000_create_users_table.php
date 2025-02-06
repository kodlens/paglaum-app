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
            $table->string('lname', 100)->nullable();
            $table->string('fname', 100)->nullable();
            $table->string('mname', 100)->nullable();
            $table->string('suffix', 30)->nullable();
            $table->string('sex', 30)->nullable();
            $table->string('contact_no', 30)->nullable();
            $table->string('email')->unique();
            $table->string('province', 30)->nullable();
            $table->string('city', 30)->nullable();
            $table->string('barangay', 30)->nullable();
            $table->string('street', 30)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('role', 30)->nullable();
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
