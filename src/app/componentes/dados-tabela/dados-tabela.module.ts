import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosTabelaComponent } from './dados-tabela.component';



@NgModule({
  declarations: [
    DadosTabelaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [DadosTabelaComponent]
})
export class DadosTabelaModule { }
