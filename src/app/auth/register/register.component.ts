import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Sweetalert2
import Swal from 'sweetalert2';

//Servicios
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted=false;

  public form=this.fb.group({
    nombre:['', Validators.required],
    email:['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
    password:['', Validators.required],
    password2:['', Validators.required],
    terms:[false, Validators.requiredTrue]
  }, {
    validators:this.passwordIguales('password', 'password2')
  }as AbstractControlOptions
  );

  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    this.formSubmitted=true;
    console.log(this.form.value);

    //Compruebo que el formulario es válido
    if(this.form.invalid){
      return;
    }

    //Si el formulario es válido, creo el usuario
    this.usuarioService.crearUsuario(this.form.value)
      .subscribe(resp=>{
        console.log('Usuario creado');
        console.log(resp);

        //Navego al dashboard
        this.router.navigateByUrl('/dashboard');

      }, (err)=>{
        Swal.fire('Error', 'Ya existe un usuario con el Email <br><span style="color:#197AAA">'+this.form.value.email+'</span>', 'error');
      });

  }

  campoNoValido(campo:string):boolean{
    if(this.form.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  contrasenasNoValidas(){
    const password=this.form.get('password')?.value;
    const password2=this.form.get('password2')?.value;

    if((password!==password2) && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  aceptaTerminos(){
    return !this.form.get('terms')?.value && this.formSubmitted;
  }

  passwordIguales(pass1:string, pass2:string){

    return(formGroup:AbstractControl)=>{
      const pass1Control=formGroup.get(pass1);
      const pass2Control=formGroup.get(pass2);

      if(pass1Control?.value===pass2Control?.value){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({noEsIgual:true})
      }
    }
  }

}
