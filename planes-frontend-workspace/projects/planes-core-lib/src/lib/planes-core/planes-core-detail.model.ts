import { formatPlanEstado, PlanCore } from './planes-core.model';
import { formatDate } from '../extras/extras-format';
import { DetailField } from '../extras/components/detail.model';

export const PLANESCOREDETAIL_DEFAULT_FIELDS: DetailField[] = [
  {
    name: 'planNro',
    label: 'Nro. del Plan'
  },
  {
    name: 'planNombre',
    label: 'Nombre del Plan'
  },
  {
    name: 'planFechaCreacion',
    label: 'Fecha de Creacion',
    format: formatDate
  },
  {
    name: 'planFechaPresentacion',
    label: 'Fecha de Presentacion',
    format: formatDate
  },
  {
    name: 'planEstado',
    label: 'Estado',
    format: formatPlanEstado
  }
];

export interface PlanesCoreDetailParams {
  plan: PlanCore;
  fields?: DetailField[];
}
