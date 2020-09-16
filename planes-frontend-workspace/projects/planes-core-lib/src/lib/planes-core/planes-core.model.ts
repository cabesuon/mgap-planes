export interface PlanCore {
  departamentoId: string;
  ingenieroAgronomoId: string;
  mensajeIdUlt: string;
  observacionIdUlt: string;
  planEsMigrado: boolean;
  planEstado: number;
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
  propietarioId: string;
  propietarioResponsableId: string;
  regionalId: string;
  tctResponsableId: string;
  tenedorCualquierTituloId: string;
  ultimoIdObservacion: string;
}

// services

export interface PlanesCoreQueryResults {
  success: boolean;
  error: { code: number; description: string };
  planes: PlanCore[];
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
    propietarioId: null,
    propietarioResponsableId: null,
    tenedorCualquierTituloId: null,
    tctResponsableId: null,
    planVencimientoContractual: null,
    mensajeIdUlt: null,
    observacionIdUlt: null,
    ultimoIdObservacion: null,
    planEsMigrado: null,
    regionalId: null,
    planFechaVigenciaDesde: null,
    planFechaVigenciaHasta: null,
    planEsVersionActual: null,
    planRubro: null
  };
}

export function createBasePlanCore(
  id: string,
  estado: number,
  ingenieroAgronomo: string,
  propietario: string,
  propietarioResponsable: string,
  tenedor: string,
  tenedorResponsable: string,
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
    planTieneTenedor: !!tenedor,
    planFechaCreacion: fechaCreacion,
    planFechaPresentacion: fechaPresentacion,
    planFechaModificacion: fechaModificacion,
    ingenieroAgronomoId: ingenieroAgronomo,
    departamentoId: id,
    propietarioId: propietario,
    propietarioResponsableId: propietarioResponsable,
    tenedorCualquierTituloId: tenedor,
    tctResponsableId: tenedorResponsable,
    planVencimientoContractual: null,
    planEsMigrado: false,
    regionalId: id,
    planFechaVigenciaDesde: null,
    planFechaVigenciaHasta: null,
    planRubro: `Rubro ${id}`
  };
}

export function personaRelPlanCore(
  planCore: PlanCore,
  personaId: string,
  ingenieroAgronomoId: string
): boolean {
  return (
    planCore.propietarioResponsableId === personaId ||
    planCore.tctResponsableId === personaId ||
    planCore.ingenieroAgronomoId === ingenieroAgronomoId
  );
}
