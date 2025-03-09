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
        Schema::create('loan_subtypes', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('loan_type_id');
            $table->foreign('loan_type_id')->references('id')
                ->on('loan_types')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->string('loan_subtype')->nullable();
            $table->double('term_month')->default(0);
            $table->double('percent')->default(0);
            $table->tinyInteger('active')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loan_subtypes');
    }
};
