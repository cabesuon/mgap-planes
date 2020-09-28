export interface SueloCore {
  sueloId: string;
  sueloDesc: string;
  sueloFactorK: number;
  sueloTolerancia: number;
  sueloSlopeMax: number;
  sueloSlopeMin: number;
}

export function createBaseSueloCore(i: number) {
  return {
    sueloId: `${i}`,
    sueloDesc: `Descripcion ${i}`,
    sueloFactorK: i,
    sueloTolerancia: i,
    sueloSlopeMax: i,
    sueloSlopeMin: i
  };
}

export interface SuelosCoreQueryResults {
  success: boolean;
  error: { code: number; description: string };
  suelos: SueloCore[];
}
