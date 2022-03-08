import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

//Guards
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
      path:'dashboard', component:PagesComponent,
      canActivate:[AuthGuard],
      children:[
        { path:'', component:DashboardComponent, data:{titulo:'Dashboard'} },
        { path:'progress', component:ProgressComponent, data:{titulo:'ProgressBar'} },
        { path:'grafica1', component:Grafica1Component, data:{titulo:'Grafica 1'} },
        { path:'perfil', component:PerfilComponent, data:{titulo:'Perfil'} },
        { path:'buscar/:termino', component:BusquedaComponent, data:{titulo:'Búsqueda'} },

        //Mantenimientos
        { path:'usuarios', component:UsuariosComponent, data:{titulo:'Usuarios'} },
        { path:'hospitales', component:HospitalesComponent, data:{titulo:'Hospitales'} },
        { path:'medicos', component:MedicosComponent, data:{titulo:'Médicos'} },
        { path:'medico/:id', component:MedicoComponent, data:{titulo:'Médicos'} }
      ]
    }
];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }