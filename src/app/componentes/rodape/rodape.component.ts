import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, distinctUntilChanged, filter, switchMap, tap, pluck } from 'rxjs/operators';
import { ActionEnum } from 'src/app/enums/action.enum';
import { UtilService } from 'src/app/services/util/util.service';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css'],
})
export class RodapeComponent implements OnInit {

  codigoInput = new FormControl();
  allVeiculosData$ = this.veiculoService.getAllVeiculoData();
  actionEnum = ActionEnum;
  action!: string; 

  filtroInput$ = this.codigoInput.valueChanges.pipe(
    tap(() =>  {
      this.utilService.limparTela('.cols');
      this.utilService.limparTela('.data');
    }),
    filter((inputValue) =>
      inputValue.length >= 3 || !inputValue.length
    ),
    distinctUntilChanged(),
    switchMap((inputValue) =>
      this.veiculoService.getVeiculoData(inputValue)
    ),
    filter((s: any) => s.length == 1),
    map((resp: any) => resp),
  );

  constructor(
    private veiculoService: VeiculoService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.inputDefault(), 100);
  }

  inputDefault() {
    this.allVeiculosData$.forEach((e: any) => {

      //Pega um item aleatório para exibir na tela
      let random = this.utilService.getRandomNum(e.length);

      e.forEach((element: any, index: any) => {
        let input = document.querySelector('#inputDefault');
        let inputHidden = document.querySelector('#id');
        let details = [];

        if (index == random) {
          (inputHidden as HTMLInputElement).value = element.id;
          (input as HTMLInputElement).value = element.vin;
          details.push(element.odometro);
          details.push(element.nivel_combustivel);
          details.push(element.status_veiculo);
          details.push(element.latitude);
          details.push(element.longitude);
        }

        let tds = document.querySelectorAll('.data');
        let i = 0;

        details.forEach(data => {
          tds[i].innerHTML = data;
          i++;
        });
      });
    });
  }

  openModal(e: Event, action: string): void {
    e.preventDefault();
    let modal = document.querySelector('#staticBackdrop');
    let form = document.querySelector('#dataVehicleForm');
    let alert = document.querySelector('.alert');
    let btn = document.querySelector('#btnSubmit');
    this.veiculoService.actionEmitter(action);

    if (alert) {
      alert.innerHTML = '';
      alert.classList.remove('alert-success');
      alert.classList.remove('alert-danger');
    }

    if (action == ActionEnum.CREATE) {
      this.utilService.resetForm(form);

      if (btn) {
        btn.textContent = '';
        btn.textContent = 'Salvar';
      }
    }

    if (action == ActionEnum.EDIT) {
      this.getDataVehicle(form);

      if (btn) {
        btn.textContent = '';
        btn.textContent = 'Editar';
      }
    }

    if (modal) {
      modal.classList.add('show-modal');
      modal.classList.remove('hide-modal');
    }
  }

  getDataVehicle(form: any) {
    let input = document.querySelector('#inputDefault');
    let vin = (input as HTMLInputElement).value;
    
    this.veiculoService.getVeiculoData(vin).subscribe({
      next: (resp) => {
        resp = resp[0];
        if (form) {
          form.id.value = resp.id;
          form.vin.value = resp.vin
          form.odometro.value = resp.odometro
          form.pressao_pneus.value = resp.pressao_pneus
          form.status_veiculo.value = resp.status_veiculo
          form.status_bateria.value = resp.status_bateria
          form.nivel_combustivel.value = resp.nivel_combustivel
          form.latitude.value = resp.latitude
          form.longitude.value = resp.longitude
        }
      },
      error: (error) => {
        console.log('error: ', error)
      }
    });
  }


}
