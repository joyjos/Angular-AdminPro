import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Modelos
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

//Servicios
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios:Usuario[]=[];
  public hospitales:Hospital[]=[];
  public medicos:Medico[]=[];

  constructor(private activatedRouter:ActivatedRoute, private busquedasService:BusquedasService) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(({termino})=>{
      console.log(termino);
      this.busquedaGlobal(termino);
    });

  }

  //=================================
  //Método para la búsqueda global
  //=================================
  busquedaGlobal(termino:string){
    this.busquedasService.busquedaGlobal(termino)
      .subscribe((resp:any)=>{
        console.log(resp);
        this.usuarios=resp.usuarios;
        this.hospitales=resp.hospitales;
        this.medicos=resp.medicos;
      });
  }

}
