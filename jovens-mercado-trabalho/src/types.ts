export interface Filters {
  faixaEtaria: string;
  genero: string;
  raca: string;
  regiao: string;
  escolaridade: string;
  tipoEmprego: string;
}

export interface KPIData {
  desempregoJovem: number;
  desempregoNacional: number;
  ocupacao: number;
  informalidade: number;
  nemNem: number;
  ensinoSuperior: number;
}

export interface SerieAnual {
  ano: number;
  desemprego: number;
  ocupacao: number;
  informalidade: number;
}

export interface OcupacaoPorEscolaridade {
  escolaridade: string;
  taxa: number;
}

export interface HeatmapData {
  escolaridade: string;
  tipo: string;
  valor: number;
}

export interface FormalInformalFaixa {
  faixa: string;
  formal: number;
  informal: number;
}

export interface DesigualdadeRaca {
  raca: string;
  desemprego: number;
}

export interface DesigualdadeGenero {
  genero: string;
  desemprego: number;
}

export interface RegiaoDados {
  regiao: string;
  sigla: string;
  desemprego: number;
}

export interface NemNemData {
  categoria: string;
  masculino: number;
  feminino: number;
}

export interface ModaData {
  tipo: string;
  formal: number;
  informal: number;
  rendaMedia: number;
}

export interface ModaSerieAnual {
  ano: number;
  empregos: number;
  informalidade: number;
}

export interface ModaGeneroRaca {
  categoria: string;
  percentual: number;
  rendaMedia: number;
}

export interface ModaEscolaridade {
  escolaridade: string;
  percentual: number;
  rendaMedia: number;
}

export interface ModaFaixaEtaria {
  faixa: string;
  formal: number;
  informal: number;
  rendaMedia: number;
}

export interface ModaRegiao {
  regiao: string;
  empregos: number;
  informalidade: number;
  rendaMedia: number;
}

export interface ModaFuncao {
  funcao: string;
  jovens: number;
  rendaMedia: number;
  informalidade: number;
}

export interface DashboardData {
  kpis: KPIData;
  serieAnual: SerieAnual[];
  ocupacaoPorEscolaridade: OcupacaoPorEscolaridade[];
  heatmap: HeatmapData[];
  formalInformalFaixa: FormalInformalFaixa[];
  desigualdadeRaca: DesigualdadeRaca[];
  desigualdadeGenero: DesigualdadeGenero[];
  regioes: RegiaoDados[];
  nemNem: NemNemData[];
  moda: ModaData[];
  modaSerie: ModaSerieAnual[];
  modaGenero: ModaGeneroRaca[];
  modaEscolaridade: ModaEscolaridade[];
  modaFaixaEtaria: ModaFaixaEtaria[];
  modaRegiao: ModaRegiao[];
  modaFuncoes: ModaFuncao[];
}
