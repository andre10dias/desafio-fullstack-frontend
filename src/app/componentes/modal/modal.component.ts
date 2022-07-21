import { Component, OnInit } from '@angular/core';
import { ActionEnum } from 'src/app/enums/action.enum';
import { VeiculoSave } from 'src/app/models/veiculo.save.model';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  timeToClose: number = 1500;
  actionEnum = ActionEnum;
  vin!: string;
  action!: string;
  titulo!: string;
  dataObj: any = {};

  constructor(
    private veiculoService: VeiculoService
  ) { }

  ngOnInit(): void {
    this.veiculoService.emitirEvento.subscribe(
      action => {
        this.action = action;
        this.setTitle();
      }
    );
  }

  setTitle(): void {
    switch (this.action) {
      case ActionEnum.CREATE:
        this.titulo = 'Criar dados do veículo';
        break;
      case ActionEnum.EDIT:
        this.titulo = 'Editar dados do veículo';
        break;  
      case ActionEnum.DELETE:
        this.titulo = 'Excluir dados do veículo';
        this.formDelete();
        break;
    }
  }

  closeModal(): void {
    let modal = document.querySelector('#staticBackdrop');
    if (modal) {
      modal.classList.remove('show-modal');
      modal.classList.add('hide-modal');
    }
  }

  onSubmit(): void {
    let form = document.querySelector('#dataVehicleForm');
    let dataVehicle;

    switch (this.action) {
      case ActionEnum.CREATE:
        dataVehicle = this.getDataForm(form);
        this.create(dataVehicle);
        break;
      case ActionEnum.EDIT:
        dataVehicle = this.getDataForm(form);
        this.edit(dataVehicle);
        break;
      case ActionEnum.DELETE:
        let inputId = document.querySelector('#id');
        let id = (inputId as HTMLInputElement).value; 
        this.delete(id);
        break;
    }
  }

  create(dataVehicle: VeiculoSave): void {
    this.veiculoService.createDataVehicle(dataVehicle).subscribe({
      next: (resp) => {
        this.dataObj = resp;
        this.alertBuild('alert-success', this.dataObj.success);
        setTimeout(() => {this.closeModal()}, this.timeToClose);
      },
      error: (error) => {
        this.dataObj = error;
        if (error.status) {
          this.dataObj = error.error;
        }
        this.alertBuild('alert-danger', this.dataObj.error);
      }
    });
  }

  edit(dataVehicle: VeiculoSave): void {
    this.veiculoService.updateDataVehicle(dataVehicle).subscribe({
      next: (resp) => {
        this.dataObj = resp;
        this.alertBuild('alert-success', this.dataObj.success);
        setTimeout(() => {this.closeModal()}, this.timeToClose);
      },
      error: (error) => {
        this.dataObj = error;
        if (error.status) {
          this.dataObj = error.error;
        }
        this.alertBuild('alert-danger', this.dataObj.error);
      }
    });
  }

  delete(id: string): void {
    this.veiculoService.deleteDataVehicle(id).subscribe({
      next: (resp) => {
        this.dataObj = resp;
        this.alertBuild('alert-success', this.dataObj.success);
        setTimeout(() => {this.closeModal()}, this.timeToClose);
      },
      error: (error) => {
        this.dataObj = error;
        if (error.status) {
          this.dataObj = error.error;
        }
        this.alertBuild('alert-danger', this.dataObj.error);
      }
    });
  }

  alertBuild(classs: string, msg: string): void {
    let alert = document.querySelector('.alert');

    if (alert) {
      alert.innerHTML = '';
      alert.textContent = msg;
      alert.classList.add(classs);
    }
  }

  getDataForm(form: any): VeiculoSave {
    return {
      id: form.id.value,
      vin: form.vin.value,
      odometro: form.odometro.value,
      pressao_pneus: form.pressao_pneus.value,
      status_veiculo: form.status_veiculo.value,
      status_bateria: form.status_bateria.value,
      nivel_combustivel: form.nivel_combustivel.value,
      latitude: form.latitude.value,
      longitude: form.longitude.value,
    }
  }

  formDelete() {
    let btn = document.querySelector('#btnSubmit');
    let input = document.querySelector('#inputDefault');
    this.vin = (input as HTMLInputElement).value; 

    if (btn) {
      btn.textContent = '';
      btn.textContent = 'Excluir';
    }
  }

}
