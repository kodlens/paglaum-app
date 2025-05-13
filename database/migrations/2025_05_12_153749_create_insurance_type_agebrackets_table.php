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
        Schema::create('insurance_type_agebrackets', function (Blueprint $table) {
            $table->id();
           
            $table->unsignedBigInteger('insurance_type_id')->default(0);
            $table->string('title', 255)->nullable();
            $table->tinyInteger('is_active')->default(1);
            $table->text('benefits')->nullable();
            $table->double('amount')->default(0);
            $table->double('claimable_amount')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insurance_type_agebrackets');
    }
};
