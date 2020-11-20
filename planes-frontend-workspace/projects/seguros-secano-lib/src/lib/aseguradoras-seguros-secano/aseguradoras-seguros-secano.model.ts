export interface AseguradoraSegurosSecano {
  aseguradoraId: string;
  aseguradoraNombre: string;
}

export interface AseguradorasSegurosSecanoQueryResults {
  success: boolean;
  error: Error;
  aseguradoras: AseguradoraSegurosSecano[];
}

export function createBaseAseguradoraSegurosSecano(
  aseguradoraId: string
): AseguradoraSegurosSecano {
  return {
    aseguradoraId,
    aseguradoraNombre: `Ciclo ${aseguradoraId}`
  };
}
