import { Component, OnInit } from '@angular/core';
import { Webservices } from 'src/providers/webservices';
declare var $: any;
declare interface DataTable {
	headerRow: string[];
	footerRow: string[];
	dataRows: string[][];
}
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Prueba';
	public tableObject:any;
	public dataTable: DataTable;
	public departamentos: any;
	public botonGuardar:string;
	public error: string;
	public municipios: [];
	public formulario_eliminar_id: number;
	public formulario:{
		correo:string,
		departamento:number,
		municipio:number
		
	};
	constructor(private webservices: Webservices) {
		this.dataTable = {
			headerRow: [],
			footerRow: [],
			dataRows: []
		};
		this.dataTable.dataRows = <any> [{correo:"Cargando..."}];
		this.formulario = {
			correo:"",
			departamento:null,
			municipio:null
		};
		this.error = "";
		this.botonGuardar = "Guardar";
		this.formulario_eliminar_id = null;
		this.tableObject = null;
	}
	
	
	ngOnInit() {
		this.cargarDepartamentosMunicipios();
		this.cargarFormularios();
		
	}
	cargarDepartamentosMunicipios(){
		let self = this;
		this.webservices.getDepartamentos().subscribe((data)=>{
			self.departamentos = data;
		});
	}
	cargarFormularios(){
		let self = this;
		if (self.tableObject != null) {
			self.tableObject.destroy();
		}
		this.webservices.getFormularios().subscribe((data)=>{
			let datos = <any> data;
			
			if	((datos).length > 0)
			self.dataTable.dataRows = datos;
			else
			this.dataTable.dataRows = <any> [{correo:"Sin Datos para mostrar"}];
			setTimeout(function () {
				self.tableObject = $('#table-info').DataTable({
					"pageLength": 2,
					"lengthMenu": [[2, 4, -1], [2, 4, "All"]],
					"order": false,
					"ordering": false,
					language: {
						search: "_INPUT_",
						lengthMenu: "Mostrar _MENU_",
						zeroRecords: "Sin Datos para Mostar",
						info: "Pagina _PAGE_ de _PAGES_",
						infoEmpty: "Ningún registro disponible",
						infoFiltered: "(filtrados de un total de _MAX_)",
						paginate: {
							"first": "Primero",
							"previous": "Anterior",
							"next": "Siguiente",
							"last": "Último"
						}
					}
				});
			}, 100); 
		})
	}
	onChange(element){
		if(element.selectedIndex != 0)
		this.municipios = this.departamentos[element[element.selectedIndex].dataset.value].municipios;
		else
		this.municipios = null;
	}
	guardar(){
		let self = this;
		this.error = "";
		let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
		let email_valido = this.formulario.correo.match(regex);

		if (this.formulario.correo == "")
		this.error = "Debe llenar el campo de correo antes de continuar.";
		else if (!email_valido)
		this.error = "Debe digitar un correo electronico valido.";
		else if (this.formulario.correo.split("@")[1] != "minambiente.gov.co")
		this.error = "El correo electronico debe pertenecer al ministerio de medio ambiente.";
		else if (this.formulario.departamento == null)
			this.error = "Debe seleccionar un departamento antes de continuar.";
		else if (this.formulario.municipio == null) 
				this.error = "Debe seleccionar un municipio antes de continuar."; 
		else{
			this.botonGuardar = "Guardando...";
			this.error = "";
			this.webservices.saveFormulario(this.formulario).subscribe((data)=>{
				let datos = <any> data;
				if ( datos.code == 200){
					self.formulario = {
						correo:"",
						departamento:null,
						municipio:null
					};
					this.tableObject.rows().remove().draw();
					self.cargarFormularios();
				}
				
				self.botonGuardar = "Guardar";
				
			});			
		}
	}
	eliminarFormulario(){
		this.webservices.deleteFormulario({id: this.formulario_eliminar_id}).subscribe((data)=>{
			let datos = <any> data;
			if ( datos.code == 200){
				this.tableObject.rows().remove().draw();
				this.cargarFormularios();
			}
			
		});	
	}
}
