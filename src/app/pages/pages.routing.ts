import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PerfilComponent } from './perfil/perfil.component';

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
        { path:'perfil', component:PerfilComponent, data:{titulo:'Perfil'} }
      ]
    }
];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }