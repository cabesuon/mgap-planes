import { PlanCore } from '../planes-core/planes-core.model';
import { ChacraCore } from '../chacras-core/chacras-core.model';
import { ZonaExclusionCore } from '../zonas-exclusion-core/zonas-exclusion-core.model';
import { PersonaCore } from '../personas-core/personas-core.model';
import { IngenieroAgronomoCore } from '../ingenieros-agronomos-core/ingenieros-agronomos-core.model';
import { PadronCore } from '../padrones-core/padrones-core.model';
import { SueloCore } from '../suelos-core/suelos-core.model';
import {
  EmpresaCore,
  personaRelEmpresaCore
} from '../empresas-core/empresas-core.model';

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

  getPlanesCoreByPersonaId(personaId: string): PlanCore[] {
    const agronomo = this.getIngenieroAgronomoCoreByPersonaId(personaId);
    const empresas = this.getEmpresasCoreByPersonaId(personaId);
    return this.d.planes.filter(
      plan =>
        (agronomo &&
          plan.ingenieroAgronomoId === agronomo.ingenieroAgronomoId) ||
        empresas.some(e => plan.propietarios.some(p => p === e.empresaId))
    );
  }

  getChacrasCoreByPersonaId(personaId: string): ChacraCore[] {
    const planIds = this.getPlanesCoreByPersonaId(personaId).map(p => p.planId);
    return this.d.chacras.filter(c => planIds.indexOf(c.planId) > -1);
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
}
