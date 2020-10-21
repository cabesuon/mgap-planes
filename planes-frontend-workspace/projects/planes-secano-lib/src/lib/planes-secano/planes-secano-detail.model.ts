import { DetailField } from 'planes-core-lib';
import { PlanSecano, formatPlanEstado } from './planes-secano.model';
import { formatDate } from 'planes-core-lib';

export interface PlanesSecanoDetailParams {
  plan: PlanSecano;
  fields?: DetailField[];
}

export const PLANESSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'planNro', label: 'Nro. del Plan' },
  { name: 'planNombre', label: 'Nombre del Plan' },
  { name: 'planFechaCreacion', label: 'Fecha de Creacion', format: formatDate },
  {
    name: 'planFechaPresentacion',
    label: 'Fecha de Presentacion',
    format: formatDate
  },
  { name: 'planEstadoSecano', label: 'Estado', format: formatPlanEstado }
];
