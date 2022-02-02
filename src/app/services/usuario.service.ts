import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

//Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

//Enviroment
import { environment } from '../../environments/environment';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private router:Router) { }

  //===============================
  //Método para validar el token
  //===============================
  validarToken():Observable<boolean> {
    const token=localStorage.getItem('token') || '';

    return this.http.get(base_url+'/login/renew', {
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token);
      }),
      map(resp=>true),
      catchError(error=>of(false))
    );
  }

  //===============================
  //Método para crear un usuario
  //===============================
  crearUsuario(formData:RegisterForm){
    return this.http.post(base_url+'/usuarios', formData)
      .pipe(tap((resp:any)=>{
        localStorage.setItem('token', resp.token);
      }));
  }

  //=======================
  //Método para el login
  //=======================
  login(formData:LoginForm){
    return this.http.post(base_url+'/login', formData)
      .pipe(tap((resp:any)=>{
        localStorage.setItem('token', resp.token);
      }));
  }

  //========================
  //Método para el logout
  //========================
  logout(){

    //Elimino el token en el Local Storage
    localStorage.removeItem('token');

    //Redirecciono al login
    this.router.navigateByUrl('/login');
  }
}
