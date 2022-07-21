import { Injectable } from '@angular/core';
import { Veiculo } from 'src/app/models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  limparTela(className: string) {
    let fields = document.querySelectorAll(className);
    fields.forEach(f => {
      f.innerHTML = '';
    });
  }

  resetForm(form: any) {
    for (let i = 0; i < form.length; i++) {
      form[i].value = '';
    }
  }

  ordenaPorNome (vA: Veiculo, vB: Veiculo) {
    return vA.modelo < vB.modelo ? -1 : vA.modelo > vB.modelo ? 1 : 0;
  }

  ordenaPorId (vA: Veiculo, vB: Veiculo) {
    return vA.id < vB.id ? -1 : vA.id > vB.id ? 1 : 0;
  }

  getRandomNum (num: number) {
    return Math.floor(Math.random() * num);
  }

}
