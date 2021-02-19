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

export interface ComponenteSecanoAddResult {
  success: boolean;
  error: { code: number; description: string };
  componente: ComponenteSecano;
}

export interface ComponenteSecanoUpdateResult {
  success: boolean;
  error: { code: number; description: string };
  componente: ComponenteSecano;
}

export interface ComponenteSecanoDeleteResult {
  success: boolean;
  error: { code: number; description: string };
  componenteId: string;
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

export function createEmptyComponenteSecano(): ComponenteSecano {
  return {
    componenteId: null,
    rotacionId: null,
    componenteNombre: null,
    componenteAnio: null,
    componenteMesInicial: null,
    componenteMesFinal: null,
    componenteEstacion: null,
    cultivoId: null,
    componenteAnteriorSembradoAvion: false,
    componenteAnteriorEsSoja: false,
    periodoCultivoId: null,
    periodoCultivoNombre: null,
    manejoId: null,
    manejoNombre: null,
    rendimientoId: null,
    sueloResiduosSiembra: null,
    sueloPeriodo3: null,
    sueloPeriodo4: null,
    componenteMeses: null,
    componenteFechaReplicado: null,
    componenteEsPrimero: false,
    componenteEsUltimo: false,
    componenteSembradoPorAvion: false,
    periodos: []
  };
}

export function formatResiduo(v: number): string {
  return isNaN(v) ? 'n/a' : v > 0 ? `${v}%` : 'No';
}
