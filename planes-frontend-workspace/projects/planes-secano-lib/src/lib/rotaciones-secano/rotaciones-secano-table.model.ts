import {
  TableColumn,
  TableValueType,
  TableRow,
  TableValueAction
} from 'planes-core-lib';

import { RotacionSecano } from './rotaciones-secano.model';

export interface RotacionesSecanoTableColumn extends TableColumn {
  literalFormat?: (v: any) => string;
  actionFormat?: (rotacion: RotacionSecano) => TableValueAction;
}

export interface RotacionesSecanoTableParams {
  columns?: RotacionesSecanoTableColumn[];
  rotaciones: RotacionSecano[];
}

export const ROTACIONESSECANO_COLUMN_DEFAULT: RotacionesSecanoTableColumn[] = [];
