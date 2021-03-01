export interface ComponenteProductivoSegurosSecano {
  componenteId: string;
  chacraId: string;

  cultivoId: string;
  cicloId: string;

  cultivoAntecesorId: string;

  aseguradoraId: string;
  polizaId: string;
  tipoSeguro: string;
  contratoSeguroZPId: string;

  superficieSembrada: number;
  superficieCosechada: number;
  fechaSiembra: Date;
  fechaCosecha: Date;
  porcentajeRiego: number;
  fertilizacionP2O5: number;
  fertilizacionK2O: number;
  fertilizacionN: number;
  fertilizacionS: number;
  analisisSueloPBray: number;
  analisisSueloK: number;
  rendimiento: number;

  zafra: string;
  anio: number;

  fechaCreado: Date;
  fechaModificado: Date;
  fechaEnviado: Date;
}

export interface ComponentesProductivosSegurosSecanoQueryResults {
  success: boolean;
  error: { code: number; description: string };
  componentes: ComponenteProductivoSegurosSecano[];
}

export interface ComponentesProductivosSegurosSecanoAddResult {
  success: boolean;
  error: { code: number; description: string };
  componente: ComponenteProductivoSegurosSecano;
}

export interface ComponentesProductivosSegurosSecanoUpdateResult {
  success: boolean;
  error: { code: number; description: string };
  componente: ComponenteProductivoSegurosSecano[];
}

export interface ComponentesProductivosSegurosSecanoDeleteResult {
  success: boolean;
  error: { code: number; description: string };
  componenteId: string;
}

export function createEmptyComponenteProductivoSegurosSecano(): ComponenteProductivoSegurosSecano {
  return {
    componenteId: null,
    chacraId: null,
    cultivoId: null,
    cicloId: null,
    cultivoAntecesorId: null,
    aseguradoraId: null,
    polizaId: null,
    tipoSeguro: null,
    contratoSeguroZPId: null,
    superficieSembrada: null,
    superficieCosechada: null,
    fechaSiembra: null,
    fechaCosecha: null,
    porcentajeRiego: null,
    fertilizacionP2O5: null,
    fertilizacionK2O: null,
    fertilizacionN: null,
    fertilizacionS: null,
    analisisSueloPBray: null,
    analisisSueloK: null,
    rendimiento: null,
    zafra: null,
    anio: null,
    fechaCreado: null,
    fechaModificado: null,
    fechaEnviado: null
  };
}

export function createBaseComponenteProductivoSegurosSecano(
  componenteId: string,
  chacraId: string,
  cultivoId: string,
  cicloId: string,
  cultivoAntecesorId: string,
  aseguradoraId: string,
  polizaId: string,
  tipoSeguro: string,
  contratoSeguroZPId: string,
  superficieSembrada: number,
  superficieCosechada: number,
  fechaSiembra: Date,
  fechaCosecha: Date,
  porcentajeRiego: number,
  fertilizacionP2O5: number,
  fertilizacionK2O: number,
  fertilizacionN: number,
  fertilizacionS: number,
  analisisSueloPBray: number,
  analisisSueloK: number,
  rendimiento: number,
  zafra: string,
  anio: number,
  fechaCreado: Date,
  fechaModificado: Date,
  fechaEnviado: Date
) {
  return {
    ...createEmptyComponenteProductivoSegurosSecano(),
    componenteId,
    chacraId,
    cultivoId,
    cicloId,
    cultivoAntecesorId,
    aseguradoraId,
    polizaId,
    tipoSeguro,
    contratoSeguroZPId,
    superficieSembrada,
    superficieCosechada,
    fechaSiembra,
    fechaCosecha,
    porcentajeRiego,
    fertilizacionP2O5,
    fertilizacionK2O,
    fertilizacionN,
    fertilizacionS,
    analisisSueloPBray,
    analisisSueloK,
    rendimiento,
    zafra,
    anio,
    fechaCreado,
    fechaModificado,
    fechaEnviado
  };
}

export enum ComponenteContratoSeguroZP {
  TRADICIONAL = 'Tradicional',
  INDICE = 'Índice',
  NO = 'No'
}

export enum ComponenteTipoSeguro {
  TRADICIONAL = 'Tradicional',
  INDICE = 'Índice'  
}
