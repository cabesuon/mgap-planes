import { DetailField } from 'planes-core-lib';
import { PeriodoSecano } from './periodos-secano.model';

export const PERIODOSSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'periodoNumero', label: 'Período' },
  { name: 'periodoMesInicial', label: 'Mes Inicial' },
  { name: 'periodoMesFinal', label: 'Mes Final' },
  { name: 'periodoRPS', label: 'RPS', format: (v: number) => v.toFixed(2) },
  { name: 'periodoERP', label: 'ERP', format: (v: number) => v.toFixed(2) }
];

export interface PeriodosSecanoDetailParams {
  periodos: PeriodoSecano[];
  fields?: DetailField[];
}
