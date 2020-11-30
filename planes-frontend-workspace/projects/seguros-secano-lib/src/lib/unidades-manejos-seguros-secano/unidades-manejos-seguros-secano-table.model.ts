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
import { AseguradoraSegurosSecano } from '../aseguradoras-seguros-secano/aseguradoras-seguros-secano.model';

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
  GOTOVISTAMAPA = 'GotoVistaMapa',
  GOTOVISTADMINISTRATIVA = 'GotoVistaAdministrativa',
  ENVIAR = 'Enviar'
}

export interface UnidadesManejosSegurosSecanoTableActionValue {
  action: UnidadesManejosSegurosSecanoTableAction;
  unidad: UnidadManejoSegurosSecano;
}

export interface UnidadesManejosSegurosSecanoTableSources {
  ciclos: CicloSegurosSecano[];
  cultivos: CultivoSegurosSecano[];
  aseguradoras: AseguradoraSegurosSecano[];
  empresas: EmpresaCore[];
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
        const cultivos = sources.cultivos.find(
          c => unidad[names[0]] === c.cultivoId
        );
        if (cultivos) {
          os = [cultivos];
        }
        break;
      case 'cicloId':
        const ciclos = sources.ciclos.find(
          c => unidad[names[0]] === c.cicloId
        );
        if (ciclos) {
          os = [ciclos];
        }
        break;
      case 'cultivoAntecesorId':
        const cultivosAntecesores = sources.cultivos.find(
          c => unidad[names[0]] === c.cultivoId
        );
        if (cultivosAntecesores) {
          os = [cultivosAntecesores];
        }
        break;
      case 'aseguradoraId':
        const aseguradoras = sources.aseguradoras.find(
          a => unidad[names[0]] === a.aseguradoraId
        );
        if (aseguradoras) {
          os = [aseguradoras];
        }
        break;
      case 'empresaId':
          const empresas = sources.empresas.find(
            e => unidad[names[0]] === e.empresaId
          );
          if (empresas) {
            os = [empresas];
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
    name: UnidadesManejosSegurosSecanoTableAction.GOTOVISTAMAPA,
    label: '',
    sort: false,
    filter: false,
    actionFormat: _ => ({
      value: UnidadesManejosSegurosSecanoTableAction.GOTOVISTAMAPA,
      text: 'Ver en Mapa',
      icon: 'map'
    })
  },
  {
    type: TableValueType.ACTION,
    name: UnidadesManejosSegurosSecanoTableAction.GOTOVISTADMINISTRATIVA,
    label: '',
    sort: false,
    filter: false,
    actionFormat: _ => ({
      value: UnidadesManejosSegurosSecanoTableAction.GOTOVISTADMINISTRATIVA,
      text: 'Ver en Administrativo',
      icon: 'search'
    })
  },
  // literales
  {
    type: TableValueType.LITERAL,
    name: 'empresaId.empresaRazonSocial',
    label: 'Empresa',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.LITERAL,
    name: 'unidadNombre',
    label: 'Nombre',
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
