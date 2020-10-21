import { DetailField } from 'planes-core-lib';
import { ManejoSecano } from './manejos-secano.model';

export const MANEJOSSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'manejoNombre', label: 'Manejo' }
];

export interface ManejosSecanoDetailParams {
  manejo: ManejoSecano;
  fields?: DetailField[];
}
