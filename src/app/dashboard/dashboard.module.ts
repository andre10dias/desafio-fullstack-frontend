import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CartaoModule } from '../componentes/cartao/cartao.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CabecalhoModule } from '../componentes/cabecalho/cabecalho.module';
import { RodapeModule } from '../componentes/rodape/rodape.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardChartModule } from '../componentes/dashboard-chart/dashboard-chart.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CabecalhoModule,
    ReactiveFormsModule,
    CartaoModule,
    RodapeModule,
    DashboardChartModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
