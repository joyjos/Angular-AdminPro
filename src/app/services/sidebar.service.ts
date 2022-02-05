import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  //Creo un array de objetos
  menu:any[]=[
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-bullseye',
      submenu: [
        {titulo: 'Main', url: '/'},
        {titulo: 'ProgressBar', url: 'progress'},
        {titulo: 'Gráficas', url: 'grafica1'}
      ]
    }
  ];

  constructor() { }
}
