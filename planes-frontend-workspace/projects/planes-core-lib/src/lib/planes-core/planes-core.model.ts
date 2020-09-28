export enum PlanCoreEstado {
  EDICION = 1,
  PRESENTADO = 2
}

export interface PlanCore {
  departamentoId: string;
  ingenieroAgronomoId: string;
  mensajeIdUlt: string;
  observacionIdUlt: string;
  planEsMigrado: boolean;
  planEstado: PlanCoreEstado;
  planEsVersionActual: boolean;
  planFechaCreacion: string;
  planFechaModificacion: string;
  planFechaPresentacion: string;
  planFechaVigenciaDesde: string;
  planFechaVigenciaHasta: string;
  planId: string;
  planNombre: string;
  planNro: string;
  planRubro: string;
  planTipoTenencia: string;
  planTieneTenedor: boolean;
  planVencimientoContractual: string;
  regionalId: string;
  ultimoIdObservacion: string;

  // FINAL UPDATE to v.0.0.2
  // - added fields:
  propietarios: string[];
  arrendatarios: string[];

  // - removed fields:
  // propietarioId: string;
  // propietarioResponsableId: string;
  // tctResponsableId: string;
  // tenedorCualquierTituloId: string;
}

// utils

export function namePlanCore(planCore: PlanCore): string {
  return planCore.planNombre;
}

export function createEmptyPlanCore(): PlanCore {
  return {
    planId: null,
    planNro: null,
    planNombre: null,
    planEstado: null,
    planTipoTenencia: null,
    planTieneTenedor: null,
    planFechaCreacion: null,
    planFechaPresentacion: null,
    planFechaModificacion: null,
    ingenieroAgronomoId: null,
    departamentoId: null,

    planVencimientoContractual: null,
    mensajeIdUlt: null,
    observacionIdUlt: null,
    ultimoIdObservacion: null,
    planEsMigrado: null,
    regionalId: null,
    planFechaVigenciaDesde: null,
    planFechaVigenciaHasta: null,
    planEsVersionActual: null,
    planRubro: null,

    propietarios: [],
    arrendatarios: []
  };
}

export function createBasePlanCore(
  id: string,
  estado: number,
  ingenieroAgronomo: string,
  propietarios: string[],
  arrendatarios: string[],
  fechaCreacion: string,
  fechaPresentacion: string,
  fechaModificacion: string
): PlanCore {
  return {
    ...createEmptyPlanCore(),
    planId: id,
    planNro: id,
    planNombre: `Plan ${id}`,
    planEstado: estado,
    planTipoTenencia: `Tipo Tenencia ${id}`,
    planTieneTenedor: arrendatarios && arrendatarios.length > 0,
    planFechaCreacion: fechaCreacion,
    planFechaPresentacion: fechaPresentacion,
    planFechaModificacion: fechaModificacion,
    ingenieroAgronomoId: ingenieroAgronomo,
    departamentoId: id,

    planVencimientoContractual: null,
    planEsMigrado: false,
    regionalId: id,
    planFechaVigenciaDesde: null,
    planFechaVigenciaHasta: null,
    planRubro: `Rubro ${id}`,

    propietarios,
    arrendatarios
  };
}

export function formatPlanEstado(estado: PlanCoreEstado): string {
  switch (estado) {
    case 1:
      return 'Edición';
    case 2:
      return 'Presentado';
    default:
      return 'n/a';
  }
}

// services

export interface PlanesCoreQueryResults {
  success: boolean;
  error: { code: number; description: string };
  planes: PlanCore[];
}

export interface PlanCoreAddResult {
  success: boolean;
  error: { code: number; description: string };
  plan: PlanCore;
}

export interface PlanCoreUpdateResult {
  success: boolean;
  error: { code: number; description: string };
  plan: PlanCore;
}

export interface PlanCoreDeleteResult {
  success: boolean;
  error: { code: number; description: string };
  planId: string;
}
