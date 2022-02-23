import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

//Modelos
import { Usuario } from '../models/usuario.model';

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

  public usuario!:Usuario;

  constructor(private http:HttpClient, private router:Router) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  //===============================
  //Método para validar el token
  //===============================
  validarToken():Observable<boolean> {

    return this.http.get(base_url+'/login/renew', this.headers)
    .pipe(
      tap((resp:any)=>{
        console.log(resp);
        const{ nombre, email, password="", img, role, google, uid} = resp.usuario;
        this.usuario = new Usuario( nombre, email, password, img, role, google, uid );
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

  //====================================
  //Método para actualizar un usuario
  //====================================
  actualizarUsuario(formData:{nombre:string, email:string, role:any}){

    formData = {
      ...formData,
      role: this.usuario.role
    };

    return this.http.put(base_url+'/usuarios/'+this.uid, formData, this.headers);
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

  //==================================
  //Método para cargar los usuarios
  //==================================
  cargarUsuarios(desde:number=0){
    return this.http.get(base_url+'/usuarios?desde='+desde, this.headers)
      .pipe(
        map((resp:any)=>{
          const usuarios=resp.usuarios.map(
            (user:any) => new Usuario(user.nombre, user.email, '', user.img, user.role, user.google, user.uid)
          );

          return {
            total: resp.total,
            usuarios
          };
        })
      );
  }

  //==================================
  //Método para eliminar un usuario
  //==================================
  eliminarUsuario(usuario:Usuario){
    return this.http.delete(base_url+'/usuarios/'+usuario.uid, this.headers);
  }

  //===============================================
  //Método para actualizar el role de un usuario
  //===============================================
  actualizarRole(usuario:Usuario){

    return this.http.put(base_url+'/usuarios/'+this.uid, usuario, this.headers);
  }

}
