import { Component, OnInit } from '@angular/core';

//Modelos
import { Medico } from 'src/app/models/medico.model';

//Servicios
import { MedicoService } from '../../../services/medico.service';
import { BusquedasService } from '../../../services/busquedas.service';

//Sweetalert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public medicos:Medico[]=[];
  public medicosTemp:Medico[]=[];
  public cargando:boolean=true;

  constructor(private medicoService:MedicoService, private busquedasService:BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this.cargando=true;
    this.medicoService.cargarMedicos()
      .subscribe(resp=>{
        console.log(resp);
        this.medicos=resp;
        this.medicosTemp=resp;
        this.cargando=false;
      });
  }

  buscar( termino: string ) {
 
    if ( termino.length === 0 ) {
      return this.medicos = this.medicosTemp;
    }
 
    this.busquedasService.buscar( 'medicos', termino )
        .subscribe( resp => {
 
          this.medicos = resp as Medico[];
 
        });

    return;
  }

  eliminarMedico(medico:Medico){
    
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Estás a punto de borrar a '+medico.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        
        this.medicoService.eliminarMedico( medico._id )
          .subscribe( resp => {
            
            this.cargarMedicos();
            Swal.fire(
              'Médico borrado',
              medico.nombre+' fue eliminado correctamente',
              'success'
            );
            
          });

      }
    });
  }


}
