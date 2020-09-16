import {
  TableColumn,
  TableValueType,
  TableRow,
  TableValueAction
} from '../extras/components/table.model';
import { PlanCore } from './planes-core.model';
import { IngenieroAgronomoCore } from '../ingenieros-agronomos-core/ingenieros-agronomos-core.model';
import { ResponsableCore } from '../responsables-core/responsables-core.model';
import { PersonaCore } from '../personas-core/personas-core.model';
import { formatValue, formatDate } from '../extras/extras-format';

export interface PlanesCoreTableColumn extends TableColumn {
  literalFormat?: (v: any) => string;
  actionFormat?: (plan: PlanCore) => TableValueAction;
}

export interface PlanesCoreTableSources {
  personas: PersonaCore[];
  ingenierosAgronomos: IngenieroAgronomoCore[];
  responsables: ResponsableCore[];
}

export interface PlanesCoreTableParams {
  columns?: PlanesCoreTableColumn[];
  sources: PlanesCoreTableSources;
  planes: PlanCore[];
  actions: boolean;
}

export enum PlanesCoreTableAction {
  GOTOVISTAMAPA = 'GotoVistaMapa',
  GOTOVISTAADMINISTRATIVO = 'GotoVistaAdministrativo',
  PRESENTAR = 'Presentar',
  REVISARPAGO = 'RevisarPago',
  DESCARTAR = 'Descartar'
}

export interface PlanesCoreTableActionValue {
  action: PlanesCoreTableAction;
  plan: PlanCore;
}

export function resolvePlanesCoreTableCellValue(
  p: PlanCore,
  c: PlanesCoreTableColumn,
  s: PlanesCoreTableSources
) {
  let o1: any;
  const v = [];
  let a2: string[];
  for (const a1 of c.name.split('+')) {
    o1 = p;
    a2 = a1.split('.');
    if (a2.length === 0) {
      break;
    }
    if (a2.length > 1) {
      for (let i = 0; i < a2.length - 1; i++) {
        if (!o1 || !o1.hasOwnProperty(a2[i])) {
          break;
        }
        switch (a2[i]) {
          case 'personaId':
            o1 = s.personas.find(b => b.personaId === o1[a2[i]]);
            break;
          case 'ingenieroAgronomoId':
            o1 = s.ingenierosAgronomos.find(
              b => b.ingenieroAgronomoId === o1[a2[i]]
            );
            break;
          case 'propietarioResponsableId':
          case 'tctResponsableId':
            o1 = s.responsables.find(b => b.contacto.personaId === o1[a2[i]]);
            break;
          case 'contacto':
            o1 = o1[a2[i]];
        }
      }
    }
    o1 && v.push(formatValue(o1[a2[a2.length - 1]], c.literalFormat));
  }
  return v.join(' ');
}

export function createDataSourceDataRow(
  p: PlanCore,
  columns: PlanesCoreTableColumn[],
  s: PlanesCoreTableSources
): any {
  const row = {
    __plan__: p
  };
  for (const c of columns) {
    row[c.name] = resolvePlanesCoreTableCellValue(p, c, s);
  }
  return row;
}

export const PLANESCORETABLE_COLUMNS_DEFAULT: PlanesCoreTableColumn[] = [
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
  },
  {
    type: TableValueType.ACTION,
    name: 'GotoVistaAdministrativo',
    label: '',
    sort: false,
    filter: false,
    actionFormat: _ => ({
      value: 'GotoVistaAdministrativo',
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
    type: TableValueType.LITERAL,
    name:
      'propietarioResponsableId.contacto.personaId.personaNombre+propietarioResponsableId.contacto.personaId.personaPrimerApellido',
    label: 'Propietario',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.LITERAL,
    name:
      'tctResponsableId.contacto.personaId.personaNombre+tctResponsableId.contacto.personaId.personaPrimerApellido',
    label: 'Arrendatario',
    sort: true,
    filter: true
  },
  {
    type: TableValueType.LITERAL,
    name: 'planEstado',
    label: 'Estado',
    sort: true,
    filter: true,
    literalFormat: e => e === 1 ? 'Edicion' : 'Presentado'
  }
];
