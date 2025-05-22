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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('code_reference')->nullable();
            $table->string('name');
            $table->double('quantity', 16, 2)->default(1); // requerido
            $table->double('discount_rate', 5, 2)->default(0); // porcentaje
            $table->double('price', 16, 2)->default(0);
            $table->double('tax_rate', 5, 2)->default(0);

            // Llaves foráneas
            $table->unsignedBigInteger('unit_measure_id');
            $table->unsignedBigInteger('standard_code_id')->nullable(); // si es opcional
            $table->boolean('is_excluded')->default(0); // IVA excluido o no
            $table->unsignedBigInteger('tribute_id');

            $table->timestamps();

            // Relaciones
            $table->foreign('unit_measure_id')->references('id')->on('unit_measures')->onDelete('restrict');
            // $table->foreign('standard_code_id')->references('id')->on('standard_codes')->onDelete('set null');
            $table->foreign('tribute_id')->references('id')->on('product_tributes')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
