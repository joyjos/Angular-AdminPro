import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Modelos
import { Usuario } from '../../models/usuario.model';

//Servicios
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario:Usuario;

  constructor(private usuarioService:UsuarioService, private router:Router) {
    this.usuario = usuarioService.usuario;
    console.log(this.usuario);
   }

  ngOnInit(): void {
  }

  //========================
  //Método para el logout
  //========================
  logout(){
    this.usuarioService.logout();
  }

  //=================================
  //Método para la búsqueda global
  //=================================
  buscar(termino:string){
    console.log(termino);
    this.router.navigateByUrl('/dashboard/buscar/'+termino);
  }

}
