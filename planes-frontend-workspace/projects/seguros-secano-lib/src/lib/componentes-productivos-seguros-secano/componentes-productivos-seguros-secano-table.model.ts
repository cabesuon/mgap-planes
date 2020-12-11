import {
  TableColumn,
  TableValueType,
  TableRow,
  TableValueAction,
  formatValue,
  formatDate,
  EmpresaCore
} from 'planes-core-lib';
import { AseguradoraSegurosSecano } from '../aseguradoras-seguros-secano/aseguradoras-seguros-secano.model';
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
  ENVIAR = 'Enviar',
  EDITAR = 'Editar'
}

export interface ComponentesProductivosSegurosSecanoTableActionValue {
  action: ComponentesProductivosSegurosSecanoTableAction;
  componente: ComponenteProductivoSegurosSecano;
}

export interface ComponentesProductivosSegurosSecanoTableSources {
  empresas: EmpresaCore[];
  chacras: ChacraSegurosSecano[];
  ciclos: CicloSegurosSecano[];
  cultivos: CultivoSegurosSecano[];
  aseguradoras: AseguradoraSegurosSecano[];
}

export function resolveComponentesProductivosSegurosSecanoTableCellValue(
  componente: ComponenteProductivoSegurosSecano,
  column: ComponentesProductivosSegurosSecanoTableColumn,
  sources: ComponentesProductivosSegurosSecanoTableSources
): string | string[] {
  const names = column.name.split('.'); // chacraId.chacraNombre+chacraArea -> Santa Elena 40 ha
  if (names.length > 1) {
    let os: any[] = [];
    let o: any = null;
    switch (names[0]) {
      case 'chacraId':
        o = sources.chacras.find(c => c.chacraId === componente.chacraId);
        if (o) {
          os.push(o);
        }
        break;
      case 'cultivoId':
        o = sources.cultivos.find(c => c.cultivoId === componente.cultivoId);
        if (o) {
          os.push(o);
        }
        break;
      case 'cicloId':
        o = sources.ciclos.find(c => c.cicloId === componente.cicloId);
        if (o) {
          os.push(o);
        }
        break;
      case 'cultivoAntecesorId':
        o = sources.cultivos.find(
          c => c.cultivoId === componente.cultivoAntecesorId
        );
        if (o) {
          os.push(o);
        }
        break;
      case 'aseguradoraId':
        o = sources.aseguradoras.find(
          a => a.aseguradoraId === componente.aseguradoraId
        );
        if (o) {
          os.push(o);
        }
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

export function formatNumber(n: number): string {
  if (!n || isNaN(n)) {
    return '';
  }
  return n.toFixed(2);
}

export function formatNull(v: any): string {
  if (!v) {
    return '';
  }
  return v;
}

export const COMPONENTESPRODUCTIVOSSEGUROSSECANOTABLE_COLUMNS_DEFAULT: ComponentesProductivosSegurosSecanoTableColumn[] = [
  {
    type: TableValueType.LITERAL,
    name: 'chacraId.chacraNombre',
    label: 'Chacra',
    sort: true,
    filter: true,
    literalFormat: formatNull
  },
  {
    type: TableValueType.LITERAL,
    name: 'fechaEnviado',
    label: 'Fecha Enviado',
    sort: true,
    filter: true,
    literalFormat: formatDate
  },
  // acciones
  {
    type: TableValueType.ACTION,
    name: ComponentesProductivosSegurosSecanoTableAction.EDITAR,
    label: '',
    sort: false,
    filter: false,
    actionFormat: _ => ({
      value: ComponentesProductivosSegurosSecanoTableAction.EDITAR,
      text: 'Editar',
      icon: 'edit'
    })
  },
  // literales
  {
    type: TableValueType.LITERAL,
    name: 'zafra',
    label: 'Zafra',
    sort: true,
    filter: true,
    literalFormat: formatNull
  },
  {
    type: TableValueType.LITERAL,
    name: 'anio',
    label: 'Año',
    sort: true,
    filter: true,
    literalFormat: formatNull
  },
  {
    type: TableValueType.LITERAL,
    name: 'cultivoId.cultivoNombre',
    label: 'Cultivo',
    sort: true,
    filter: true,
    literalFormat: formatNull
  },
  {
    type: TableValueType.LITERAL,
    name: 'cicloId.cicloNombre',
    label: 'Ciclo',
    sort: true,
    filter: true,
    literalFormat: formatNull
  },
  {
    type: TableValueType.LITERAL,
    name: 'cultivoAntecesorId.cultivoNombre',
    label: 'Cultivo Antecesor',
    sort: true,
    filter: true,
    literalFormat: formatNull
  },
  {
    type: TableValueType.LITERAL,
    name: 'aseguradoraId.aseguradoraNombre',
    label: 'Aseguradora',
    sort: true,
    filter: true,
    literalFormat: formatNull
  },
  {
    type: TableValueType.LITERAL,
    name: 'polizaId',
    label: 'Poliza',
    sort: true,
    filter: true,
    literalFormat: formatNull
  },
  {
    type: TableValueType.LITERAL,
    name: 'fechaSiembra',
    label: 'Fecha Siembra',
    sort: true,
    filter: true,
    literalFormat: formatDate
  },
  {
    type: TableValueType.LITERAL,
    name: 'superficieSembrada',
    label: 'Sup. Sembrada (ha)',
    sort: true,
    filter: true,
    literalFormat: formatNumber
  },
  {
    type: TableValueType.LITERAL,
    name: 'fechaCosecha',
    label: 'Fecha Cosecha',
    sort: true,
    filter: true,
    literalFormat: formatDate
  },
  {
    type: TableValueType.LITERAL,
    name: 'superficieCosechada',
    label: 'Sup. Cosechada (ha)',
    sort: true,
    filter: true,
    literalFormat: formatNumber
  },
  {
    type: TableValueType.LITERAL,
    name: 'fertilizacionP2O5',
    label: 'P205',
    sort: true,
    filter: true,
    literalFormat: formatNumber
  },
  {
    type: TableValueType.LITERAL,
    name: 'fertilizacionK2O',
    label: 'K20',
    sort: true,
    filter: true,
    literalFormat: formatNumber
  },
  {
    type: TableValueType.LITERAL,
    name: 'fertilizacionN',
    label: 'N',
    sort: true,
    filter: true,
    literalFormat: formatNumber
  },
  {
    type: TableValueType.LITERAL,
    name: 'fertilizacionS',
    label: 'S',
    sort: true,
    filter: true,
    literalFormat: formatNumber
  },
  {
    type: TableValueType.LITERAL,
    name: 'analisisSueloPBray',
    label: 'PBray',
    sort: true,
    filter: true,
    literalFormat: formatNumber
  },
  {
    type: TableValueType.LITERAL,
    name: 'analisisSueloK',
    label: 'K',
    sort: true,
    filter: true,
    literalFormat: formatNumber
  },
  {
    type: TableValueType.LITERAL,
    name: 'rendimiento',
    label: 'Rendimiento',
    sort: true,
    filter: true,
    literalFormat: formatNumber
  }
];
