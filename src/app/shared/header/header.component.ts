import { Component, OnInit } from '@angular/core';

//Servicios
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  //========================
  //Método para el logout
  //========================
  logout(){
    this.usuarioService.logout();
  }

}
