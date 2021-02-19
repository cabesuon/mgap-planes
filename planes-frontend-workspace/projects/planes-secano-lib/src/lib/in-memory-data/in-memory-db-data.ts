import {
  createBaseGeomChacraCore,
  createBaseGeomPendienteChacraCore,
  ZonaExclusionCore,
  createBaseZonaExclusionCore,
  createBaseGeomZonaExclusionCore,
  PersonaCore,
  createBasePersonaCore,
  IngenieroAgronomoCore,
  createBaseIngenieroAgronomoCore,
  PadronCore,
  SueloCore,
  createBaseSueloCore,
  EmpresaCore,
  createBaseEmpresaCore,
  ContactoCore,
  createBaseContactoCore
} from 'planes-core-lib';

import {
  PlanSecano,
  PlanSecanoEstado,
  createBasePlanSecano
} from '../planes-secano/planes-secano.model';
import {
  ChacraSecano,
  createBaseChacraSecano
} from '../chacras-secano/chacras-secano.model';
import { ResponsableSecano } from '../responsables-secano/responsables-secano.model';
import {
  RotacionSecano,
  createBaseRotacionSecano
} from '../rotaciones-secano/rotaciones-secano.model';
import {
  ComponenteSecano,
  createBaseComponenteSecano
} from '../componentes-secano/componentes-secano.model';
import {
  PeriodoSecano,
  createBasePeriodoSecano
} from '../periodos-secano/periodos-secano.model';
import {
  CultivoSecano,
  createBaseCultivoSecano
} from '../cultivos-secano/cultivos-secano.model';
import {
  ManejoSecano,
  createBaseManejoSecano
} from '../manejos-secano/manejos-secano.model';
import {
  RelacionPerdidaSueloSecano,
  createBaseRelacionPerdidaSueloSecano
} from '../relaciones-perdida-suelo-secano/relaciones-perdida-suelo-secano.model';
import {
  RendimientoSecano,
  createBaseRendimientoSecano
} from '../rendimientos-secano/rendimientos-secano.model';
import {
  ChatSecano,
  createBaseChatSecano
} from '../chat-secano/chat-secano.model';

export interface InMemoryDbData {
  tokens: Array<{ token: string; personaId: string }>;
  personas: PersonaCore[];
  ingenierosAgronomos: IngenieroAgronomoCore[];
  empresas: EmpresaCore[];
  responsables: ResponsableSecano[];

  planes: PlanSecano[];
  chacras: ChacraSecano[];
  zonasExclusion: ZonaExclusionCore[];
  padrones: PadronCore[];
  suelos: SueloCore[];

  rotaciones: RotacionSecano[];
  componentes: ComponenteSecano[];
  cultivos: CultivoSecano[];
  manejos: ManejoSecano[];
  relacionPerdidaSuelos: RelacionPerdidaSueloSecano[];
  rendimientos: RendimientoSecano[];

  chats: ChatSecano[];
}

function createBasePeriodosSecano(
  rotacionId: string,
  componenteId: string,
  n: number
) {
  const periodos: PeriodoSecano[] = [];
  for (let i = 0; i < n; i++) {
    periodos.push(createBasePeriodoSecano(rotacionId, componenteId, `${i}`));
  }
  return periodos;
}

export function createInMemoryDataDefault(): InMemoryDbData {
  const tokens: Array<{ token: string; personaId: string }> = [
    { personaId: '1', token: '1111' },
    { personaId: '2', token: '2222' },
    { personaId: '3', token: '3333' }
  ];

  const personas: PersonaCore[] = [
    createBasePersonaCore('1'),
    createBasePersonaCore('2'),
    createBasePersonaCore('3'),
    createBasePersonaCore('4'),
    createBasePersonaCore('5'),
    createBasePersonaCore('6')
  ];

  const contactos: ContactoCore[] = [
    createBaseContactoCore('1'),
    createBaseContactoCore('2'),
    createBaseContactoCore('3'),
    createBaseContactoCore('4'),
    createBaseContactoCore('5'),
    createBaseContactoCore('6')
  ];

  const ingenierosAgronomos: IngenieroAgronomoCore[] = [
    createBaseIngenieroAgronomoCore('1', contactos[0]),
    createBaseIngenieroAgronomoCore('2', contactos[1])
  ];

  const empresas: EmpresaCore[] = [
    createBaseEmpresaCore('1', [contactos[0], contactos[2], contactos[3]]),
    createBaseEmpresaCore('2', [contactos[1], contactos[4], contactos[5]])
  ];

  const responsables: ResponsableSecano[] = [
    {
      contacto: contactos[2],
      empresaId: '1',
      emailValidado: true,
      celularValidado: true
    },
    {
      contacto: contactos[3],
      empresaId: '1',
      emailValidado: true,
      celularValidado: true
    },
    {
      contacto: contactos[4],
      empresaId: '2',
      emailValidado: true,
      celularValidado: true
    },
    {
      contacto: contactos[5],
      empresaId: '2',
      emailValidado: true,
      celularValidado: true
    }
  ];

  const cultivos: CultivoSecano[] = [];
  for (let i = 1; i <= 3; i++) {
    cultivos.push(createBaseCultivoSecano(`${i}`));
  }

  const manejos: ManejoSecano[] = [];
  for (let i = 1; i <= 3; i++) {
    manejos.push(createBaseManejoSecano(`${i}`));
  }

  const rendimientos: RendimientoSecano[] = [];
  for (let i = 1; i <= 3; i++) {
    rendimientos.push(createBaseRendimientoSecano(`${i}`));
  }

  const relacionPerdidaSuelos: RelacionPerdidaSueloSecano[] = [];
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      for (let k = 1; k <= 3; k++) {
        relacionPerdidaSuelos.push(
          createBaseRelacionPerdidaSueloSecano(
            `${i + j + k - 2}`,
            `${i}`,
            `${j}`,
            `${k}`
          )
        );
      }
    }
  }

  const rotaciones: RotacionSecano[] = [
    createBaseRotacionSecano('1', '1', 2020, false),
    createBaseRotacionSecano('2', '2', 2018, false),
    createBaseRotacionSecano('3', '3', 2020, true),
    createBaseRotacionSecano('4', '4', 2018, false),
    createBaseRotacionSecano('5', '5', 2018, true),
    createBaseRotacionSecano('6', '6', 2018, false)
  ];

  const componentes: ComponenteSecano[] = [
    createBaseComponenteSecano(
      '1',
      '1',
      2020,
      0,
      5,
      3,
      '1',
      '1',
      '1',
      createBasePeriodosSecano('1', '1', 2)
    ),
    createBaseComponenteSecano(
      '2',
      '1',
      2020,
      6,
      11,
      3,
      '2',
      '2',
      '2',
      createBasePeriodosSecano('1', '1', 2)
    ),
    createBaseComponenteSecano(
      '3',
      '2',
      2018,
      0,
      11,
      3,
      '3',
      '3',
      '3',
      createBasePeriodosSecano('1', '1', 4)
    ),
    createBaseComponenteSecano(
      '4',
      '2',
      2019,
      0,
      11,
      3,
      '1',
      '1',
      '1',
      createBasePeriodosSecano('1', '1', 3)
    ),
    createBaseComponenteSecano(
      '5',
      '3',
      2020,
      0,
      11,
      3,
      '2',
      '2',
      '2',
      createBasePeriodosSecano('1', '1', 4)
    ),
    createBaseComponenteSecano(
      '6',
      '4',
      2018,
      0,
      11,
      3,
      '3',
      '3',
      '3',
      createBasePeriodosSecano('1', '1', 1)
    ),
    createBaseComponenteSecano(
      '7',
      '5',
      2018,
      0,
      5,
      3,
      '1',
      '1',
      '1',
      createBasePeriodosSecano('1', '1', 1)
    ),
    createBaseComponenteSecano(
      '8',
      '5',
      2018,
      6,
      11,
      3,
      '2',
      '2',
      '2',
      createBasePeriodosSecano('1', '1', 2)
    ),
    createBaseComponenteSecano(
      '9',
      '5',
      2019,
      0,
      5,
      3,
      '1',
      '1',
      '1',
      createBasePeriodosSecano('1', '1', 2)
    ),
    createBaseComponenteSecano(
      '10',
      '5',
      2019,
      6,
      11,
      3,
      '2',
      '2',
      '2',
      createBasePeriodosSecano('1', '1', 1)
    ),
    createBaseComponenteSecano(
      '11',
      '6',
      2018,
      0,
      11,
      3,
      '3',
      '3',
      '3',
      createBasePeriodosSecano('1', '1', 4)
    ),
    createBaseComponenteSecano(
      '12',
      '6',
      2019,
      0,
      11,
      3,
      '1',
      '1',
      '1',
      createBasePeriodosSecano('1', '1', 2)
    )
  ];

  const planes: PlanSecano[] = [
    createBasePlanSecano(
      '1',
      PlanSecanoEstado.EDICION,
      '1',
      '1',
      null,
      '01/01/2020',
      null,
      null,
      '3',
      null,
      false,
      false,
      false
    ),
    createBasePlanSecano(
      '2',
      PlanSecanoEstado.EDICION,
      '2',
      '2',
      null,
      '01/01/2018',
      null,
      null,
      '4',
      null,
      false,
      false,
      false
    ),
    createBasePlanSecano(
      '3',
      PlanSecanoEstado.EDICION,
      '1',
      '2',
      '1',
      '01/01/2020',
      null,
      null,
      '4',
      '5',
      false,
      false,
      false
    ),
    createBasePlanSecano(
      '4',
      PlanSecanoEstado.EDICION,
      '2',
      '1',
      '2',
      '01/01/2018',
      null,
      null,
      '5',
      '6',
      false,
      false,
      false
    ),
    createBasePlanSecano(
      '5',
      PlanSecanoEstado.PRESENTADO,
      '1',
      '1',
      null,
      '01/01/2018',
      '01/02/2018',
      null,
      '3',
      null,
      false,
      true,
      false
    ),
    createBasePlanSecano(
      '6',
      PlanSecanoEstado.PRESENTADO,
      '2',
      '2',
      null,
      '01/01/2018',
      '01/02/2018',
      null,
      '6',
      null,
      false,
      false,
      true
    )
  ];

  const padrones: PadronCore[] = [];
  for (let i = 1; i <= 9; i++) {
    padrones.push({
      padronId: `${i}`,
      departamentoId: '1',
      departamentoNombre: 'Artigas',
      padronArea: i * 100,
      padronFueSeleccionado: i % 2 === 0
    });
  }

  const suelos: SueloCore[] = [
    createBaseSueloCore(1),
    createBaseSueloCore(2),
    createBaseSueloCore(3)
  ];

  // ----------------------------------------------------------------------
  // chacras
  const cgb = createBaseGeomChacraCore();
  const pgb = createBaseGeomPendienteChacraCore();
  const chacras: ChacraSecano[] = [];
  const chacrasPlanId = ['1', '1', '2', '3', '3', '4', '4', '4', '5', '6'];
  const D = 0.03;
  for (let i = 0; i < 9; i++) {
    chacras.push(
      createBaseChacraSecano(
        `${i + 1}`,
        chacrasPlanId[i],
        JSON.stringify(
          Object.assign({}, cgb, {
            rings: [
              cgb.rings[0].map((v: number[]) => [v[0] + i * D, v[1] + i * D])
            ]
          })
        ),
        JSON.stringify(
          Object.assign({}, pgb, {
            paths: [
              pgb.paths[0].map((v: number[]) => [v[0] + i * D, v[1] + i * D])
            ]
          })
        ),
        JSON.stringify(
          Object.assign({}, pgb, {
            paths: [
              pgb.paths[0].map((v: number[]) => [v[0] + i * D, v[1] + i * D])
            ]
          })
        ),
        [padrones[i]],
        [suelos[i % suelos.length]]
      )
    );
  }

  // ----------------------------------------------------------------------
  // zonas exclusion
  const zb = createBaseZonaExclusionCore();
  const zgb = createBaseGeomZonaExclusionCore();
  const zonasExclusion: ZonaExclusionCore[] = [];
  for (let i = 0; i < 9; i++) {
    zonasExclusion.push(
      Object.assign({}, zb, {
        ZonaExclusionId: `${i + 1}`,
        ChacraId: `${i + 1}`,
        ZonaExclusionGeometria: JSON.stringify(
          Object.assign({}, zgb, {
            rings: [
              zgb.rings[0].map((v: number[]) => [v[0] + i * D, v[1] + i * D])
            ]
          })
        )
      })
    );
  }
  // ----------------------------------------------------------------------
  const chats: ChatSecano[] = [
    createBaseChatSecano(
      '1',
      '2017-06-28T15:50:57',
      '3',
      'Observaciones de verificación',
      true,
      '0',
      '1'
    ),
    createBaseChatSecano(
      '3',
      '2018-04-16T15:09:24',
      '1',
      'Se ha vencido el plazo para la contrucción de terrazas para el plan número 9.\r\nEl problema se prensentó en: \r\n',
      false,
      '0',
      '9'
    ),
    createBaseChatSecano(
      '24',
      '2018-04-16T15:09:27',
      '1',
      'Se ha vencido el plazo para la contrucción de terrazas para el plan número 9.\r\nEl problema se prensentó en: \r\n',
      false,
      '0',
      '9'
    ),
    createBaseChatSecano(
      '9',
      '2017-11-13T15:20:01',
      '3',
      'Se ha deshabilitado la edición de la rotación del plan',
      true,
      '0',
      '4088'
    )
  ];

  return {
    tokens,
    personas,
    ingenierosAgronomos,
    empresas,
    planes,
    chacras,
    zonasExclusion,
    padrones,
    suelos,
    responsables,
    rotaciones,
    componentes,
    cultivos,
    manejos,
    relacionPerdidaSuelos,
    rendimientos,
    chats
  };
}
