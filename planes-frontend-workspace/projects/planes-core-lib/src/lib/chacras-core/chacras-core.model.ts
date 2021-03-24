import { PadronCore } from '../padrones-core/padrones-core.model';
import { SueloCore } from '../suelos-core/suelos-core.model';

export interface ChacraCore {
  chacraId: string;
  chacraNro: string;
  chacraNombre: string;
  chacraLocalidad: string;
  chacraArea: number;
  chacraDicose: number;
  chacraGeometria: string;

  planId: string;

  padrones: PadronCore[];
  suelos: SueloCore[];

  // pediente
  chacraFactorLSEsManual: boolean;
  chacraFactorLSGeometriaAsignado: string;
  chacraFactorLSGeometriaLimitante: string;
  chacraFactorLSAsignado: number;
  chacraFactorLSLimitante: number;
  chacraFactorLAsignado: number;
  chacraFactorLLimitante: number;
  chacraFactorSAsignado: number;
  chacraFactorSLimitante: number;

  // suelo seleccionado
  chacraSueloLimitanteFactorK: number;
  chacraSueloAsignadoFactorK: number;
  chacraSueloAsignadoId: string;
  chacraSueloLimitanteId: number;
  chacraSueloAsignadoDsc: string;
  chacraSueloLimitanteDsc: string;
  chacraSueloAsignadoTolerancia: number;
  chacraSueloLimitanteTolerancia: number;
  chacraSueloAsignadoSlopeMax: number;
  chacraSueloAsignadoSlopeMin: number;
  chacraSueloLimitanteSlopeMax: number;
  chacraSueloLimitanteSlopeMin: number;

  chacraFactorRAsignado: number;
  chacraFactorRAutomatico: number;

  chacraLargoAsignado: number;
  chacraLargoLimitante: number;
  chacraPendienteAsignado: number;
  chacraPendienteLimitante: number;
}

export function nameChacraCore(chacraCore: ChacraCore): string {
  return chacraCore.chacraNombre;
}

export function createEmptyChacraCore(): ChacraCore {
  return {
    chacraId: null,
    chacraNro: null,
    chacraNombre: null,
    chacraLocalidad: null,
    chacraArea: null,
    chacraDicose: null,
    chacraGeometria: null,

    planId: null,

    padrones: [],
    suelos: [],

    chacraFactorLSEsManual: null,
    chacraFactorLSGeometriaAsignado: null,
    chacraFactorLSGeometriaLimitante: null,
    chacraFactorLSAsignado: null,
    chacraFactorLSLimitante: null,

    chacraSueloLimitanteFactorK: null,
    chacraSueloAsignadoId: null,
    chacraSueloLimitanteId: null,
    chacraSueloAsignadoDsc: null,
    chacraSueloAsignadoFactorK: null,
    chacraSueloAsignadoTolerancia: null,
    chacraSueloLimitanteDsc: null,
    chacraSueloLimitanteTolerancia: null,
    chacraSueloAsignadoSlopeMax: null,
    chacraSueloAsignadoSlopeMin: null,
    chacraSueloLimitanteSlopeMax: null,
    chacraSueloLimitanteSlopeMin: null,

    chacraFactorLAsignado: null,
    chacraFactorLLimitante: null,
    chacraFactorRAsignado: null,
    chacraFactorRAutomatico: null,
    chacraFactorSAsignado: null,
    chacraFactorSLimitante: null,

    chacraLargoAsignado: null,
    chacraLargoLimitante: null,
    chacraPendienteAsignado: null,
    chacraPendienteLimitante: null
  };
}

export function createBaseChacraCore(
  id: string,
  planId: string,
  chacraGeometria: string,
  chacraFactorLSGeometriaAsignado: string,
  chacraFactorLSGeometriaLimitante: string,
  padrones: PadronCore[],
  suelos: SueloCore[]
): ChacraCore {
  return {
    ...createEmptyChacraCore(),

    planId,
    chacraId: id,
    chacraNro: id,
    chacraGeometria,
    chacraNombre: `Chacra ${id}`,
    chacraFactorLSGeometriaAsignado,
    chacraFactorLSGeometriaLimitante,
    chacraFactorLSEsManual:
      chacraFactorLSGeometriaLimitante !== chacraFactorLSGeometriaAsignado,
    padrones,
    suelos
  };
}

export function createBaseGeomChacraCore() {
  return {
    rings: [
      [
        [-58.4, -33.8],
        [-58.4, -33.78],
        [-58.38, -33.78],
        [-58.38, -33.8],
        [-58.4, -33.8]
      ]
    ],
    spatialReference: {
      wkid: 4326
    }
  };
}

export function createBaseGeomPendienteChacraCore() {
  return {
    paths: [[[-58.39, -33.79], [-58.385, -33.785]]],
    spatialReference: { wkid: 4326 }
  };
}

export interface ChacrasCoreQueryResults {
  success: boolean;
  error: { code: number; description: string };
  chacras: ChacraCore[];
}

export interface ChacraCoreAddResult {
  success: boolean;
  error: { code: number; description: string };
  chacra: ChacraCore;
}

export interface ChacraCoreUpdateResult {
  success: boolean;
  error: { code: number; description: string };
  chacra: ChacraCore;
}

export interface ChacraCoreDeleteResult {
  success: boolean;
  error: { code: number; description: string };
  chacraId: string;
}

export interface ChacrasCorePadronesQueryResults {
  success: boolean;
  error: { code: number; description: string };
  padrones: PadronCore[];
}

export interface ChacrasCoreSuelosQueryResults {
  success: boolean;
  error: { code: number; description: string };
  suelos: SueloCore[];
}

export interface ChacrasCoreLSQueryResults {
  success: boolean;
  error: { code: number; description: string };
  FactorLS: string;
  FactorL: string;
  Slope: number;
  SlopeLength: number;
  Geometry: string;
}
