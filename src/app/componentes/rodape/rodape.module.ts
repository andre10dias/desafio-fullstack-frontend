import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RodapeComponent } from './rodape.component';
import { DadosTabelaModule } from '../dados-tabela/dados-tabela.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../modal/modal.module';

@NgModule({
  declarations: [
    RodapeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DadosTabelaModule,
    ModalModule
  ],
  exports: [RodapeComponent]
})
export class RodapeModule { }
