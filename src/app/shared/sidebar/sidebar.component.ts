import { Component, OnInit } from '@angular/core';

//Servicios
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems:any[];

  constructor(private sidebarService:SidebarService, private usuarioService:UsuarioService) {
    this.menuItems=sidebarService.menu;
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
