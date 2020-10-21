import { DetailField } from 'planes-core-lib';
import { ComponentesSecanoDetailParams } from '../componentes-secano/componentes-secano-detail.model';
import { RotacionSecano } from './rotaciones-secano.model';

export const ROTACIONESSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'rotacionNombre', label: 'Nombre' },
  { name: 'rotacionAnio', label: 'Año' },
  { name: 'rotacionEsSiembraDirecta', label: 'Siembra Directa' }
];

export interface RotacionesSecanoDetailParams {
  rotacion: RotacionSecano;
  componentesDetailParams: ComponentesSecanoDetailParams[];
  fields?: DetailField[];
}
