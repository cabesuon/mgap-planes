import {
  TableColumn,
  TableValueType,
  TableRow,
  TableValueAction
} from 'planes-core-lib';

import { ChacraSecano } from './chacras-secano.model';

export interface ChacrasSecanoTableColumn extends TableColumn {
  literalFormat?: (v: any) => string;
  actionFormat?: (chacra: ChacraSecano) => TableValueAction;
}

export interface ChacrasSecanoTableParams {
  columns?: ChacrasSecanoTableColumn[];
  chacras: ChacraSecano[];
}

export const CHACRASSECANOTABLE_COLUMN_DEFAULT: ChacrasSecanoTableColumn[] = [];
