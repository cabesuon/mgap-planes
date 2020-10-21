import { DetailField } from 'planes-core-lib';
import { CultivoSecano } from './cultivos-secano.model';

export const CULTIVOSSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'cultivoNombre', label: 'Cultivo' }
];

export interface CultivosSecanoDetailParams {
  cultivo: CultivoSecano;
  fields?: DetailField[];
}
