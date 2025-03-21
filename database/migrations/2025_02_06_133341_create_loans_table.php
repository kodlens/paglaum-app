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
        Schema::create('loans', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')
                ->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

//            $table->unsignedBigInteger('saving_account_id');
//            $table->foreign('saving_account_id')->references('id')
//                ->on('saving_accounts')
//                ->onDelete('cascade')
//                ->onUpdate('cascade');

            $table->text('purpose')->nullable();
            
            $table->string('guarantor')->nullable();

            $table->string('loan_type')->nullable();
            $table->string('loan_subtype')->nullable();

            $table->unsignedBigInteger('loan_type_id')->default(0);
            $table->foreign('loan_type_id')->references('id')
                ->on('loan_types')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->unsignedBigInteger('loan_subtype_id')->default(0);
            $table->foreign('loan_subtype_id')->references('id')
                ->on('loan_subtypes')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->double('principal')->default(0);
            $table->double('interest')->default(0);
            $table->double('terms_month')->default(0);
            
            $table->tinyInteger('is_paid')->default(0);


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
