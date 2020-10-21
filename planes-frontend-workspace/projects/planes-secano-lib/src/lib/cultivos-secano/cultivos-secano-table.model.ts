import { CultivoSecano } from './cultivos-secano.model';

export interface CultivosSecanoTableParams {
  columns?: CultivoSecanoTableColumn[];
  cultivos: CultivoSecano[];
}

export const CULTIVOSSECANO_COLUMN_DEFAULT: CultivoSecanoTableColumn[] = [];
