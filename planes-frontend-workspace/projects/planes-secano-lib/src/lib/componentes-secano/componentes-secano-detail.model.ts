import { DetailField } from 'planes-core-lib';
import { CultivosSecanoDetailParams } from '../cultivos-secano/cultivos-secano-detail.model';
import { ManejosSecanoDetailParams } from '../manejos-secano/manejos-secano-detail.model';
import { RendimientosSecanoDetailParams } from '../rendimientos-secano/rendimientos-secano-detail.model';
import { ComponenteSecano, formatResiduo } from './componentes-secano.model';

export const COMPONENTESSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  {
    name: 'componenteSembradoPorAvion',
    label: 'Sembrado por Avión',
    format: (v: boolean) => (v ? 'Si' : 'No')
  },
  {
    name: 'sueloResiduosSiembra',
    label: 'Residuos Siembra',
    format: formatResiduo
  },
  {
    name: 'sueloPeriodo3',
    label: 'Residuos Periodo 3',
    format: formatResiduo
  },
  {
    name: 'sueloPeriodo4',
    label: 'Residuos Periodo 4',
    format: formatResiduo
  }
];

export interface ComponentesSecanoDetailParams {
  componente: ComponenteSecano;
  cultivoDetailParams: CultivosSecanoDetailParams;
  manejoDetailParams: ManejosSecanoDetailParams;
  rendimientoDetailParams: RendimientosSecanoDetailParams;
  fields?: DetailField[];
}
