// import { CultivoSecano } from '../cultivos-secano/cultivos-secano.model';

export interface RotacionSecano {
  rotacionId: string;
  // rotacionNro: string,
  rotacionPlanId: string;
  // rotacionPlanNombre: string,
  // rotacionPlanNro: string,
  rotacionNombre: string;
  rotacionAnio: number;
  rotacionEsSiembraDirecta: boolean;
  // rotacionVigenciaDesde: string,
  // rotacionVigenciaHasta: string,
  // rotacionAnios: number,
  // rotacionCantidadComponentes: number,
  // rotacionMesUltimoComponente: number,
  // rotacionAnioUltimoComponente: number
}

export interface RotacionesSecanoQueryResults {
  success: boolean;
  error: Error;
  rotaciones: RotacionSecano[];
}

export function createBaseRotacionSecano(
  rotacionId: string,
  rotacionPlanId: string,
  rotacionAnio: number,
  rotacionEsSiembraDirecta: boolean
): RotacionSecano {
  return {
    rotacionId,
    rotacionPlanId,
    rotacionNombre: `Rotacion ${rotacionId}`,
    rotacionAnio,
    rotacionEsSiembraDirecta
  };
}
