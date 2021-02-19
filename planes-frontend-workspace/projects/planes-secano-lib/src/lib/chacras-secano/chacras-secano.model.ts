import {
  ChacraCore,
  PadronCore,
  SueloCore,
  createEmptyChacraCore,
  createBaseChacraCore
} from 'planes-core-lib';

export interface MecanicaDeApoyo {
  mecanicaId: number;
  mecanicaNombre: string;
}

export const MECANICAS: MecanicaDeApoyo[] = [
  { mecanicaId: 4, mecanicaNombre: 'Siembra en contorno' },
  { mecanicaId: 5, mecanicaNombre: 'Cultivos en fajas en contorno' },
  { mecanicaId: 6, mecanicaNombre: 'Construcción de sistemas de terrazas' }
];

export interface ChacraSecano extends ChacraCore {
  chacraNucleoId: string;
  chacraMecanicaApoyoCobertura: number;
  mecanicaDeApoyoId: number;

  chacraFactorP: number;
  chacraFactorPEsManual: boolean;

  chacraTerrazasLargo: number;
  chacraTerrazasConstruidas: boolean;

  chacraFactorAAsignado: number;
  chacraFactorALimitante: number;
  chacraFactorC: number;

  warnings: { code: number; description: string }[];
  errors: { code: number; description: string }[];
}

export interface ChacrasSecanoQueryResults {
  success: boolean;
  error: { code: number; description: string };
  chacras: ChacraSecano[];
}

export interface ChacrasSecanoPadronesQueryResults {
  success: boolean;
  error: { code: number; description: string };
  padrones: PadronCore[];
}

export interface ChacrasSecanoSuelosQueryResults {
  success: boolean;
  error: { code: number; description: string };
  suelos: SueloCore[];
}

export interface ChacrasSecanoLSQueryResults {
  success: boolean;
  error: { code: number; description: string };
  FactorLS: string;
  FactorL: string;
  Slope: number;
  SlopeLength: number;
  Geometry: string;
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

export function createEmptyChacraSecano(): ChacraSecano {
  return {
    ...createEmptyChacraCore(),
    chacraNucleoId: null,
    chacraMecanicaApoyoCobertura: null,
    mecanicaDeApoyoId: null,
    chacraFactorP: null,
    chacraFactorPEsManual: false,
    chacraTerrazasLargo: null,
    chacraTerrazasConstruidas: false,
    chacraFactorAAsignado: null,
    chacraFactorALimitante: null,
    chacraFactorC: null,
    errors: [],
    warnings: []
  };
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
  return {
    ...createBaseChacraCore(
      id,
      planId,
      chacraGeometria,
      chacraFactorLSGeometriaAsignado,
      chacraFactorLSGeometriaLimitante,
      padrones,
      suelos
    ),
    chacraNucleoId: id,
    chacraMecanicaApoyoCobertura: null,
    mecanicaDeApoyoId: null,
    chacraFactorP: null,
    chacraFactorPEsManual: false,
    chacraTerrazasLargo: null,
    chacraTerrazasConstruidas: false,
    chacraFactorAAsignado: null,
    chacraFactorALimitante: null,
    chacraFactorC: null,
    errors: [],
    warnings: []
  };
}
