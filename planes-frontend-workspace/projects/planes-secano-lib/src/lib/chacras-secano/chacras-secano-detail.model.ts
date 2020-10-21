import { DetailField } from 'planes-core-lib';
import { ChacraSecano } from './chacras-secano.model';

export const CHACRASCOREDETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'chacraNro', label: 'Nro. de la Chacra' },
  { name: 'chacraNombre', label: 'Nombre de la Chacra' },
  { name: 'chacraArea', label: 'Area (ha)' },
  { name: 'chacraFactorAAsignado', label: 'Factor A' },
  { name: 'chacraFactorRAsignado', label: 'Factor R' },
  { name: 'chacraSueloAsignadoFactorK', label: 'Factor K' },
  { name: 'chacraFactorLSAsignado', label: 'Factor LS' },
  { name: 'chacraFactorP', label: 'Factor P' },
  { name: 'chacraFactorAAsignado', label: 'Factor A' },
  { name: 'chacraFactorC', label: 'Factor C' },
  { name: 'chacraFactorLAsignado', label: 'Factor L' },
  { name: 'chacraFactorSAsignado', label: 'Factor S' },
  { name: 'chacraLargoAsignado', label: 'Largo (m)' },
  { name: 'chacraPendienteAsignado', label: 'Pendiente (%)' }
];

export interface ChacrasSecanoDetailParams {
  chacra: ChacraSecano;
  fields?: DetailField[];
}
