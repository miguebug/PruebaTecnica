<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Municipio;

class Formulario extends Model
{
	protected $fillable = [
		'id',
		'correo',
		'municipio_id'
	];
	
	public function municipio()
	{
		return $this->belongsTo(Municipio::class);
	}
}
