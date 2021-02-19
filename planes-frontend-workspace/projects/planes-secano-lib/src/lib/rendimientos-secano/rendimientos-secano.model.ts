export interface RendimientoSecano {
  rendimientoId: string;
  rendimientoNombre: string;
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
    rendimientoId,
    rendimientoNombre: `Nombre ${rendimientoId}`
  };
}
