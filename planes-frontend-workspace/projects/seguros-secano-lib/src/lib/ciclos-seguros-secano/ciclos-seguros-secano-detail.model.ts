import { DetailField } from 'planes-core-lib';
import { CicloSegurosSecano } from './ciclos-seguros-secano.model';

export const CICLOSSEGUROSSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'cicloNombre', label: 'Ciclo' }
];

export interface CiclosSegurosSecanoDetailParams {
  ciclo: CicloSegurosSecano;
  fields?: DetailField[];
}
