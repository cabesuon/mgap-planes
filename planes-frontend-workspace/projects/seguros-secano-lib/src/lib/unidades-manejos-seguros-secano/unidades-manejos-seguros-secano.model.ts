export interface UnidadManejoSegurosSecano {
  unidadId: string;
  unidadNombre: string;

  empresaId: string;

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
  fertilizacionP2O5: number;
  fertilizacionK2O: number;
  fertilizacionN: number;
  fertilizacionS: number;
  analisisSueloPBray: number;
  analisisSueloK: number;
  rendimiento: number;

  zafra: number;
  anio: number;

  fechaCreado: Date;
  fechaModificado: Date;
  fechaEnviado: Date;

  estado: number;
  tieneAnalisisSuelo: boolean;
  esAsegurado: boolean;
  fechaBorrado: Date;
}

export interface UnidadesManejosSegurosSecanoQueryResults {
  success: boolean;
  error: { code: number; description: string };
  unidadesManejo: UnidadManejoSegurosSecano[];
}

export interface UnidadesManejosSegurosSecanoAddResult {
  success: boolean;
  error: { code: number; description: string };
  unidadesManejo: UnidadManejoSegurosSecano;
}

export interface UnidadesManejosSegurosSecanoUpdateResult {
  success: boolean;
  error: { code: number; description: string };
  unidadesManejo: UnidadManejoSegurosSecano;
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
    tipoSeguro: null,
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
    fechaEnviado: null,
    estado: null,
    tieneAnalisisSuelo: null,
    esAsegurado: null,
    fechaBorrado: null
  };
}

export function createBaseUnidadManejoSegurosSecano(
  unidadId: string,
  unidadNombre: string,

  empresaId: string,

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
  fertilizacionP2O5: number,
  fertilizacionK2O: number,
  fertilizacionN: number,
  fertilizacionS: number,
  analisisSueloPBray: number,
  analisisSueloK: number,
  rendimiento: number,

  zafra: number,
  anio: number,

  fechaCreado: Date,
  fechaModificado: Date,
  fechaEnviado: Date,

  estado: number,
  tieneAnalisisSuelo: boolean,
  esAsegurado: boolean,
  fechaBorrado: Date,
) {
  return {
    ...createEmptyUnidadManejoSegurosSecano(),
    unidadId,
    unidadNombre,
    empresaId,
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
    fechaEnviado,
    estado,
    tieneAnalisisSuelo,
    esAsegurado,
    fechaBorrado
  };
}
