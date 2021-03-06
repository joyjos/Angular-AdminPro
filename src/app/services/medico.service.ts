import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//Enviroment
import { environment } from '../../environments/environment';

//Modelos
import { Medico } from '../models/medico.model';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  //=================================
  //Método para cargar los médicos
  //=================================
  cargarMedicos(){
    return this.http.get(base_url+'/medicos', this.headers)
      .pipe(
        map((resp:any)=>resp.medicos)
      )
  }

  //===============================
  //Método para cargar un médico
  //===============================
  cargarMedico(id:string){
    return this.http.get(base_url+'/medicos/'+id, this.headers);
  }

  //==============================
  //Método para crear un médico
  //===============================
  crearMedico(medico:{nombre:string, hospital:string}){
    return this.http.post(base_url+'/medicos', medico, this.headers);
  }

  //===================================
  //Método para actualizar un médico
  //====================================
  actualizarMedico(medico:Medico){
    return this.http.put(base_url+'/medicos/'+medico._id, medico, this.headers);
  }

  //=================================
  //Método para eliminar un médico
  //=================================
  eliminarMedico(_id:string){
    return this.http.delete(base_url+'/medicos/'+_id, this.headers);
  }

}
