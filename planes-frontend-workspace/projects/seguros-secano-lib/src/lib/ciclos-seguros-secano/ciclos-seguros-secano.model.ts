export interface CicloSegurosSecano {
  cicloId: string;
  cicloNombre: string;
}

export interface CiclosSegurosSecanoQueryResults {
  success: boolean;
  error: Error;
  ciclos: CicloSegurosSecano[];
}

export function createBaseCicloSegurosSecano(
  cicloId: string
): CicloSegurosSecano {
  return {
    cicloId,
    cicloNombre: `Ciclo ${cicloId}`
  };
}
