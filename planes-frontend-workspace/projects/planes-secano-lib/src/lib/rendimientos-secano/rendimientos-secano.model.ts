export interface RendimientoSecano {
  rendimientoId: string;
}

export interface RendimientosSecanoQueryResults {
  success: boolean;
  error: Error;
  rendimientos: RendimientoSecano[];
}

export function createBaseRendimientoSecano(
  rendimientoId: string
): RendimientoSecano {
  return {
    rendimientoId
  };
}
