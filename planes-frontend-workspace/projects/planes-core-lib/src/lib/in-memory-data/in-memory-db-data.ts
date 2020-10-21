import { PlanCore, createBasePlanCore } from '../planes-core/planes-core.model';
import {
  ChacraCore,
  createBaseGeomChacraCore,
  createBaseGeomPendienteChacraCore,
  createBaseChacraCore
} from '../chacras-core/chacras-core.model';
import {
  ZonaExclusionCore,
  createBaseZonaExclusionCore,
  createBaseGeomZonaExclusionCore
} from '../zonas-exclusion-core/zonas-exclusion-core.model';
import {
  PersonaCore,
  createBasePersonaCore
} from '../personas-core/personas-core.model';
import {
  IngenieroAgronomoCore,
  createBaseIngenieroAgronomoCore
} from '../ingenieros-agronomos-core/ingenieros-agronomos-core.model';
import { PadronCore } from '../padrones-core/padrones-core.model';
import {
  SueloCore,
  createBaseSueloCore
} from '../suelos-core/suelos-core.model';
import {
  EmpresaCore,
  createBaseEmpresaCore
} from '../empresas-core/empresas-core.model';
import {
  ContactoCore,
  createBaseContactoCore
} from '../contacto-core/contacto-core.model';

export interface InMemoryDbData {
  tokens: Array<{ token: string; personaId: string }>;
  personas: PersonaCore[];
  ingenierosAgronomos: IngenieroAgronomoCore[];
  empresas: EmpresaCore[];
  planes: PlanCore[];
  chacras: ChacraCore[];
  zonasExclusion: ZonaExclusionCore[];
  padrones: PadronCore[];
  suelos: SueloCore[];
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
  const planes: PlanCore[] = [
    createBasePlanCore('1', 1, '1', ['1'], [], '01/01/2020', null, null),
    createBasePlanCore('2', 1, '2', ['2'], [], '01/01/2018', null, null),
    createBasePlanCore('3', 1, '1', ['2'], ['1'], '01/01/2020', null, null),
    createBasePlanCore('4', 1, '2', ['1'], ['2'], '01/01/2018', null, null),
    createBasePlanCore(
      '5',
      2,
      '1',
      ['1'],
      [],
      '01/01/2018',
      '01/02/2018',
      null
    ),
    createBasePlanCore('6', 2, '2', ['2'], [], '01/01/2018', '01/02/2018', null)
  ];

  const padrones: PadronCore[] = [];
  for (let i = 1; i <= 9; i++) {
    padrones.push({
      padronId: `${i}`,
      padronCodigoDepartamento: '1',
      padrondDepartamento: 'Artigas',
      padronAreaHa: i * 100
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
  const chacras: ChacraCore[] = [];
  const chacrasPlanId = ['1', '1', '2', '3', '3', '4', '4', '4', '5', '6'];
  const D = 0.03;
  for (let i = 0; i < 9; i++) {
    chacras.push(
      createBaseChacraCore(
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

  return {
    tokens,
    personas,
    ingenierosAgronomos,
    empresas,
    planes,
    chacras,
    zonasExclusion,
    padrones,
    suelos
  };
}
