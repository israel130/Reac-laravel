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
        Schema::create('shope', function (Blueprint $table) {
            $table->id();
            $table->string('id_user')->nullable();
            $table->string('name_user')->nullable();
            $table->string('prenda')->nullable();
            $table->string('Precio')->nullable();
            $table->string('Talla')->nullable();
            $table->string('Color')->nullable();
            $table->string('Tela')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shope');
    }
};
