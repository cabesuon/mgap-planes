export interface UnidadManejoSegurosSecano {
  unidadId: string;
  unidadNombre: string;

  empresaId: string;

  cultivoId: string;
  cicloId: string;

  cultivoAntecesorId: string;

  aseguradoraId: string;
  polizaId: string;
  contratoSeguroZPId: string;

  superficieSembrada: number;
  superficieCosechada: number;
  fechaSiembra: Date;
  fechaCosecha: Date;
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

export interface UnidadesManejosSegurosSecanoQueryResults {
  success: boolean;
  error: { code: number; description: string };
  unidades: UnidadManejoSegurosSecano[];
}

export interface UnidadesManejosSegurosSecanoAddResult {
  success: boolean;
  error: { code: number; description: string };
  unidades: UnidadManejoSegurosSecano;
}

export interface UnidadesManejosSegurosSecanoUpdateResult {
  success: boolean;
  error: { code: number; description: string };
  unidades: UnidadManejoSegurosSecano;
}

export interface UnidadesManejosSegurosSecanoDeleteResult {
  success: boolean;
  error: { code: number; description: string };
  unidadId: string;
}

export function createEmptyUnidadManejoSegurosSecano(): UnidadManejoSegurosSecano {
  return {
    unidadId: null,
    unidadNombre: null,
    empresaId: null,
    cultivoId: null,
    cicloId: null,
    cultivoAntecesorId: null,
    aseguradoraId: null,
    polizaId: null,
    contratoSeguroZPId: null,
    superficieSembrada: null,
    superficieCosechada: null,
    fechaSiembra: null,
    fechaCosecha: null,
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

export function createBaseUnidadManejoSegurosSecano(
  unidadId: string,
  empresaId: string,
  cultivoId: string,
  cicloId: string,
  cultivoAntecesorId: string,
  aseguradoraId: string,
  polizaId: string,
  contratoSeguroZPId: string
) {
  return {
    ...createEmptyUnidadManejoSegurosSecano(),
    unidadId,
    empresaId,
    cultivoId,
    cicloId,
    cultivoAntecesorId,
    aseguradoraId,
    polizaId,
    contratoSeguroZPId
  };
}
