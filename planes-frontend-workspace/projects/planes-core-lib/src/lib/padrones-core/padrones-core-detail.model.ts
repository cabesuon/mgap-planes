import { PadronCore } from './padrones-core.model';
import { DetailField } from '../extras/components/detail.model';

export const PADRONESCOREDETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'email', label: 'Email' },
  { name: 'telefono', label: 'Telefono' },
  { name: 'celular', label: 'Celular' },
  { name: 'domicilio', label: 'Domicilio' },
  { name: 'ciudad', label: 'Ciudad' }
];

export interface PadronesCoreDetailParams {
  padron: PadronCore;
  fields?: DetailField[];
}
