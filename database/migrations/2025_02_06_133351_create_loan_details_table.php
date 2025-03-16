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
        Schema::create('loan_details', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('loan_id')->unsigned();
            $table->foreign('loan_id')->references('id')
                ->on('loans')
                ->onDelete('cascade')
                ->onUpdate('cascade');
                
            $table->integer('month')->default(0)->nullable();

            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')
                ->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            // $table->bigInteger('saving_account_id')->unsigned();
            // $table->foreign('saving_account_id')->references('id')
            //     ->on('saving_accounts')
            //     ->onDelete('cascade')
            //     ->onUpdate('cascade');

            $table->date('due_date')->nullable();
            $table->date('date_paid')->nullable();
            $table->tinyInteger('is_paid')->default(0);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loan_details');
    }
};
