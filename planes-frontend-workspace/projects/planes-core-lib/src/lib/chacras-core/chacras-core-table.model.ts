import {
  TableColumn,
  TableValueType,
  TableRow,
  TableValueAction
} from '../extras/components/table.model';
import { formatValue } from '../extras/extras-format';
import { ChacraCore } from './chacras-core.model';

export interface ChacrasCoreTableColumn extends TableColumn {
  literalFormat?: (v: any) => string;
  actionFormat?: (chacra: ChacraCore) => TableValueAction;
}

export interface ChacrasCoreTableParams {
  columns?: ChacrasCoreTableColumn[];
  chacras: ChacraCore[];
}

export enum ChacrasCoreTableAction {
  GOTOVISTAMAPA = 'GotoVistaMapa'
}

export interface ChacrasCoreTableActionValue {
  action: ChacrasCoreTableAction;
  chacra: ChacraCore;
}

export interface ChacrasCoreTableRowSource {
  chacra: ChacraCore;
}

export function resolveChacrasCoreTableCellValue(
  chacra: ChacraCore,
  column: ChacrasCoreTableColumn
): string | string[] {
  const names = column.name.split('.');
  if (names.length > 1) {
    let os: any[] = [];
    switch (names[0]) {
      case 'padrones':
        os = chacra.padrones;
        break;
      case 'suelos':
        os = chacra.suelos;
        break;
    }
    const vs: string[] = [];
    let v: string[];
    const attrs = names[1].split('+');
    for (const o of os) {
      v = [];
      for (const attr of attrs) {
        if (!o || !o.hasOwnProperty(attr)) {
          continue;
        }
        v.push(formatValue(o[attr], column.literalFormat));
      }
      vs.push(v.join(', '));
    }
    return column.type === TableValueType.LIST ? vs : vs.join(' ');
  }
  return formatValue(chacra[column.name], column.literalFormat);
}

export function createChacrasCoreTableRow(
  chacra: ChacraCore,
  columns: ChacrasCoreTableColumn[]
): TableRow {
  const row: TableRow = {
    __source__: chacra
  };
  let v: any;
  for (const column of columns) {
    switch (column.type) {
      case TableValueType.ACTION:
        row[column.name] = column.actionFormat
          ? column.actionFormat(chacra)
          : { value: column.name, text: column.name, icon: 'bomb' };
        break;
      case TableValueType.LIST:
      case TableValueType.LITERAL:
        row[column.name] = resolveChacrasCoreTableCellValue(chacra, column);
        break;
    }
  }
  return row;
}

export const CHACRASCORETABLE_COLUMNS_DEFAULT: ChacrasCoreTableColumn[] = [
  {
    type: TableValueType.LITERAL,
    name: 'chacraNro',
    label: 'Nro',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.LITERAL,
    name: 'chacraNombre',
    label: 'Nombre',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.LIST,
    name: 'suelos.sueloDesc+sueloFactorK+sueloTolerancia',
    label: 'Suelos(Desc, K, T)',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.LIST,
    name: 'padrones.padrondDepartamento+padronId+padronAreaHa',
    label: 'Padrones(Depto, Nro, ha)',
    sort: false,
    filter: true
  },
  {
    type: TableValueType.LITERAL,
    name: 'chacraFactorLSAsignado',
    label: 'Pendiente (%)',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.ACTION,
    name: 'GotoVistaMapa',
    label: '',
    sort: false,
    filter: false,
    actionFormat: _ => ({
      value: 'GotoVistaMapa',
      text: 'Ver en Mapa',
      icon: 'map'
    })
  }
];
