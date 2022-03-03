import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Pipes
import { ImagenPipe } from './imagen.pipe';

@NgModule({
  declarations: [ImagenPipe],
  exports: [ImagenPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
