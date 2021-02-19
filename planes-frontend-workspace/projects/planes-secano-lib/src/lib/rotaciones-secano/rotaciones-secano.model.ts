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

export interface RotacionSecanoAddResult {
  success: boolean;
  error: { code: number; description: string };
  rotacion: RotacionSecano;
}

export interface RotacionSecanoUpdateResult {
  success: boolean;
  error: { code: number; description: string };
  rotacion: RotacionSecano;
}

export interface RotacionSecanoDeleteResult {
  success: boolean;
  error: { code: number; description: string };
  rotacionId: string;
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

export function createEmptyRotacionSecano(): RotacionSecano {
  return {
    rotacionId: null,
    rotacionPlanId: null,
    rotacionNombre: null,
    rotacionAnio: null,
    rotacionEsSiembraDirecta: null
  };
}
