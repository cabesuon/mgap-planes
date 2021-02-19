import { PadronCore } from './padrones-core.model';
import { DetailField } from '../extras/components/detail.model';

export const PADRONESCOREDETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'padronId', label: 'Padrón' },
  { name: 'padrondDepartamento', label: 'Departamento' }
];

export interface PadronesCoreDetailParams {
  padron: PadronCore;
  fields?: DetailField[];
}
