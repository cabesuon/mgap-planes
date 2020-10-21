import { DetailField } from 'planes-core-lib';
import { RelacionPerdidaSueloSecano } from './relaciones-perdida-suelo-secano.model';

export const RELACIONPERDIDASUELOSSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'rpsId', label: '' },
  { name: 'cultivoId', label: '' },
  { name: 'manejoId', label: '' },
  { name: 'rendimientoId', label: '' },
  { name: 'rpsSueloResiduosSiembra', label: '' },
  { name: 'rpsPeriodo', label: '' },
  { name: 'rpsSueloAerea', label: '' },
  { name: 'rpsSueloAereaPeriodo', label: '' },
  { name: 'rpsFactor', label: '' },
  { name: 'rpsFactorLuegoPrimerAnio', label: '' }
];

export interface RelacionesPerdidaSueloSecanoDetailParams {
  relacionPerdidaSuelo: RelacionPerdidaSueloSecano;
  fields?: DetailField[];
}
