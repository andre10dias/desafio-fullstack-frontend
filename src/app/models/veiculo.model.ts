export interface Veiculos extends Array<Veiculo> {}

export interface Veiculo {
  id: number | string
  modelo: string
  total_vendas: number | string
  conectado: number | string
  atualizacao_software: number | string
}

export interface VeiculosAPI {
  vehicles: Veiculos;
}
