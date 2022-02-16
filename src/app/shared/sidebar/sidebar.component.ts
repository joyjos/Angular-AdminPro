import { Component, OnInit } from '@angular/core';

//Servicios
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

//Modelos
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems:any[];
  public usuario:Usuario;

  constructor(private sidebarService:SidebarService, private usuarioService:UsuarioService) {
    this.menuItems=sidebarService.menu;
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
  }

  //========================
  //Método para el logout
  //========================
  logout(){
    this.usuarioService.logout();
  }

}
