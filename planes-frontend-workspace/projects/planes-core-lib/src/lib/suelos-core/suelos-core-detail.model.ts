import { SueloCore } from './suelos-core.model';
import { DetailField } from '../extras/components/detail.model';

export const SUELOSCOREDETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'email', label: 'Email' },
  { name: 'telefono', label: 'Telefono' },
  { name: 'celular', label: 'Celular' },
  { name: 'domicilio', label: 'Domicilio' },
  { name: 'ciudad', label: 'Ciudad' }
];

export interface SuelosCoreDetailParams {
  suelo: SueloCore;
  fields?: DetailField[];
}
