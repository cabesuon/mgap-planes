import { PlanSecano } from '../planes-secano/planes-secano.model';
import { ChacraSecano } from '../chacras-secano/chacras-secano.model';
import { PersonaCore } from 'planes-core-lib';
import { IngenieroAgronomoCore } from 'planes-core-lib';
import { EmpresaCore, personaRelEmpresaCore } from 'planes-core-lib';
import { RotacionSecano } from '../rotaciones-secano/rotaciones-secano.model';

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

  getIngenieroAgronomoCoreByPersonaId(
    personaId: string
  ): IngenieroAgronomoCore {
    return this.d.ingenierosAgronomos.find(
      a => a.contacto.personaId === personaId
    );
  }

  getPersonaCoreByIngenieroAgronomoId(
    ingenieroAgronomoId: string
  ): PersonaCore {
    const agronomo = this.d.ingenierosAgronomos.find(
      a => a.ingenieroAgronomoId === ingenieroAgronomoId
    );
    if (!agronomo) {
      return null;
    }
    return this.d.personas.find(
      p => p.personaId === agronomo.contacto.personaId
    );
  }

  getPlanesSecanoByPersonaId(personaId: string): PlanSecano[] {
    const agronomo = this.getIngenieroAgronomoCoreByPersonaId(personaId);
    const empresas = this.getEmpresasCoreByPersonaId(personaId);
    return this.d.planes.filter(
      plan =>
        (agronomo &&
          plan.ingenieroAgronomoId === agronomo.ingenieroAgronomoId) ||
        empresas.some(
          e =>
            plan.propietarioId === e.empresaId ||
            plan.tenedorCualquierTituloId === e.empresaId
        )
    );
  }

  getChacrasSecanoByPersonaId(personaId: string): ChacraSecano[] {
    const planIds = this.getPlanesSecanoByPersonaId(personaId).map(
      p => p.planId
    );
    return this.d.chacras.filter(c => planIds.indexOf(c.planId) > -1);
  }

  getRotacionesSecanoByPersonaId(personaId: string): RotacionSecano[] {
    const planIds = this.getPlanesSecanoByPersonaId(personaId).map(
      p => p.planId
    );
    return this.d.rotaciones.filter(
      r => planIds.indexOf(r.rotacionPlanId) > -1
    );
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

  removePlan(planId: string) {
    const index = this.d.planes.findIndex(p => p.planId === planId);
    if (index > -1) {
      this.d.planes.splice(index, 1);
      console.log(`[removePlan] ${index}`);
    }
  }

  removeChacra(chacraId: string) {
    const index = this.d.chacras.findIndex(c => c.chacraId === chacraId);
    if (index > -1) {
      this.d.chacras.splice(index, 1);
      console.log(`[removeChacra] ${index}`);
    }
  }
}
