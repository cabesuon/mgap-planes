import { PersonaCore } from './personas-core.model';
import { formatDate } from '../extras/extras-format';
import { DetailField } from '../extras/components/detail.model';

export const PERSONASCOREDETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'personaCedula', label: 'Cedula' },
  { name: 'personaNombre', label: 'Nombre' },
  { name: 'personaPrimerApellido', label: 'Primer Apellido' },
  {
    name: 'personaFechaDeNacimiento',
    label: 'Fecha de Nacimiento',
    format: formatDate
  }
];

export interface PersonasCoreDetailParams {
  persona: PersonaCore;
  fields?: DetailField[];
}
