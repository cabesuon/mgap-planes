import {
  TableColumn,
  TableValueType,
  TableRow,
  TableValueAction
} from 'planes-core-lib';

import { ComponenteSecano } from './componentes-secano.model';

export interface ComponentesSecanoTableColumn extends TableColumn {
  literalFormat?: (v: any) => string;
}

export interface PlanesSecanoTableParams {
  columns?: ComponentesSecanoTableColumn[];
  componentes: ComponenteSecano[];
}

export const COMPONENTESSECANO_COLUMN_DEFAULT: ComponentesSecanoTableColumn[] = [];
