import { DetailField } from 'planes-core-lib';
import { ComponenteProductivoSegurosSecano } from './componentes-productivos-seguros-secano.model';

export interface ComponentesProductivosSegurosSecanoDetailParams {
  componente: ComponenteProductivoSegurosSecano;
  fields?: DetailField[];
}

export const COMPONENTESPRODUCTIVOSSEGUROSSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'chacraId.chacraNombre', label: 'Chacra' },
  { name: 'cultivoId.cultivoNombre', label: 'Cultivo' },
  { name: 'cicloId.cicloNombre', label: 'Ciclo' }
];
