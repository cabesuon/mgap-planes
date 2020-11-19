import { DetailField } from 'planes-core-lib';
import { ChacraSegurosSecano } from './chacras-seguros-secano.model';

export const CHACRASSEGUROSSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'chacraNombre', label: 'Nombre de la Chacra' },
  { name: 'unidadId', label: 'Unidad' }
];

export interface ChacrasSegurosSecanoDetailParams {
  chacra: ChacraSegurosSecano;
  fields?: DetailField[];
}
