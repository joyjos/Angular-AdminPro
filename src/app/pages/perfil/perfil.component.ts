import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Sweetalert 2
import Swal from 'sweetalert2';

//Modelos
import { Usuario } from 'src/app/models/usuario.model';

//Servicios
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public form!:FormGroup;
  public usuario:Usuario;
  public imagenSubir!:File;
  public imgTemp:any=null;

  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private fileUploadService:FileUploadService) {
    this.usuario=usuarioService.usuario;
  }

  ngOnInit(): void {
    this.form=this.fb.group({
      nombre:[this.usuario.nombre, Validators.required],
      email:[this.usuario.email, [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]]
    });
  }

  actualizarPerfil(){
    console.log(this.form.value);
    this.usuarioService.actualizarUsuario(this.form.value)
      .subscribe(()=>{
        //console.log(resp);
        const{ nombre, email }=this.form.value;
        this.usuario.nombre=nombre;
        this.usuario.email=email;

        Swal.fire('Guardado', 'Cambios guardados', 'success');
      }, (err)=>{
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  cambiarImagen(event:any){
    var file:File;
    file=event.target.files[0];
    console.log(file);
    this.imagenSubir=file;

    if ( !file ) { 
      this.imgTemp = null;
    }else{

      const reader = new FileReader();
      reader.readAsDataURL( file );

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }

    }

  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .subscribe(resp=>{
        console.log(resp);
        //const{nombreArchivo}=this.form.value;
        //this.usuario.img=nombreArchivo;

        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }, (err)=>{
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        console.log(err);
      });
  }

}
