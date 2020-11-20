export interface UnidadManejoSegurosSecano {
  unidadId: string;
  unidadNombre: string;

  empresaId: string,

  cultivoId: string;
  cicloId: string;

  cultivoAntecesorId: string;

  aseguradoraId: string;
  polizaId: string;

  superficieSembrada: number;
  superficieCocechada: number;
  fechaSiembra: Date;
  fechaCocecha: Date;
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
  componentes: UnidadManejoSegurosSecano[];
}

export interface UnidadesManejosSegurosSecanoAddResult {
  success: boolean;
  error: { code: number; description: string };
  componentes: UnidadManejoSegurosSecano;
}

export interface UnidadesManejosSegurosSecanoUpdateResult {
  success: boolean;
  error: { code: number; description: string };
  componentes: UnidadManejoSegurosSecano;
}

export interface UnidadesManejosSegurosSecanoDeleteResult {
  success: boolean;
  error: { code: number; description: string };
  componenteId: string;
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
    superficieSembrada: null,
    superficieCocechada: null,
    fechaSiembra: null,
    fechaCocecha: null,
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
  polizaId: string
) {
  return {
    ...createEmptyUnidadManejoSegurosSecano(),
    unidadId,
    empresaId,
    cultivoId,
    cicloId,
    cultivoAntecesorId,
    aseguradoraId,
    polizaId
  };
}
