export enum PlanSecanoEstado {
  EDICION = 1,
  PRESENTADO = 2,
  PENDIENTEPAGO = 3
}

export enum PlanSecanoUrlType {
  PASARELA_PAGOS = 1,
  REPORT = 2
}

export enum PlanSecanoTipoTenencia {
  ARRENDATARIO = 'Arrendatario',
  MEDIANERO = 'Medianero',
  OTROS = 'Otros'
}

export interface PlanSecano {
  departamentoId: string;
  ingenieroAgronomoId: string;
  mensajeIdUlt: string;
  observacionIdUlt: string;
  planEsMigrado: boolean;
  planEstado: PlanSecanoEstado;
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

  propietarioId: string;
  propietarioResponsableId: string;
  tctResponsableId: string;
  tenedorCualquierTituloId: string;

  planHabilitaEdicionRotacion: boolean;
  planEnVerificacionFrm: boolean;
  planEnFiscalizacionFrm: boolean;

  warnings: { code: number; description: string }[];
  errors: { code: number; description: string }[];
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

export interface PlanSecanoGetUrlResult {
  success: boolean;
  error: { code: number; description: string };
  url: string;
}

export function createEmptyPlanSecano(): PlanSecano {
  return {
    planId: null,
    planNro: null,
    planNombre: null,
    planEstado: null,
    planTipoTenencia: null,
    planTieneTenedor: false,
    planFechaCreacion: null,
    planFechaPresentacion: null,
    planFechaModificacion: null,
    ingenieroAgronomoId: null,
    departamentoId: null,

    planVencimientoContractual: null,
    mensajeIdUlt: null,
    observacionIdUlt: null,
    ultimoIdObservacion: null,
    planEsMigrado: false,
    regionalId: null,
    planFechaVigenciaDesde: null,
    planFechaVigenciaHasta: null,
    planEsVersionActual: true,
    planRubro: 'Agricultura',

    propietarioId: null,
    propietarioResponsableId: null,
    tenedorCualquierTituloId: null,
    tctResponsableId: null,

    planHabilitaEdicionRotacion: false,
    planEnVerificacionFrm: false,
    planEnFiscalizacionFrm: false,
    warnings: [],
    errors: []
  };
}

export function createBasePlanSecano(
  id: string,
  estado: number,
  ingenieroAgronomo: string,
  propietarioId: string,
  tenedorCualquierTituloId: string,
  fechaCreacion: string,
  fechaPresentacion: string,
  fechaModificacion: string,
  propietarioResponsableId: string,
  tctResponsableId: string,
  planHabilitaEdicionRotacion: boolean,
  planEnVerificacionFrm: boolean,
  planEnFiscalizacionFrm: boolean
): PlanSecano {
  return {
    planId: id,
    planNro: id,
    planNombre: `Plan ${id}`,
    planEstado: estado,
    planTipoTenencia: `Tipo Tenencia ${id}`,
    planTieneTenedor:
      tenedorCualquierTituloId && tenedorCualquierTituloId !== '0',
    planFechaCreacion: fechaCreacion,
    planFechaPresentacion: fechaPresentacion,
    planFechaModificacion: fechaModificacion,
    ingenieroAgronomoId: ingenieroAgronomo,
    departamentoId: id,

    planVencimientoContractual: null,
    mensajeIdUlt: null,
    observacionIdUlt: null,
    ultimoIdObservacion: null,
    planEsMigrado: false,
    regionalId: id,
    planFechaVigenciaDesde: null,
    planFechaVigenciaHasta: null,
    planEsVersionActual: null,
    planRubro: `Rubro ${id}`,

    propietarioId,
    propietarioResponsableId,
    tenedorCualquierTituloId,
    tctResponsableId,

    planHabilitaEdicionRotacion,
    planEnVerificacionFrm,
    planEnFiscalizacionFrm,
    warnings: [],
    errors: []
  };
}

export function formatPlanEstado(plan: PlanSecano): string {
  switch (plan.planEstado) {
    case 1:
      return 'Edición';
    case 2:
      if (plan.planEnVerificacionFrm && plan.planEnFiscalizacionFrm) {
        return 'Presentado (en auditoría y fiscalización)';
      } else if (plan.planEnVerificacionFrm) {
        return 'Presentado (en auditoría)';
      } else if (plan.planEnFiscalizacionFrm) {
        return 'Presentado (en fiscalización)';
      }
      return 'Presentado';
    case 3:
      return 'Pendiente de pago';
    default:
      return 'n/a';
  }
}
