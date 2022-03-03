import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

//Modelos
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

//Sweetalert2
import Swal from 'sweetalert2';

//Servicios
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public form!:FormGroup;
  public hospitales:Hospital[]=[];
  public hospitalSeleccionado!:Hospital | undefined;
  public medicoSeleccionado!:Medico;

  constructor(private fb:FormBuilder, private hospitalService:HospitalService, private medicoService:MedicoService,
              private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    
    this.form=this.fb.group({
      nombre:['', Validators.required],
      hospital:['', Validators.required]
    });

    this.cargarHospitales();

    this.form.get('hospital')?.valueChanges
      .subscribe(resp=>{
        console.log(resp);
        this.hospitalSeleccionado=this.hospitales.find(hospital=>hospital._id===resp);
        console.log(this.hospitalSeleccionado);
      });

      //Obtengo el id de la url
      this.activatedRoute.params.subscribe(params=>{
        console.log(params);

        //Cargo el médico
        this.cargarMedico(params.id);
      });

      
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe(resp=>{
        console.log(resp);
        this.hospitales=resp;
      });
  }

  guardarMedico(){

    const {nombre}=this.form.value;

    if(this.medicoSeleccionado){
      //Actualizo médico
      const data = {
        ...this.form.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico(data)
        .subscribe(resp=>{
          console.log(resp);
          Swal.fire('Actualizado', nombre+' actualizado correctamente', 'success');
          //Redirecciono a la página de médicos
          this.router.navigateByUrl('/dashboard/medicos');
        });
    }else{
      //Creo un nuevo médico
      console.log(this.form.value);
      
      this.medicoService.crearMedico(this.form.value)
        .subscribe(resp=>{
          console.log(resp);
          Swal.fire('Creado', nombre+' creado correctamente', 'success');
          //Redirecciono a la página de médicos
          this.router.navigateByUrl('/dashboard/medicos');
        });
    }
    
  }

  cargarMedico(id:string){

    if ( id === 'nuevo' ) {
      return;
    }
    
    this.medicoService.cargarMedico(id)
      .pipe(delay(100))
      .subscribe((resp:any)=>{
        console.log(resp);
        //const {nombre, hospital:{_id}}=resp;
        //console.log(nombre, _id);
        this.medicoSeleccionado=resp.medico;
        this.form.setValue({nombre:this.medicoSeleccionado.nombre, hospital:this.medicoSeleccionado.hospital?._id});
      }, error => {
        return this.router.navigateByUrl('/dashboard/medicos');
      });
  }

}
