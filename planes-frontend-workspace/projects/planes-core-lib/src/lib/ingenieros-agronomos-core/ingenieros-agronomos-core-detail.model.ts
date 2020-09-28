import { IngenieroAgronomoCore } from './ingenieros-agronomos-core.model';
import { DetailField } from '../extras/components/detail.model';
import { PersonaCore } from '../personas-core/personas-core.model';

export const INGENIEROSAGRONOMOSCOREDETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'cjppu', label: 'CJJPU' },
  { name: 'regionalId', label: 'Regional' }
];

export interface IngenierosCoreDetailParams {
  ingeniero: IngenieroAgronomoCore;
  persona: PersonaCore;
  fields?: DetailField[];
}
