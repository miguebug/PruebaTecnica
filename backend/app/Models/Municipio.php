<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Departamento;

class Municipio extends Model
{
	protected $fillable = [
		'id',
		'nombre',
		'departamento_id'
	];
	
	public function departamento()
	{
		return $this->belongsTo(Departamento::class);
	}
}
