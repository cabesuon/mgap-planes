import { EmpresaCore } from './empresas-core.model';
import { DetailField } from '../extras/components/detail.model';

export const EMPRESASCOREDETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'empresaRazonSocial', label: 'Razon social' },
  { name: 'tipoSocialId', label: 'Tipo social' },
  { name: 'empresaPersonaCi', label: 'CI' },
  { name: 'empresaRut', label: 'RUT' }
];

export interface EmpresasCoreDetailParams {
  empresa: EmpresaCore;
  fields?: DetailField[];
}
