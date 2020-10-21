import { DetailField } from 'planes-core-lib';
import { PeriodoSecano } from './periodos-secano.model';

export const PERIODOSSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'periodoNumero', label: 'Nro' },
  { name: 'periodoMesInicial', label: 'Mes Inicial' },
  { name: 'periodoMesFinal', label: 'Mes Final' },
  { name: 'periodoEI30', label: 'EI30' },
  { name: 'periodoRPS', label: 'RPS' },
  { name: 'periodoERP', label: 'ERP' },
  { name: 'periodoC', label: 'C' },
  { name: 'periodoA', label: 'A' }
];

export interface PeriodosSecanoDetailParams {
  periodo: PeriodoSecano;
  fields?: DetailField[];
}
