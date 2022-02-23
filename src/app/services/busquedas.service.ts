import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//Enviroment
import { environment } from '../../environments/environment';

//Modelos
import { Usuario } from '../models/usuario.model';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.role, user.google, user.uid )  
    );
  }

  buscar(tipo:'usuarios'|'hospitales'|'medicos', termino:string){
    return this.http.get(base_url+'/todo/coleccion/'+tipo+'/'+termino, this.headers)
      .pipe(
        map((resp:any)=>{
          switch ( tipo ) {
            case 'usuarios':
              return this.transformarUsuarios( resp.resultados )
          
            default:
              return [];
          }
        })
      );
  }
}
