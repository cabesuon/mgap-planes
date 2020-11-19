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

import { ComponenteProductivoSegurosSecano } from './componentes-productivos-seguros-secano.model';

export interface ComponentesProductivosSegurosSecanoTableColumn
  extends TableColumn {
  literalFormat?: (v: any) => string;
  actionFormat?: (
    componente: ComponenteProductivoSegurosSecano
  ) => TableValueAction;
}

export interface ComponentesProductivosSegurosSecanoTableParams {
  columns?: ComponentesProductivosSegurosSecanoTableColumn[];
  componentes: ComponenteProductivoSegurosSecano[];
  sources: ComponentesProductivosSegurosSecanoTableSources;
}

export enum ComponentesProductivosSegurosSecanoTableAction {
  GUARDAR = 'Guardar',
  ENVIAR = 'Enviar'
}

export interface ComponentesProductivosSegurosSecanoTableActionValue {
  action: ComponentesProductivosSegurosSecanoTableAction;
  componente: ComponenteProductivoSegurosSecano;
}

export interface ComponentesProductivosSegurosSecanoTableSources {
  empresas: EmpresaCore[];
  chacras: ChacraSegurosSecano;
  ciclos: CicloSegurosSecano[];
  cultivos: CultivoSegurosSecano[];
}

export function resolveComponentesProductivosSegurosSecanoTableCellValue(
  componente: ComponenteProductivoSegurosSecano,
  column: ComponentesProductivosSegurosSecanoTableColumn,
  sources: ComponentesProductivosSegurosSecanoTableSources
): string | string[] {
  const names = column.name.split('.'); // chacraId.chacraNombre+chacraArea -> Santa Elena 40 ha
  if (names.length > 1) {
    let os: any[] = [];

    switch (names[0]) {
      case 'chacraId':
        break;
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
  return formatValue(componente[column.name], column.literalFormat);
}

export function createComponentesProductivosSegurosSecanoTableRow(
  componente: ComponenteProductivoSegurosSecano,
  columns: ComponentesProductivosSegurosSecanoTableColumn[],
  sources: ComponentesProductivosSegurosSecanoTableSources
): TableRow {
  const row: TableRow = {
    __source__: componente
  };
  let v: any;
  for (const column of columns) {
    switch (column.type) {
      case TableValueType.ACTION:
        row[column.name] = column.actionFormat
          ? column.actionFormat(componente)
          : { value: column.name, text: column.name, icon: 'bomb' };
        break;
      case TableValueType.LIST:
      case TableValueType.LITERAL:
        row[
          column.name
        ] = resolveComponentesProductivosSegurosSecanoTableCellValue(
          componente,
          column,
          sources
        );
        break;
    }
  }
  return row;
}

export const COMPONENTESPRODUCTIVOSSEGUROSSECANOTABLE_COLUMNS_DEFAULT: ComponentesProductivosSegurosSecanoTableColumn[] = [
  // acciones
  {
    type: TableValueType.ACTION,
    name: ComponentesProductivosSegurosSecanoTableAction.GUARDAR,
    label: '',
    sort: false,
    filter: false,
    actionFormat: _ => ({
      value: ComponentesProductivosSegurosSecanoTableAction.GUARDAR,
      text: 'Guardar',
      icon: 'disk'
    })
  },
  {
    type: TableValueType.ACTION,
    name: ComponentesProductivosSegurosSecanoTableAction.ENVIAR,
    label: '',
    sort: false,
    filter: false,
    actionFormat: _ => ({
      value: ComponentesProductivosSegurosSecanoTableAction.ENVIAR,
      text: 'Enviar',
      icon: 'mail'
    })
  },
  // literales
  {
    type: TableValueType.LITERAL,
    name: 'chacraId.chacraNombre',
    label: 'Chacra',
    sort: true,
    filter: true
  },
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
