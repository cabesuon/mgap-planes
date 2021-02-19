import {
  TableColumn,
  TableValueType,
  TableRow,
  TableValueAction,
  formatValue
} from 'planes-core-lib';

import { PeriodoSecano } from './periodos-secano.model';

export interface PeriodosSecanoTableColumn extends TableColumn {
  literalFormat?: (v: any) => string;
}

export interface PeriodosSecanoTableParams {
  columns?: PeriodosSecanoTableColumn[];
  periodos: PeriodoSecano[];
}

export interface PeriodosSecanoTableRowSource {
  periodo: PeriodoSecano;
}

export function resolvePeriodosSecanoTableCellValue(
  periodo: PeriodoSecano,
  column: PeriodosSecanoTableColumn
): string | string[] {
  return formatValue(periodo[column.name], column.literalFormat);
}

export function createPeriodosSecanoTableRow(
  periodo: PeriodoSecano,
  columns: PeriodosSecanoTableColumn[]
): TableRow {
  const row: TableRow = {
    __source__: periodo
  };
  let v: any;
  for (const column of columns) {
    row[column.name] = resolvePeriodosSecanoTableCellValue(periodo, column);
  }
  return row;
}

export const PERIODOSSECANOTABLE_COLUMNS_DEFAULT: PeriodosSecanoTableColumn[] = [
  {
    type: TableValueType.LITERAL,
    name: 'periodoId',
    label: 'Nro',
    sort: false,
    filter: false
  },
  {
    type: TableValueType.LITERAL,
    name: 'periodoMesInicial',
    label: 'Mes Inicial',
    sort: false,
    filter: false
  },
  {
    type: TableValueType.LITERAL,
    name: 'periodoMesFinal',
    label: 'Mes Final',
    sort: false,
    filter: false
  },
  {
    type: TableValueType.LITERAL,
    name: 'periodoRPS',
    label: 'RPS',
    sort: false,
    filter: false
  },
  {
    type: TableValueType.LITERAL,
    name: 'periodoERP',
    label: 'ERP',
    sort: false,
    filter: false
  }
];
