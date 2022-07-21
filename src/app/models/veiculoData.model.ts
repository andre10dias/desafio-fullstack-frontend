export interface VeiculosData extends Array<VeiculoData> {}

export interface VeiculoData {
  id: number | string
  vin: string
  odometro: number | string
  pressao_pneus: string
  status_veiculo: string
  status_bateria: string
  nivel_combustivel: number | string
  latitude: number | string
  longitude: number | string
}

export interface VeiculosDataAPI {
  vehicles: VeiculosData;
}
