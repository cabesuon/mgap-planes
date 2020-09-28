import { ResponsableCore } from './responsables-core.model';
import { DetailField } from '../extras/components/detail.model';
import { PersonaCore } from '../personas-core/personas-core.model';

export const RESPONSABLESCOREDETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'empresaId', label: 'Empresa' }
];

export interface ResponsablesCoreDetailParams {
  responsable: ResponsableCore;
  persona: PersonaCore;
  fields?: DetailField[];
}
