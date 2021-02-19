export interface ZonaExclusionCore {
  zonaExclusionId: string;
  planId: string;
  zonaExclusionGeometria: string;
}

export function nombreZonaExclusionCore(
  zonaExclusionCore: ZonaExclusionCore
): string {
  return zonaExclusionCore.zonaExclusionId;
}

export function createEmptyZonaExclusionCore(): ZonaExclusionCore {
  return {
    zonaExclusionId: null,
    planId: null,
    zonaExclusionGeometria: null
  };
}

export function createBaseZonaExclusionCore(): ZonaExclusionCore {
  return {
    zonaExclusionId: null,
    planId: null,
    zonaExclusionGeometria: null
  };
}

export function createBaseGeomZonaExclusionCore() {
  return {
    rings: [
      [
        [-58.398, -33.798],
        [-58.398, -33.792],
        [-58.392, -33.792],
        [-58.392, -33.798],
        [-58.398, -33.798]
      ]
    ],
    spatialReference: { wkid: 4326 }
  };
}

// services

export interface ZonasExclusionCoreQueryResults {
  success: boolean;
  error: { code: number; description: string };
  zonasExclusion: ZonaExclusionCore[];
}

export interface ZonaExclusionCoreAddResult {
  success: boolean;
  error: { code: number; description: string };
  zonasExclusion: ZonaExclusionCore;
}

export interface ZonaExclusionCoreUpdateResult {
  success: boolean;
  error: { code: number; description: string };
  zonasExclusion: ZonaExclusionCore;
}

export interface ZonaExclusionCoreDeleteResult {
  success: boolean;
  error: { code: number; description: string };
  zonasExclusionId: string;
}
