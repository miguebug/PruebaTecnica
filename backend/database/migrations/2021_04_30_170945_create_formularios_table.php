<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormulariosTable extends Migration
{
	/**
	* Run the migrations.
	*
	* @return void
	*/
	public function up()
	{
		Schema::create('formularios', function (Blueprint $table) {
			$table->id();
			$table->string('correo');
			$table->unsignedBigInteger('municipio_id');
			$table->timestamps();
		});
		Schema::table('formularios', function (Blueprint $table) {
			$table->foreign('municipio_id')->references('id')->on('municipios');
		});
		
	}
	
	/**
	* Reverse the migrations.
	*
	* @return void
	*/
	public function down()
	{
		Schema::dropIfExists('formularios');
	}
}
