import { ContactoCore } from './contacto-core.model';
import { DetailField } from '../extras/components/detail.model';

export const CONTACTOCOREDETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'email', label: 'Email' },
  { name: 'celular', label: 'Celular' },
  { name: 'domicilio', label: 'Domicilio' },
  { name: 'ciudad', label: 'Ciudad' }
];

export interface ContactoCoreDetailParams {
  contacto: ContactoCore;
  fields?: DetailField[];
}
