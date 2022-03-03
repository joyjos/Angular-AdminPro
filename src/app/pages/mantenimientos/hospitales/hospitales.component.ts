import { Component, OnInit } from '@angular/core';

//Servicios
import { HospitalService } from '../../../services/hospital.service';
import { BusquedasService } from '../../../services/busquedas.service';

//Modelos
import { Hospital } from '../../../models/hospital.model';

//Sweetalert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales:Hospital[]=[];
  public hospitalesTemp:Hospital[]=[];
  public cargando:boolean=true;

  constructor(private hospitalService:HospitalService, private busquedasService:BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales(){
    this.cargando=true;
    this.hospitalService.cargarHospitales()
      .subscribe((resp:any)=>{
        console.log(resp);
        this.hospitales=resp;
        this.hospitalesTemp=resp;
        this.cargando=false;
      });
  }

  buscar( termino: string ) {
 
    if ( termino.length === 0 ) {
      return this.hospitales = this.hospitalesTemp;
    }
 
    this.busquedasService.buscar( 'hospitales', termino )
        .subscribe( resp => {
 
          this.hospitales = resp as Hospital[];
 
        });

    return;
  }

  actualizarHospital(hospital:Hospital){
    console.log(hospital);
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(resp=>{
        console.log(resp);
        Swal.fire('Actualizado', hospital.nombre, 'success');
      }, error=>{
        console.log(error.status);
        Swal.fire('Error al actualizar', error.error.mensaje, 'error');
      });
  }

  eliminarHospital(hospital:Hospital){
    
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Estás a punto de borrar a '+hospital.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        
        this.hospitalService.eliminarHospital( hospital._id )
          .subscribe( resp => {
            
            this.cargarHospitales();
            Swal.fire(
              'Hospital borrado',
              hospital.nombre+' fue eliminado correctamente',
              'success'
            );
            
          });

      }
    });
  }

  async abrirSweetalert(){
    const { value = '' } = await Swal.fire({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: 'Introduce el nombre del hospital',
      showCancelButton: true,
      inputPlaceholder: 'Nombre del hospital'
    })
    
    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value)
        .subscribe((resp:any)=>{
          console.log(resp);
          this.hospitales.push(resp.hospital);
        });
    }
  }

}
