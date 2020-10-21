import { DetailField } from 'planes-core-lib';
import { RendimientoSecano } from './rendimientos-secano.model';

export const RENDIMIENTOSSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'rendimientoId', label: 'Rendimiento' }
];

export interface RendimientosSecanoDetailParams {
  rendimiento: RendimientoSecano;
  fields?: DetailField[];
}
