import { Component, Input, OnInit } from '@angular/core';
import { VeiculosData } from 'src/app/models/veiculoData.model';

@Component({
  selector: 'app-dados-tabela',
  templateUrl: './dados-tabela.component.html',
  styleUrls: ['./dados-tabela.component.css']
})
export class DadosTabelaComponent implements OnInit {

  @Input() veiculosData!: VeiculosData;

  constructor() { }

  ngOnInit(): void {
  }

}
