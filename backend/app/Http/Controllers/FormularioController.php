<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Formulario;
use App\Models\Departamento;

class FormularioController extends Controller
{
	/**
	* Display a listing of the resource.
	*
	* @return \Illuminate\Http\Response
	*/
	public function index()
	{
		$formularios = Formulario::with("municipio.departamento")->get();
		return response()->json($formularios, 200);
	}
	public function getDepartamentos()
	{
		$departamentos = Departamento::with("municipios")->get();
		return response()->json($departamentos, 200);
	}
	
	/**
	* Store a newly created resource in storage.
	*
	* @param  \Illuminate\Http\Request  $request
	* @return \Illuminate\Http\Response
	*/
	public function store(Request $request)
	{
		$formulario = new Formulario;
		$formulario->correo = $request->correo;
		$formulario->municipio_id = $request->municipio;
		if (!$formulario->save()) {
			return response()->json(['errors' => 'Ha ocurrido un error y no se pudo almacenar el formulario.'], 404);
	  	}
	  	else
		return response()->json(
			[
				 'success' => 'Formulario creado',
				 'code' => 200
			]
	  );
	}
	
	/**
	* Display the specified resource.
	*
	* @param  int  $id
	* @return \Illuminate\Http\Response
	*/
	public function show($id)
	{
		//
	}
	
	/**
	* Update the specified resource in storage.
	*
	* @param  \Illuminate\Http\Request  $request
	* @param  int  $id
	* @return \Illuminate\Http\Response
	*/
	public function update(Request $request, $id)
	{
		//
	}
	
	/**
	* Remove the specified resource from storage.
	*
	* @param  int  $id
	* @return \Illuminate\Http\Response
	*/
	public function destroy($id)
	{
		if (!Formulario::where('id', $id)->delete()) {
			return response()->json(['errors' => 'Ha ocurrido un error y no se pudo eliminar el formulario.'], 404);
	  	}
	  	else
		return response()->json(
			[
				 'success' => 'Formulario Eliminado',
				 'code' => 200
			]
	  );
	}
}
