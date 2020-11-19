export interface CultivoSegurosSecano {
  cultivoId: string;
  cultivoNombre: string;
}

export interface CultivosSegurosSecanoQueryResults {
  success: boolean;
  error: Error;
  cultivos: CultivoSegurosSecano[];
}

export function createBaseCultivoSegurosSecano(
  cultivoId: string
): CultivoSegurosSecano {
  return {
    cultivoId,
    cultivoNombre: `Cultivo ${cultivoId}`
  };
}
