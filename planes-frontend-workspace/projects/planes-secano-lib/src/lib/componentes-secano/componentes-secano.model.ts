import { PeriodoSecano } from '../periodos-secano/periodos-secano.model';

export interface ComponenteSecano {
  componenteId: string;
  rotacionId: string;
  componenteNombre: string;
  componenteAnio: number;
  componenteMesInicial: number;
  componenteMesFinal: number;
  componenteEstacion: number;
  cultivoId: string;
  componenteAnteriorSembradoAvion: boolean;
  componenteAnteriorEsSoja: boolean;
  periodoCultivoId: string;
  periodoCultivoNombre: string;
  manejoId: string;
  manejoNombre: string;
  rendimientoId: string;
  sueloResiduosSiembra: number;
  sueloPeriodo3: number;
  sueloPeriodo4: number;
  componenteMeses: number;
  componenteFechaReplicado: string;
  componenteEsPrimero: boolean;
  componenteEsUltimo: boolean;
  componenteSembradoPorAvion: boolean;
  periodos: PeriodoSecano[];
}

export interface ComponentesSecanoQueryResults {
  success: boolean;
  error: Error;
  componentes: ComponenteSecano[];
}

export function createBaseComponenteSecano(
  componenteId: string,
  rotacionId: string,
  componenteAnio: number,
  componenteMesInicial: number,
  componenteMesFinal: number,
  componenteEstacion: number,
  cultivoId: string,
  manejoId: string,
  rendimientoId: string,
  periodos: PeriodoSecano[]
): ComponenteSecano {
  return {
    componenteId,
    rotacionId,
    componenteNombre: `Componente ${componenteId}`,
    componenteAnio,
    componenteMesInicial,
    componenteMesFinal,
    componenteEstacion,
    cultivoId,
    componenteAnteriorSembradoAvion: false,
    componenteAnteriorEsSoja: false,
    periodoCultivoId: '0',
    periodoCultivoNombre: 'Periodo Cultivo Nombre',
    manejoId,
    manejoNombre: `Manejo ${manejoId}`,
    rendimientoId,
    sueloResiduosSiembra: 0,
    sueloPeriodo3: 0,
    sueloPeriodo4: 0,
    componenteMeses: 0,
    componenteFechaReplicado: '0',
    componenteEsPrimero: false,
    componenteEsUltimo: false,
    componenteSembradoPorAvion: false,
    periodos
  };
}
