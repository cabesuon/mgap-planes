import { DetailField } from 'planes-core-lib';
import { AseguradoraSegurosSecano } from './aseguradoras-seguros-secano.model';

export const ASEGURADORASSEGUROSSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'aseguradoraNombre', label: 'Aseguradora' }
];

export interface AseguradorasSegurosSecanoDetailParams {
  ciclo: AseguradoraSegurosSecano;
  fields?: DetailField[];
}
