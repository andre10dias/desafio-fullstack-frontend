import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { VeiculosAPI } from '../models/veiculo.model';
import { VeiculoSave } from '../models/veiculo.save.model';
import { VeiculosDataAPI } from '../models/veiculoData.model';
import { UtilService } from './util/util.service';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  emitirEvento = new EventEmitter<string>();

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) { }

  getAllVeiculos() {
    return this.http.get<VeiculosAPI>(`${API}/vehicle`)
    .pipe(
      pluck('vehicles'),
      map((veiculos) =>
        veiculos.sort((veiculosA, veiculosB) =>
          this.utilService.ordenaPorId(veiculosA, veiculosB)
        )
      ),
    );
  }

  getVeiculos(modelo?: string) {
    const params = modelo ? new HttpParams().append('modelo', modelo) : undefined;

    return this.http
    .get<VeiculosAPI>(`${API}/vehicle`, { params })
    .pipe(
      pluck('vehicles'),
      map((veiculos) =>
        veiculos.sort((veiculosA, veiculosB) =>
          this.utilService.ordenaPorNome(veiculosA, veiculosB)
        )
      ),
    );
  }

  getAllVeiculoData() {
    return this.http.get<VeiculosAPI>(`${API}/vehicleData`)
    .pipe(
      pluck('vehicleData'),
      map((veiculos: any) =>
        veiculos.sort((veiculosA: any, veiculosB: any) =>
          this.utilService.ordenaPorId(veiculosA, veiculosB)
        )
      ),
    );
  }

  getVeiculoData(vin?: string) {
    const params = vin ? new HttpParams().append('vin', vin) : undefined;

    return this.http
    .get<VeiculosDataAPI>(`${API}/vehicleData`, { params })
    .pipe(
      pluck('vehicleData'),
      map((veiculos: any) =>
        veiculos.sort((veiculosA: any, veiculosB: any) =>
          this.utilService.ordenaPorNome(veiculosA, veiculosB)
        )
      ),
    );
  }

  getDataChart(dados: any): Observable<(string | number)[][]> {
    return new Observable(obs => {
      obs.next(dados);
      obs.complete();
    });
  }

  actionEmitter(action: string) {
    this.emitirEvento.emit(action);
  }

  createDataVehicle(vehicle: VeiculoSave) {
    return this.http.post(`${API}/vehicleData`, vehicle);
  }

  updateDataVehicle(vehicle: VeiculoSave) {
    return this.http.put(`${API}/vehicleData`, vehicle);
  }

  deleteDataVehicle(id: string) {
    return this.http.delete(`${API}/vehicleData/${id}`);
  }
  
}
