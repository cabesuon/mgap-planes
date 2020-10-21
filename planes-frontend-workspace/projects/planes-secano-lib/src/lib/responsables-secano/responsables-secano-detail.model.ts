import { ResponsableSecano } from './responsables-secano.model';
import { DetailField, PersonaCore } from 'planes-core-lib';

export const RESPONSABLESCOREDETAIL_DEFAULT_FIELDS: DetailField[] = [];

export interface ResponsablesSecanoDetailParams {
  responsable: ResponsableSecano;
  persona: PersonaCore;
  fields?: DetailField[];
}
