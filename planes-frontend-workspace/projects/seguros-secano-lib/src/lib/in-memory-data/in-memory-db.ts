import { ChacraSegurosSecano } from '../chacras-seguros-secano/chacras-seguros-secano.model';
import { ComponenteProductivoSegurosSecano } from '../componentes-productivos-seguros-secano/componentes-productivos-seguros-secano.model';
import { UnidadManejoSegurosSecano } from '../unidades-manejos-seguros-secano/unidades-manejos-seguros-secano.model';
import { PersonaCore } from 'planes-core-lib';
import { EmpresaCore, personaRelEmpresaCore } from 'planes-core-lib';

import { InMemoryDbData } from './in-memory-db-data';

export class InMemoryDb {
  id: number;
  constructor(public d: InMemoryDbData) {
    this.id = 1000;
  }

  nextId(): string {
    return `${this.id++}`;
  }

  getPersonaCoreByToken(token: string): PersonaCore {
    const tokenPersona = this.d.tokens.find(t => t.token === token);
    if (tokenPersona) {
      return this.d.personas.find(p => p.personaId === tokenPersona.personaId);
    }
    return null;
  }

  getEmpresasCoreByPersonaId(personaId: string): EmpresaCore[] {
    return this.d.empresas.filter(e => personaRelEmpresaCore(e, personaId));
  }

  getPersonasFromEmpresaId(empresaId: string): PersonaCore[] {
    const empresa: EmpresaCore = this.d.empresas.find(
      e => e.empresaId === empresaId
    );
    const personasId: string[] = empresa.contactos.map(c => c.personaId);
    return this.d.personas.filter(p =>
      personasId.some(id => id === p.personaId)
    );
  }

  getUnidadesManejosSegurosSecanoByPersonaId(
    personaId: string
  ): UnidadManejoSegurosSecano[] {
    const empresas = this.getEmpresasCoreByPersonaId(personaId);
    return this.d.unidades.filter(u =>
      empresas.some(e => e.empresaId === u.empresaId)
    );
  }

  getChacrasSegurosSecanoByPersonaId(personaId: string): ChacraSegurosSecano[] {
    const empresas = this.getEmpresasCoreByPersonaId(personaId);
    return this.d.chacras.filter(chacra =>
      empresas.some(e => e.empresaId === chacra.empresaId)
    );
  }
}
