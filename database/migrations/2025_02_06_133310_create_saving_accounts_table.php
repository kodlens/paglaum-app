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
        Schema::create('saving_accounts', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')
                ->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('account_no', 100)->nullable()
                ->unique();

            $table->string('account_name', 100)->nullable();
            $table->string('account_type', 30)->nullable();
            $table->double('balance')->default(0);
            $table->double('interest_rate')->default(0);

            $table->tinyInteger('is_approved')->default(1);
            $table->tinyInteger('is_bm_approved')->default(0);
            $table->tinyInteger('is_do_approved')->default(0);
            
            $table->tinyInteger('is_active')->default(1);
            $table->dateTime('opened_at')->nullable();
            $table->dateTime('closed_at')->nullable();
            $table->tinyInteger('default_account')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saving_accounts');
    }
};
