import {
  createBaseGeomChacraCore,
  PersonaCore,
  createBasePersonaCore,
  ContactoCore,
  createBaseContactoCore,
  EmpresaCore,
  createBaseEmpresaCore
} from 'planes-core-lib';

import {
  UnidadManejoSegurosSecano,
  createBaseUnidadManejoSegurosSecano
} from '../unidades-manejos-seguros-secano/unidades-manejos-seguros-secano.model';
import {
  ChacraSegurosSecano,
  createBaseChacraSegurosSecano
} from '../chacras-seguros-secano/chacras-seguros-secano.model';
import {
  ComponenteProductivoSegurosSecano,
  createBaseComponenteProductivoSegurosSecano
} from '../componentes-productivos-seguros-secano/componentes-productivos-seguros-secano.model';
import { CultivoSegurosSecano } from '../cultivos-seguros-secano/cultivos-seguros-secano.model';
import { CicloSegurosSecano } from '../ciclos-seguros-secano/ciclos-seguros-secano.model';
import { AseguradoraSegurosSecano } from '../aseguradoras-seguros-secano/aseguradoras-seguros-secano.model';

export interface InMemoryDbData {
  tokens: Array<{ token: string; personaId: string }>;
  personas: PersonaCore[];
  empresas: EmpresaCore[];
  aseguradoras: AseguradoraSegurosSecano[];
  unidades: UnidadManejoSegurosSecano[];
  chacras: ChacraSegurosSecano[];
  componentes: ComponenteProductivoSegurosSecano[];
  cultivos: CultivoSegurosSecano[];
  ciclos: CicloSegurosSecano[];
}

function randomNumber(b: number): number {
  return Math.random() * b;
}

export function createInMemoryDataDefault(): InMemoryDbData {
  const tokens: Array<{ token: string; personaId: string }> = [
    { personaId: '1', token: '1111' }
  ];

  const personas: PersonaCore[] = [
    {
      personaId: '1',
      personaCedula: '11111111',
      personaNombre: 'Carlos',
      personaPrimerApellido: 'Pecceto',
      personaSegundoApellido: null,
      personaFechaDeNacimiento: null
    }
  ];

  const contactos: ContactoCore[] = [createBaseContactoCore('1')];

  const empresas: EmpresaCore[] = [
    {
      empresaId: '1',
      tipoSocialId: null,
      empresaPersonaCi: null,
      empresaRazonSocial: 'Adken',
      empresaRut: '111122223333',
      contactos: [contactos[0]]
    },
    {
      empresaId: '2',
      tipoSocialId: null,
      empresaPersonaCi: null,
      empresaRazonSocial: 'Figares SA',
      empresaRut: null,
      contactos: [contactos[0]]
    }
  ];

  const aseguradoras: AseguradoraSegurosSecano[] = [
    { aseguradoraId: '1', aseguradoraNombre: 'BSE' },
    { aseguradoraId: '2', aseguradoraNombre: 'Mapfre' },
    { aseguradoraId: '3', aseguradoraNombre: 'SURA' }
  ];

  const cultivos: CultivoSegurosSecano[] = [
    { cultivoId: '1', cultivoNombre: 'Barbecho' },
    { cultivoId: '2', cultivoNombre: 'Cebada' },
    { cultivoId: '3', cultivoNombre: 'Cobertura' },
    { cultivoId: '4', cultivoNombre: 'Maíz' },
    { cultivoId: '5', cultivoNombre: 'Soja' },
    { cultivoId: '6', cultivoNombre: 'Trigo' }
  ];

  const ciclos: CicloSegurosSecano[] = [
    { cicloId: '1', cicloNombre: 'Corto' },
    { cicloId: '2', cicloNombre: 'Intermedio' },
    { cicloId: '3', cicloNombre: 'Largo' }
  ];

  const unidades: UnidadManejoSegurosSecano[] = [
    {
      unidadId: '1',
      unidadNombre: 'Las Glicinas',
      empresaId: '1',
      cultivoId: null,
      cicloId: null,
      cultivoAntecesorId: null,
      aseguradoraId: null,
      polizaId: null,
      superficieSembrada: null,
      superficieCocechada: null,
      fechaSiembra: null,
      fechaCocecha: null,
      fertilizacionP2O5: null,
      fertilizacionK2O: null,
      fertilizacionN: null,
      fertilizacionS: null,
      analisisSueloPBray: null,
      analisisSueloK: null,
      rendimiento: null,
      zafra: null,
      anio: null,
      fechaCreado: null,
      fechaModificado: null,
      fechaEnviado: null
    },
    {
      unidadId: '2',
      unidadNombre: 'Las Higueras',
      empresaId: '1',
      cultivoId: null,
      cicloId: null,
      cultivoAntecesorId: null,
      aseguradoraId: null,
      polizaId: null,
      superficieSembrada: null,
      superficieCocechada: null,
      fechaSiembra: null,
      fechaCocecha: null,
      fertilizacionP2O5: null,
      fertilizacionK2O: null,
      fertilizacionN: null,
      fertilizacionS: null,
      analisisSueloPBray: null,
      analisisSueloK: null,
      rendimiento: null,
      zafra: null,
      anio: null,
      fechaCreado: null,
      fechaModificado: null,
      fechaEnviado: null
    },
    {
      unidadId: '3',
      unidadNombre: 'Buena Vista - Rocha',
      empresaId: '2',
      cultivoId: null,
      cicloId: null,
      cultivoAntecesorId: null,
      aseguradoraId: null,
      polizaId: null,
      superficieSembrada: null,
      superficieCocechada: null,
      fechaSiembra: null,
      fechaCocecha: null,
      fertilizacionP2O5: null,
      fertilizacionK2O: null,
      fertilizacionN: null,
      fertilizacionS: null,
      analisisSueloPBray: null,
      analisisSueloK: null,
      rendimiento: null,
      zafra: null,
      anio: null,
      fechaCreado: null,
      fechaModificado: null,
      fechaEnviado: null
    }
  ];

  const D = 0.03;
  const cgb = createBaseGeomChacraCore();
  const chacras: ChacraSegurosSecano[] = [
    createBaseChacraSegurosSecano(
      '1',
      '2',
      '1',
      JSON.stringify(
        Object.assign({}, cgb, {
          rings: [
            cgb.rings[0].map((v: number[]) => [v[0] + 1 * D, v[1] + 1 * D])
          ]
        })
      )
    ),
    createBaseChacraSegurosSecano(
      '2',
      '2',
      '1',
      JSON.stringify(
        Object.assign({}, cgb, {
          rings: [
            cgb.rings[0].map((v: number[]) => [v[0] + 2 * D, v[1] + 2 * D])
          ]
        })
      )
    ),
    createBaseChacraSegurosSecano(
      '3',
      '2',
      '1',
      JSON.stringify(
        Object.assign({}, cgb, {
          rings: [
            cgb.rings[0].map((v: number[]) => [v[0] + 3 * D, v[1] + 3 * D])
          ]
        })
      )
    ),
    createBaseChacraSegurosSecano(
      '4',
      '2',
      '1',
      JSON.stringify(
        Object.assign({}, cgb, {
          rings: [
            cgb.rings[0].map((v: number[]) => [v[0] + 4 * D, v[1] + 4 * D])
          ]
        })
      )
    ),

    createBaseChacraSegurosSecano(
      '5',
      null,
      '1',
      JSON.stringify(
        Object.assign({}, cgb, {
          rings: [
            cgb.rings[0].map((v: number[]) => [v[0] + 5 * D, v[1] + 5 * D])
          ]
        })
      )
    ),
    createBaseChacraSegurosSecano(
      '6',
      null,
      '1',
      JSON.stringify(
        Object.assign({}, cgb, {
          rings: [
            cgb.rings[0].map((v: number[]) => [v[0] + 6 * D, v[1] + 6 * D])
          ]
        })
      )
    ),

    createBaseChacraSegurosSecano(
      '7',
      '3',
      '2',
      JSON.stringify(
        Object.assign({}, cgb, {
          rings: [
            cgb.rings[0].map((v: number[]) => [v[0] + 7 * D, v[1] + 7 * D])
          ]
        })
      )
    ),
    createBaseChacraSegurosSecano(
      '8',
      '3',
      '2',
      JSON.stringify(
        Object.assign({}, cgb, {
          rings: [
            cgb.rings[0].map((v: number[]) => [v[0] + 8 * D, v[1] + 8 * D])
          ]
        })
      )
    ),
    createBaseChacraSegurosSecano(
      '9',
      '3',
      '2',
      JSON.stringify(
        Object.assign({}, cgb, {
          rings: [
            cgb.rings[0].map((v: number[]) => [v[0] + 9 * D, v[1] + 9 * D])
          ]
        })
      )
    )
  ];

  const componentes: ComponenteProductivoSegurosSecano[] = [
    createBaseComponenteProductivoSegurosSecano(
      '1',
      '1',
      '5',
      '1',
      '6',
      '2',
      'MA1234',
      randomNumber(1000),
      randomNumber(1000),
      new Date(2020, 12, 20),
      new Date(2020, 12, 20),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      'Verano',
      2020,
      new Date(2020, 7, 1),
      new Date(2020, 12, 22),
      new Date(2020, 12, 22)
    ),
    createBaseComponenteProductivoSegurosSecano(
      '2',
      '2',
      '4',
      '1',
      '1',
      '1',
      'BS5678',
      randomNumber(1000),
      randomNumber(1000),
      new Date(2020, 12, 20),
      new Date(2020, 12, 20),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      'Verano',
      2020,
      new Date(2020, 7, 1),
      new Date(2020, 12, 22),
      new Date(2020, 12, 22)
    ),
    createBaseComponenteProductivoSegurosSecano(
      '3',
      '3',
      '5',
      '1',
      '2',
      '2',
      'MA1234',
      randomNumber(1000),
      randomNumber(1000),
      new Date(2020, 12, 20),
      new Date(2020, 12, 20),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      'Verano',
      2020,
      new Date(2020, 7, 1),
      new Date(2020, 12, 22),
      new Date(2020, 12, 22)
    ),
    createBaseComponenteProductivoSegurosSecano(
      '4',
      '4',
      '4',
      '1',
      '1',
      '1',
      'BS5678',
      randomNumber(1000),
      randomNumber(1000),
      new Date(2020, 12, 20),
      new Date(2020, 12, 20),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      'Verano',
      2020,
      new Date(2020, 7, 1),
      new Date(2020, 12, 22),
      new Date(2020, 12, 22)
    ),
    createBaseComponenteProductivoSegurosSecano(
      '5',
      '5',
      '4',
      '1',
      '1',
      '1',
      'BS5678',
      randomNumber(1000),
      randomNumber(1000),
      new Date(2020, 12, 20),
      new Date(2020, 12, 20),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      'Verano',
      2020,
      new Date(2020, 7, 1),
      new Date(2020, 12, 22),
      new Date(2020, 12, 22)
    ),
    createBaseComponenteProductivoSegurosSecano(
      '6',
      '6',
      '5',
      '1',
      '6',
      '2',
      'MA1234',
      randomNumber(1000),
      randomNumber(1000),
      new Date(2020, 12, 20),
      new Date(2020, 12, 20),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      'Verano',
      2020,
      new Date(2020, 7, 1),
      new Date(2020, 12, 22),
      new Date(2020, 12, 22)
    ),

    createBaseComponenteProductivoSegurosSecano(
      '7',
      '7',
      '3',
      '1',
      '4',
      '3',
      'SU9810',
      randomNumber(1000),
      randomNumber(1000),
      new Date(2020, 12, 20),
      new Date(2020, 12, 20),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      'Verano',
      2020,
      new Date(2020, 7, 1),
      new Date(2020, 12, 22),
      new Date(2020, 12, 22)
    ),
    createBaseComponenteProductivoSegurosSecano(
      '8',
      '8',
      '3',
      '1',
      '4',
      '3',
      'SU9810',
      randomNumber(1000),
      randomNumber(1000),
      new Date(2020, 12, 20),
      new Date(2020, 12, 20),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      'Verano',
      2020,
      new Date(2020, 7, 1),
      new Date(2020, 12, 22),
      new Date(2020, 12, 22)
    ),
    createBaseComponenteProductivoSegurosSecano(
      '9',
      '9',
      '5',
      '1',
      '6',
      '3',
      'SU8912',
      randomNumber(1000),
      randomNumber(1000),
      new Date(2020, 12, 20),
      new Date(2020, 12, 20),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      randomNumber(1000),
      'Verano',
      2020,
      new Date(2020, 7, 1),
      new Date(2020, 12, 22),
      new Date(2020, 12, 22)
    )
  ];

  return {
    tokens,
    personas,
    empresas,
    aseguradoras,
    unidades,
    chacras,
    componentes,
    cultivos,
    ciclos
  };
}
