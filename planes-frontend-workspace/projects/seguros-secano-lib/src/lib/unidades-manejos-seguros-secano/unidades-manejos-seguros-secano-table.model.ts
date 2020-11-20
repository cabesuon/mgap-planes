import {
  TableColumn,
  TableValueType,
  TableRow,
  TableValueAction,
  formatValue,
  formatDate,
  EmpresaCore
} from 'planes-core-lib';
import { ChacraSegurosSecano } from '../chacras-seguros-secano/chacras-seguros-secano.model';
import { CicloSegurosSecano } from '../ciclos-seguros-secano/ciclos-seguros-secano.model';
import { CultivoSegurosSecano } from '../cultivos-seguros-secano/cultivos-seguros-secano.model';

import { UnidadManejoSegurosSecano } from './unidades-manejos-seguros-secano.model';

export interface UnidadesManejosSegurosSecanoTableColumn extends TableColumn {
  literalFormat?: (v: any) => string;
  actionFormat?: (unidad: UnidadManejoSegurosSecano) => TableValueAction;
}

export interface UnidadesManejosSegurosSecanoTableParams {
  columns?: UnidadesManejosSegurosSecanoTableColumn[];
  unidades: UnidadManejoSegurosSecano[];
  sources: UnidadesManejosSegurosSecanoTableSources;
}

export enum UnidadesManejosSegurosSecanoTableAction {
  GUARDAR = 'Guardar',
  ENVIAR = 'Enviar'
}

export interface UnidadesManejosSegurosSecanoTableActionValue {
  action: UnidadesManejosSegurosSecanoTableAction;
  unidad: UnidadManejoSegurosSecano;
}

export interface UnidadesManejosSegurosSecanoTableSources {
  ciclos: CicloSegurosSecano[];
  cultivos: CultivoSegurosSecano[];
}

export function resolveUnidadesManejosSegurosSecanoTableCellValue(
  unidad: UnidadManejoSegurosSecano,
  column: UnidadesManejosSegurosSecanoTableColumn,
  sources: UnidadesManejosSegurosSecanoTableSources
): string | string[] {
  const names = column.name.split('.');
  if (names.length > 1) {
    let os: any[] = [];

    switch (names[0]) {
      case 'cultivoId':
        break;
      case 'cicloId':
        break;
      case 'cultivoAntecesorId':
        break;
      case 'aseguradoraId':
        break;
    }

    const vs: string[] = [];
    let v: string[];
    const attrs = names[names.length - 1].split('+');
    for (const o of os) {
      v = [];
      for (const attr of attrs) {
        if (!o || !o.hasOwnProperty(attr)) {
          continue;
        }
        v.push(formatValue(o[attr], column.literalFormat));
      }
      vs.push(v.join(' '));
    }
    return column.type === TableValueType.LIST ? vs : vs.join(' ');
  }
  return formatValue(unidad[column.name], column.literalFormat);
}

export function createUnidadesManejosSegurosSecanoTableRow(
  unidad: UnidadManejoSegurosSecano,
  columns: UnidadesManejosSegurosSecanoTableColumn[],
  sources: UnidadesManejosSegurosSecanoTableSources
): TableRow {
  const row: TableRow = {
    __source__: unidad
  };
  let v: any;
  for (const column of columns) {
    switch (column.type) {
      case TableValueType.ACTION:
        row[column.name] = column.actionFormat
          ? column.actionFormat(unidad)
          : { value: column.name, text: column.name, icon: 'bomb' };
        break;
      case TableValueType.LIST:
      case TableValueType.LITERAL:
        row[column.name] = resolveUnidadesManejosSegurosSecanoTableCellValue(
          unidad,
          column,
          sources
        );
        break;
    }
  }
  return row;
}

export const UNIDADESMANEJOSSEGUROSSECANOTABLE_COLUMNS_DEFAULT: UnidadesManejosSegurosSecanoTableColumn[] = [
  // acciones
  {
    type: TableValueType.ACTION,
    name: UnidadesManejosSegurosSecanoTableAction.GUARDAR,
    label: '',
    sort: false,
    filter: false,
    actionFormat: _ => ({
      value: UnidadesManejosSegurosSecanoTableAction.GUARDAR,
      text: 'Guardar',
      icon: 'disk'
    })
  },
  {
    type: TableValueType.ACTION,
    name: UnidadesManejosSegurosSecanoTableAction.ENVIAR,
    label: '',
    sort: false,
    filter: false,
    actionFormat: _ => ({
      value: UnidadesManejosSegurosSecanoTableAction.ENVIAR,
      text: 'Enviar',
      icon: 'mail'
    })
  },
  // literales
  {
    type: TableValueType.LITERAL,
    name: 'cultivoId.cultivoNombre',
    label: 'Cultivo',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.LITERAL,
    name: 'cicloId.cicloNombre',
    label: 'Ciclo',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.LITERAL,
    name: 'cultivoAntecesorId.cultivoNombre',
    label: 'Cultivo Antecesor',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.LITERAL,
    name: 'aseguradoraId.aseguradoraNombre',
    label: 'Aseguradora',
    sort: true,
    filter: true
  }
];
