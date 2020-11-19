import { DetailField } from 'planes-core-lib';
import { CultivoSegurosSecano } from './cultivos-seguros-secano.model';

export const CULTIVOSSEGUROSSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'cultivoNombre', label: 'Cultivo' }
];

export interface CultivosSegurosSecanoDetailParams {
  cultivo: CultivoSegurosSecano;
  fields?: DetailField[];
}
