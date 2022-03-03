import { Component, OnInit } from '@angular/core';

//Servicios
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';

//Modelos
import { Usuario } from 'src/app/models/usuario.model';

//Sweetalert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  
  public totalUsuarios=0;
  public usuarios:Usuario[]=[];
  public usuariosTemp:Usuario[]=[];
  public desde:number=0;
  public cargando:boolean=true;

  constructor(private usuarioService:UsuarioService, private busquedasService:BusquedasService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando=true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp:any)=>{
        console.log(resp);
        this.usuarios=resp.usuarios;
        this.usuariosTemp=resp.usuarios;
        this.totalUsuarios=resp.total;
        this.cargando=false;
      });
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor; 
    }

    this.cargarUsuarios();
  }

 buscar( termino: string ) {
 
    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }
 
    this.busquedasService.buscar( 'usuarios', termino )
        .subscribe( resp => {
 
          this.usuarios = resp as Usuario[];
 
        });

    return;
  }

  eliminarUsuario(usuario:Usuario){
    console.log(usuario);

    if ( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire('Error', 'No puede borrarse a sí mismo', 'error');
    }

    Swal.fire({
      title: 'Estás seguro?',
      text: 'Estás a punto de borrar a '+usuario.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, bórralo'
    }).then((result) => {
      if (result.value) {
        
        this.usuarioService.eliminarUsuario( usuario )
          .subscribe( resp => {
            
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              usuario.nombre+' fue eliminado correctamente',
              'success'
            );
            
          });

      }
    });

    return;

  }

  cambiarRole(usuario:Usuario){
    console.log(usuario);
    this.usuarioService.actualizarRole(usuario)
      .subscribe(resp=>{
        console.log(resp);
      });
  }

}
