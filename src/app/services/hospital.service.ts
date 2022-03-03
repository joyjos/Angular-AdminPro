import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//Enviroment
import { environment } from '../../environments/environment';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  //====================================
  //Método para cargar los hospitales
  //====================================
  cargarHospitales(){
    return this.http.get(base_url+'/hospitales', this.headers)
      .pipe(
        map((resp:any)=>resp.hospitales)
      )
  }

  //================================
  //Método para crear un hospital
  //================================
  crearHospital(nombre:string){
    return this.http.post(base_url+'/hospitales', {nombre}, this.headers);
  }

  //=====================================
  //Método para actualizar un hospital
  //=====================================
  actualizarHospital(_id:string, nombre:string){
    return this.http.put(base_url+'/hospitales/'+_id, {nombre}, this.headers);
  }
  
  //===================================
  //Método para eliminar un hospital
  //===================================
  eliminarHospital(_id:string){
    return this.http.delete(base_url+'/hospitales/'+_id, this.headers);
  }

}
