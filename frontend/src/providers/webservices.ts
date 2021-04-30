import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Webservices {

	public baseurl = 'http://localhost:8088/api';

	constructor(private http: HttpClient) { }
	
	getFormularios(){
		let url = this.baseurl+"/formulario";
		return this.http.get(url);
	}
	getDepartamentos(){
		let url = this.baseurl+"/getDepartamentos";
		return this.http.get(url);
	}
	saveFormulario(body){
		let url = this.baseurl+"/formulario";
		return this.http.post(url,body);
	}
	deleteFormulario(body){
		let url = this.baseurl+"/formulario/"+body.id;
		return this.http.delete(url);
	}
}

