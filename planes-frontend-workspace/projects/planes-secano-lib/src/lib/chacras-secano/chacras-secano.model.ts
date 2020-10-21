import {
  ChacraCore,
  PadronCore,
  SueloCore,
  createBaseChacraCore
} from 'planes-core-lib';

export interface ChacraSecano extends ChacraCore {}

export interface ChacrasSecanoQueryResults {
  success: boolean;
  error: { code: number; description: string };
  chacras: ChacraSecano[];
}

export interface ChacraSecanoAddResult {
  success: boolean;
  error: { code: number; description: string };
  chacra: ChacraSecano;
}

export interface ChacraSecanoUpdateResult {
  success: boolean;
  error: { code: number; description: string };
  chacra: ChacraSecano;
}

export interface ChacraSecanoDeleteResult {
  success: boolean;
  error: { code: number; description: string };
  chacraId: string;
}

export function createBaseChacraSecano(
  id: string,
  planId: string,
  chacraGeometria: string,
  chacraFactorLSGeometriaAsignado: string,
  chacraFactorLSGeometriaLimitante: string,
  padrones: PadronCore[],
  suelos: SueloCore[]
): ChacraSecano {
  return createBaseChacraCore(
    id,
    planId,
    chacraGeometria,
    chacraFactorLSGeometriaAsignado,
    chacraFactorLSGeometriaLimitante,
    padrones,
    suelos
  );
}
