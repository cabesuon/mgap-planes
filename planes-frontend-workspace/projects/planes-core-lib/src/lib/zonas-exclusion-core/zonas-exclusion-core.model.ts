export interface ZonaExclusionCore {
  zonaExclusionId: string;
  chacraId: string;
  zonaExclusionGeometria: string;
}

export function nombreZonaExclusionCore(
  zonaExclusionCore: ZonaExclusionCore
): string {
  return zonaExclusionCore.zonaExclusionId;
}

export function createZonaExclusionCore(): ZonaExclusionCore {
  return {
    zonaExclusionId: null,
    chacraId: null,
    zonaExclusionGeometria: null
  };
}

export interface ZonaExclusionCoreQueryResults {
  success: boolean;
  error: { code: number; description: string };
  zonasExclusion: ZonaExclusionCore[];
}

export function createBaseZonaExclusionCore(): ZonaExclusionCore {
  return {
    zonaExclusionId: null,
    chacraId: null,
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
