export interface PeriodoCultivo {
  periodoCultivoId: number;
  periodoCultivoNombre: string;
  periodoCultivoMesInicio: number;
  periodoCultivoMesFinal: number;
}

export const PERIODOS_CULTIVOS: PeriodoCultivo[] = [
  {
    periodoCultivoId: 1,
    periodoCultivoNombre: 'Verano',
    periodoCultivoMesInicio: 1,
    periodoCultivoMesFinal: 6
  },
  {
    periodoCultivoId: 2,
    periodoCultivoNombre: 'Invierno',
    periodoCultivoMesInicio: 7,
    periodoCultivoMesFinal: 12
  },
  {
    periodoCultivoId: 3,
    periodoCultivoNombre: 'Ambos',
    periodoCultivoMesInicio: 1,
    periodoCultivoMesFinal: 12
  },
  {
    periodoCultivoId: 4,
    periodoCultivoNombre: 'Anual',
    periodoCultivoMesInicio: 1,
    periodoCultivoMesFinal: 12
  }
];

export interface CultivoSecano {
  cultivoId: string;
  cultivoNombre: string;
  cultivoEsPastura: boolean;
  periodoCultivoId: number;
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

export function getPeriodoCultivoMinByName(n: string): number {
  switch (n) {
    case 'Verano':
    case 'Ambos':
    case 'Anual':
      return 1;
    case 'Invierno':
      return 7;
  }
}

export function getPeriodoCultivoMaxByName(n: string): number {
  switch (n) {
    case 'Verano':
      return 6;
    case 'Invierno':
    case 'Ambos':
    case 'Anual':
      return 12;
  }
}
