import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Sweetalert2
import Swal from 'sweetalert2';

//Servicios
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted=false;

  public form=this.fb.group({
    email:[localStorage.getItem('email') || '', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
    password:['', Validators.required],
    remember:[false]
  });

  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.formSubmitted=true;
    console.log(this.form.value);

    //Compruebo que el formulario es válido
    if(this.form.invalid){
      return;
    }

    //Si el formulario es válido, me logueo
    this.usuarioService.login(this.form.value)
      .subscribe(resp=>{
        console.log(resp);

        //Guardo el email en Local Storage
        if(this.form.get('remember')?.value){
          localStorage.setItem('email', this.form.get('email')?.value);
        }else{
          localStorage.removeItem('email');
        }

        //Navego al dashboard
        this.router.navigateByUrl('/dashboard');

      }, (err)=>{
        Swal.fire('Error', 'La cuenta o la contraseña es incorrecta', 'error');
      })
  }

  campoNoValido(campo:string):boolean{
    if(this.form.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

}
