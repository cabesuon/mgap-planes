import { DetailField } from 'planes-core-lib';
import { UnidadManejoSegurosSecano } from './unidades-manejos-seguros-secano.model';

export interface UnidadesManejosSegurosSecanoDetailParams {
  unidad: UnidadManejoSegurosSecano;
  fields?: DetailField[];
}

export const UNIDADESMANEJOSSEGUROSSECANODETAIL_DEFAULT_FIELDS:
DetailField[] = [
  { name: 'cultivoId.cultivoNombre', label: 'Cultivo' },
  { name: 'cicloId.cicloNombre', label: 'Ciclo' }
];
