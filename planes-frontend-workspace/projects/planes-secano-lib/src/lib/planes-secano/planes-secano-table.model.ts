import {
  TableColumn,
  TableValueType,
  TableRow,
  TableValueAction,
  PersonaCore,
  IngenieroAgronomoCore,
  EmpresaCore,
  ContactoCore,
  formatValue,
  formatDate
} from 'planes-core-lib';

import { PlanSecano, formatPlanEstado } from './planes-secano.model';
import { ResponsableSecano } from '../responsables-secano/responsables-secano.model';

export interface PlanesSecanoTableColumn extends TableColumn {
  literalFormat?: (v: any) => string;
  actionFormat?: (plan: PlanSecano) => TableValueAction;
}

export interface PlanesSecanoTableParams {
  columns?: PlanesSecanoTableColumn[];
  planes: PlanSecano[];
  sources: PlanesSecanoTableSources;
}

export enum PlanesSecanoTableAction {
  GOTOVISTAMAPA = 'GotoVistaMapa',
  GOTOVISTADMINISTRATIVA = 'GotoVistaAdministrativa',
  PRESENTAR = 'Presentar',
  DESCARTAR = 'Descartar',
  CANCELAR = 'Cancelar',
  Copiar = 'Copiar'
}

export interface PlanesSecanoTableActionValue {
  action: PlanesSecanoTableAction;
  plan: PlanSecano;
}

export interface PlanesSecanoTableSources {
  empresas: EmpresaCore[];
  ingenierosAgronomos: IngenieroAgronomoCore[];
  personas: PersonaCore[];
  responsables: ResponsableSecano[];
}

export function resolvePlanesSecanoTableCellValue(
  plan: PlanSecano,
  column: PlanesSecanoTableColumn,
  sources: PlanesSecanoTableSources
): string | string[] {
  const names = column.name.split('.');
  if (names.length > 1) {
    let os: any[] = [];

    switch (names[0]) {
      case 'propietarios':
      case 'arrendatarios':
        if (plan[names[0]] && plan[names[0]].length > 0) {
          // empresasId: string[] -> empresas: EmpresaCore[]
          os = sources.empresas.filter(e =>
            plan[names[0]].some((o: string) => o === e.empresaId)
          );
          if (names.length > 2 && names[1] === 'contactos') {
            // empresas: EmpresaCore[] -> contactos: ContactoCore[]
            os = os
              .map((o: EmpresaCore) => o.contactos)
              .reduce((acc, val) => acc.concat(val), []);
          }
          if (names.length > 3 && names[2] === 'personaId') {
            // contactos: ContactoCore[] -> personas: PersonaCore[]
            os = sources.personas.filter(e =>
              os.some((o: ContactoCore) => o.personaId === e.personaId)
            );
          }
        }
        break;
      case 'ingenieroAgronomoId':
        // ingenieroAgronomoId: string -> ingenieroAgronomo: IngenieroAgronomoCore
        const o = sources.ingenierosAgronomos.find(
          a => plan[names[0]] === a.ingenieroAgronomoId
        );
        if (o) {
          os = [o];
          if (names.length > 2 && names[1] === 'contacto') {
            // ingenieroAgronomo: IngenieroAgronomoCore -> contacto: ContactoCore
            os = os.map((o: IngenieroAgronomoCore) => o.contacto);
          }
          if (names.length > 3 && names[2] === 'personaId') {
            // contactos: ContactoCore[] -> personas: PersonaCore[]
            os = sources.personas.filter(e =>
              os.some((o: ContactoCore) => o.personaId === e.personaId)
            );
          }
          break;
        }
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
  return formatValue(plan[column.name], column.literalFormat);
}

export function createPlanesSecanoTableRow(
  plan: PlanSecano,
  columns: PlanesSecanoTableColumn[],
  sources: PlanesSecanoTableSources
): TableRow {
  const row: TableRow = {
    __source__: plan
  };
  let v: any;
  for (const column of columns) {
    switch (column.type) {
      case TableValueType.ACTION:
        row[column.name] = column.actionFormat
          ? column.actionFormat(plan)
          : { value: column.name, text: column.name, icon: 'bomb' };
        break;
      case TableValueType.LIST:
      case TableValueType.LITERAL:
        row[column.name] = resolvePlanesSecanoTableCellValue(
          plan,
          column,
          sources
        );
        break;
    }
  }
  return row;
}

export const PLANESSECANOTABLE_COLUMNS_DEFAULT: PlanesSecanoTableColumn[] = [
  {
    type: TableValueType.ACTION,
    name: PlanesSecanoTableAction.GOTOVISTAMAPA,
    label: '',
    sort: false,
    filter: false,
    actionFormat: _ => ({
      value: PlanesSecanoTableAction.GOTOVISTAMAPA,
      text: 'Ver en Mapa',
      icon: 'map'
    })
  },
  {
    type: TableValueType.ACTION,
    name: PlanesSecanoTableAction.GOTOVISTADMINISTRATIVA,
    label: '',
    sort: false,
    filter: false,
    actionFormat: _ => ({
      value: PlanesSecanoTableAction.GOTOVISTADMINISTRATIVA,
      text: 'Ver en Administrativo',
      icon: 'search'
    })
  },
  {
    type: TableValueType.LITERAL,
    name: 'planNro',
    label: 'Nro',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.LITERAL,
    name: 'planNombre',
    label: 'Nombre',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.LITERAL,
    name: 'planEstado',
    label: 'Estado',
    sort: true,
    filter: true,
    literalFormat: formatPlanEstado
  },
  {
    type: TableValueType.LITERAL,
    name: 'planFechaCreacion',
    label: 'Creado',
    sort: true,
    filter: true,
    literalFormat: formatDate
  },
  {
    type: TableValueType.LITERAL,
    name: 'planFechaModificacion',
    label: 'Modificado',
    sort: true,
    filter: true,
    literalFormat: formatDate
  },
  {
    type: TableValueType.LIST,
    name: 'propietarios.empresaRazonSocial',
    label: 'Propietarios',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.LIST,
    name: 'arrendatarios.empresaRazonSocial',
    label: 'Arrendatarios',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.LITERAL,
    name:
      'ingenieroAgronomoId.contacto.personaId.personaNombre+personaPrimerApellido',
    label: 'Técnico',
    sort: true,
    filter: true
  }
];
