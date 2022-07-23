import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { VeiculoEnum } from '../enums/veiculo.enum';
import { Veiculos } from '../models/veiculo.model';
import { UtilService } from '../services/util/util.service';
import { VeiculoService } from '../services/veiculo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  veiculoSelect = new FormControl();
  source!: string;
  alt!: string;
  random!: number;
  dataConnected: (string | number)[][] = [];
  dataSoftUpdate: (string | number)[][] = [];

  dataChart$ = this.veiculoService.getAllVeiculos();

  allVeiculos$ = this.veiculoService.getAllVeiculos().pipe(
    tap(resp => {
      this.random = this.utilService.getRandomNum(resp.length);
    }),
  );

  filtro$ = this.veiculoSelect.valueChanges.pipe(
    filter((veiculoSelecionado) =>
      veiculoSelecionado.length > 1 || !veiculoSelecionado.length
    ),
    distinctUntilChanged(),
    switchMap((veiculoSelecionado) =>
      this.veiculoService.getVeiculos(veiculoSelecionado)
    ),
    tap((resp: Veiculos) => {
      let selecao = '';
      this.alt = '';

      this.utilService.limparTela('.fields');
      this.utilService.limparTela('.middle-content');
      
      if (resp.length == 1) {
        const vehicle = resp[0];
        selecao = vehicle.modelo

        let totalVendas = +vehicle.total_vendas - +vehicle.conectado;

        this.dataConnected = [
          ['Total de vendas', totalVendas],
          ['Conectados', +vehicle.conectado],
        ];

        totalVendas = +vehicle.total_vendas - +vehicle.atualizacao_software;

        this.dataSoftUpdate = [
          ['Total de vendas', totalVendas],
          ['Update software', +vehicle.atualizacao_software],
        ];
      }
      
      switch (selecao) {
          case VeiculoEnum.RANGER:
            this.source = 'assets/img/ranger.png';
            this.alt = `Imagem FORD Ranger`;
            break;
  
          case VeiculoEnum.MUSTANG:
            this.source = 'assets/img/mustang.png';
            this.alt = `Imagem FORD Mustang`;
            break;
  
          case VeiculoEnum.TERRITORY:
            this.source = 'assets/img/territory.png';
            this.alt = `Imagem FORD Territory`;
            break;
  
          case VeiculoEnum.BRONCO_SPORT:
            this.source = 'assets/img/broncosport.png';
            this.alt = `Imagem FORD Bronco Sport`;
            break;
          
          case VeiculoEnum.MAVERICK:
            this.source = 'assets/img/maverick.png';
            this.alt = `Imagem FORD Maverick 1975`;
            break;
  
          default:
            this.source = 'assets/img/noImage.png';
            this.alt = 'Sem imagem';
            break;
        }
      
    }),
    filter((s: any) => s.length == 1),
    map((resp: any) => resp),
  );

  constructor(
    private veiculoService: VeiculoService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.comboDefault(), 100);
  }

  comboDefault() {
    this.allVeiculos$.forEach((e)=> {

      //Pega um item aleatório para exibir na tela
      //let random = this.utilService.getRandomNum(e.length);

      e.forEach((element: any, index: any) => {
        let select = document.querySelector('#comboVeiculo');
        let option = document.createElement('option');
        option.value = element.modelo;
        option.text = element.modelo;

        let details = [];
        details.push(element.total_vendas.toString());
        details.push(element.conectado.toString());
        details.push(element.atualizacao_software.toString());

        if (index == this.random) {
          option.selected = true;
          this.cardDefault(details);

          let img = element.modelo.toLowerCase().replace(/ /g, "");
          this.source = `assets/img/${img}.png`;
          this.alt = `Imagem FORD ${img}`;
        }

        select?.appendChild(option);
      });
    });
  }

  cardDefault(values: string[]) {
    let p = document.querySelectorAll('.fields-default');
    let i = 0;

    p.forEach(e => {
      e.textContent = values[i];
      i++;
    });
  }

}
