import {
  createBaseGeomChacraCore,
  PersonaCore,
  createBasePersonaCore,
  ContactoCore,
  createBaseContactoCore,
  EmpresaCore,
  createBaseEmpresaCore,
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
import {
  CultivoSegurosSecano
} from '../cultivos-seguros-secano/cultivos-seguros-secano.model';
import {
  CicloSegurosSecano
} from '../ciclos-seguros-secano/ciclos-seguros-secano.model';
import {
  AseguradoraSegurosSecano
} from '../aseguradoras-seguros-secano/aseguradoras-seguros-secano.model';

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

  const contactos: ContactoCore[] = [
    createBaseContactoCore('1')
  ];

  const empresas: EmpresaCore[] = [
    {
      empresaId: '1',
      tipoSocialId: null,
      empresaPersonaCi: null,
      empresaRazonSocial: 'Adken',
      empresaRut: null,
      contactos: [contactos[1]]
    },
    {
      empresaId: '2',
      tipoSocialId: null,
      empresaPersonaCi: null,
      empresaRazonSocial: 'Figares SA',
      empresaRut: null,
      contactos: [contactos[1]]
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

  const cgb = createBaseGeomChacraCore();
  const chacras: ChacraSegurosSecano[] = [
    createBaseChacraSegurosSecano('1', '2', '1',''),
    createBaseChacraSegurosSecano('2', '2', '1',''),
    createBaseChacraSegurosSecano('3', '2', '1',''),
    createBaseChacraSegurosSecano('4', '2', '1',''),

    createBaseChacraSegurosSecano('5', null, '1',''),
    createBaseChacraSegurosSecano('6', null, '1',''),


    createBaseChacraSegurosSecano('7', '3', '2',''),
    createBaseChacraSegurosSecano('8', '3', '2',''),
    createBaseChacraSegurosSecano('9', '3', '2','')
  ];

  const componentes: ComponenteProductivoSegurosSecano[] = [
    createBaseComponenteProductivoSegurosSecano(
      '1', '1', '5', '1', '6', '2', 'MA1234'
    ),
    createBaseComponenteProductivoSegurosSecano(
      '2', '2', '4', '1', '1', '1', 'BS5678'
    ),
    createBaseComponenteProductivoSegurosSecano(
      '3', '3', '5', '1', '2', '2', 'MA1234'
    ),
    createBaseComponenteProductivoSegurosSecano(
      '4', '4', '4', '1', '1', '1', 'BS5678'
    ),
    createBaseComponenteProductivoSegurosSecano(
      '5', '5', '4', '1', '1', '1', 'BS5678'
    ),
    createBaseComponenteProductivoSegurosSecano(
      '6', '6', '5', '1', '6', '2', 'MA1234'
    ),

    createBaseComponenteProductivoSegurosSecano(
      '7', '7', '3', '1', '4', '3', 'SU9810'
    ),
    createBaseComponenteProductivoSegurosSecano(
      '8', '8', '3', '1', '4', '3', 'SU9810'
    ),
    createBaseComponenteProductivoSegurosSecano(
      '9', '9', '5', '1', '6', '3', 'SU8912'
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
