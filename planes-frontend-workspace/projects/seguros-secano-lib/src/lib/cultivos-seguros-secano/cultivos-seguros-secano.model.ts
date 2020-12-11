export interface CultivoSegurosSecano {
  cultivoId: string;
  cultivoNombre: string;
  cultivoEstacionId: string;
  cultivoCicloId: string[];
}

export interface CultivosSegurosSecanoQueryResults {
  success: boolean;
  error: Error;
  cultivos: CultivoSegurosSecano[];
}

export function createBaseCultivoSegurosSecano(
  cultivoId: string,
  cultivoNombre: string,
  cultivoEstacionId: string,
  cultivoCicloId: string []
): CultivoSegurosSecano {
  return {
    cultivoId,
    cultivoNombre,
    cultivoEstacionId,
    cultivoCicloId
  };
}
