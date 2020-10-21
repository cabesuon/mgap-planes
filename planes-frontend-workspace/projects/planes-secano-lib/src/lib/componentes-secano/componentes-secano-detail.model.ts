import { DetailField } from 'planes-core-lib';
import { CultivosSecanoDetailParams } from '../cultivos-secano/cultivos-secano-detail.model';
import { ManejosSecanoDetailParams } from '../manejos-secano/manejos-secano-detail.model';
import { RendimientosSecanoDetailParams } from '../rendimientos-secano/rendimientos-secano-detail.model';
import { ComponenteSecano } from './componentes-secano.model';

export const COMPONENTESSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'componenteMesInicial', label: 'Mes Inicial' },
  { name: 'componenteMesFinal', label: 'Mes Final' },
  { name: 'sueloResiduosSiembra', label: 'Residuos Siembra' },
  { name: 'sueloPeriodo3', label: 'Suelo Periodo 3' },
  { name: 'sueloPeriodo4', label: 'Suelo Periodo 4' },
  { name: 'componenteMeses', label: 'Meses' },
  { name: 'componenteSembradoPorAvion', label: 'Sembrado por Avión' }
];

export interface ComponentesSecanoDetailParams {
  componente: ComponenteSecano;
  cultivoDetailParams: CultivosSecanoDetailParams;
  manejoDetailParams: ManejosSecanoDetailParams;
  rendimientoDetailParams: RendimientosSecanoDetailParams;
  fields?: DetailField[];
}
