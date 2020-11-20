import { PadronCore, SueloCore } from 'planes-core-lib';
import { ChacraSecano, createBaseChacraSecano } from 'planes-secano-lib';

export interface ChacraSegurosSecano extends ChacraSecano {
  unidadId: string;
  empresaId: string;
}

export interface ChacrasSegurosSecanoQueryResults {
  success: boolean;
  error: { code: number; description: string };
  chacras: ChacraSegurosSecano[];
}

export interface ChacraSegurosSecanoAddResult {
  success: boolean;
  error: { code: number; description: string };
  chacra: ChacraSegurosSecano;
}

export interface ChacraSegurosSecanoUpdateResult {
  success: boolean;
  error: { code: number; description: string };
  chacra: ChacraSegurosSecano;
}

export interface ChacraSegurosSecanoDeleteResult {
  success: boolean;
  error: { code: number; description: string };
  chacraId: string;
}

export function createBaseChacraSegurosSecano(
  id: string,
  unidadId: string,
  empresaId: string,
  chacraGeometria: string
): ChacraSegurosSecano {
  return {
    ...createBaseChacraSecano(
      id,
      null,
      chacraGeometria,
      null,
      null,
      null,
      null
    ),
    unidadId,
    empresaId
  };
}
