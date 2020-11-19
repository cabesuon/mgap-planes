export interface ComponenteProductivoSegurosSecano {
  componenteId: string;
  chacraId: string;

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

export interface ComponentesProductivosSegurosSecanoQueryResults {
  success: boolean;
  error: { code: number; description: string };
  componentes: ComponenteProductivoSegurosSecano[];
}

export interface ComponentesProductivosSegurosSecanoAddResult {
  success: boolean;
  error: { code: number; description: string };
  componentes: ComponenteProductivoSegurosSecano;
}

export interface ComponentesProductivosSegurosSecanoUpdateResult {
  success: boolean;
  error: { code: number; description: string };
  componentes: ComponenteProductivoSegurosSecano;
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

export function createBaseComponenteProductivoSegurosSecano(
  id: string,
  chacraId: string,
  cultivoId: string,
  cicloId: string,
  cultivoAntecesorId: string,
  aseguradoraId: string,
  polizaId: string
) {
  return {
    ...createEmptyComponenteProductivoSegurosSecano()
  };
}
