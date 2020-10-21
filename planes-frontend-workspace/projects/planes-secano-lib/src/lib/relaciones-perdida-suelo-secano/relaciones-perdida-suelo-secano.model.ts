export interface RelacionPerdidaSueloSecano {
  rpsId: string;
  cultivoId: string;
  manejoId: string;
  rendimientoId: string;
  rpsSueloResiduosSiembra: number;
  rpsPeriodo: number;
  rpsSueloAerea: number;
  rpsSueloAereaPeriodo: number;
  rpsFactor: number;
  rpsFactorLuegoPrimerAnio: number;
}

export interface RelacionesPerdidaSuelosSecanoQueryResults {
  success: boolean;
  error: Error;
  relacionPerdidaSuelos: RelacionPerdidaSueloSecano[];
}

export function createBaseRelacionPerdidaSueloSecano(
  rpsId: string,
  cultivoId: string,
  manejoId: string,
  rendimientoId: string
): RelacionPerdidaSueloSecano {
  return {
    rpsId,
    cultivoId,
    manejoId,
    rendimientoId,
    rpsSueloResiduosSiembra: 0,
    rpsPeriodo: 0,
    rpsSueloAerea: 0,
    rpsSueloAereaPeriodo: 0,
    rpsFactor: 0,
    rpsFactorLuegoPrimerAnio: 0
  };
}
