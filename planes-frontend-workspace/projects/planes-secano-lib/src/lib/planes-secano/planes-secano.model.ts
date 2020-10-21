import {
  PlanCore,
  createBasePlanCore,
  createEmptyPlanCore
} from 'planes-core-lib';

export enum PlanSecanoEstado { //TODO: Extends
  EDICION = 1,
  PRESENTADO = 2,
  PENDIENTEPAGO = 3
}

export interface PlanSecano extends PlanCore {
  planSecanoEstado: PlanSecanoEstado;
  propietarioResponsableId: string;
  tctResponsableId: string;
}

export interface PlanesSecanoQueryResults {
  success: boolean;
  error: { code: number; description: string };
  planes: PlanSecano[];
}

export interface PlanSecanoAddResult {
  success: boolean;
  error: { code: number; description: string };
  plan: PlanSecano;
}

export interface PlanSecanoUpdateResult {
  success: boolean;
  error: { code: number; description: string };
  plan: PlanSecano;
}

export interface PlanSecanoDeleteResult {
  success: boolean;
  error: { code: number; description: string };
  planId: string;
}

export function createEmptyPlanSecano(): PlanSecano {
  return {
    ...createEmptyPlanCore(),
    planSecanoEstado: null,
    propietarioResponsableId: null,
    tctResponsableId: null
  };
}

export function createBasePlanSecano(
  id: string,
  estado: number,
  ingenieroAgronomo: string,
  propietarios: string[],
  arrendatarios: string[],
  fechaCreacion: string,
  fechaPresentacion: string,
  fechaModificacion: string,
  propietarioResponsableId: string,
  tctResponsableId: string
) {
  return {
    ...createBasePlanCore(
      id,
      estado,
      ingenieroAgronomo,
      propietarios,
      arrendatarios,
      fechaCreacion,
      fechaPresentacion,
      fechaModificacion
    ),
    planSecanoEstado: PlanSecanoEstado.EDICION,
    propietarioResponsableId,
    tctResponsableId
  };
}

export function formatPlanEstado(estado: PlanSecanoEstado): string {
  switch (estado) {
    case 1:
      return 'Edición';
    case 2:
      return 'Presentado';
    case 3:
      return 'Pendiente de pago';
    default:
      return 'n/a';
  }
}
