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
        Schema::create('member_types', function (Blueprint $table) {
            $table->id();
            $table->string('member_type');
            $table->string('description')->nullable();
            $table->tinyInteger('active')->default(0);
            $table->integer('order_no')->default(0);
            $table->unsignedBigInteger('member_category_id');
            $table->foreign('member_category_id')->references('id')->on('member_categories');    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('member_types');
    }
};
