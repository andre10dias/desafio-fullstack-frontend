import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho.component';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  declarations: [
    CabecalhoComponent
  ],
  imports: [
    CommonModule,
    MenuModule
  ],
  exports: [CabecalhoComponent]
})
export class CabecalhoModule { }
