<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Municipio;

class Departamento extends Model
{
   protected $fillable = [
		'id',
		'nombre'
	];
	
	public function municipios()
	{
		return $this->hasMany(Municipio::class);
	}
}
