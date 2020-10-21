export interface CultivoSecano {
  cultivoId: string;
  cultivoNombre: string;
  cultivoEsPastura: boolean;
  periodoCultivoId: number /*TODO: Revisar que es periodoCultivoId */;
  cultivoVisible: boolean;
  cultivoPermiteSiembraAvion: boolean;
  cultivoProximoSiembraPorAvion: boolean;
}

export interface CultivosSecanoQueryResults {
  success: boolean;
  error: Error;
  cultivos: CultivoSecano[];
}

export function createBaseCultivoSecano(cultivoId: string): CultivoSecano {
  return {
    cultivoId,
    cultivoNombre: `Cultivo ${cultivoId}`,
    cultivoEsPastura: false,
    periodoCultivoId: 0,
    cultivoVisible: true,
    cultivoPermiteSiembraAvion: false,
    cultivoProximoSiembraPorAvion: false
  };
}
