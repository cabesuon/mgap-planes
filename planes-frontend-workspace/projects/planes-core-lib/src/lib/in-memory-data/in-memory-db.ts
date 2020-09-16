import { PlanCore, personaRelPlanCore } from '../planes-core/planes-core.model';
import { ChacraCore } from '../chacras-core/chacras-core.model';
import { ZonaExclusionCore } from '../zonas-exclusion-core/zonas-exclusion-core.model';
import { PersonaCore } from '../personas-core/personas-core.model';
import { IngenieroAgronomoCore } from '../ingenieros-agronomos-core/ingenieros-agronomos-core.model';
import { ResponsableCore } from '../responsables-core/responsables-core.model';

export class InMemoryDb {
  id: number;
  constructor(
    public tokens: Array<{ token: string; personaId: string }>,

    public personas: PersonaCore[],
    public ingenierosAgronomos: IngenieroAgronomoCore[],
    public propietariosResponsables: ResponsableCore[],
    public arrendatariosResponsables: ResponsableCore[],

    public planes: PlanCore[],
    public chacras: ChacraCore[],
    public zonasExclusion: ZonaExclusionCore[]
  ) {
    this.id = 1000;
  }

  nextId(): string {
    return `${this.id++}`;
  }

  getPersonaCoreByToken(token: string): PersonaCore {
    const tokenPersona = this.tokens.find(t => t.token === token);
    if (tokenPersona) {
      return this.personas.find(p => p.personaId === tokenPersona.personaId);
    }
    return null;
  }

  getIngenieroAgronomoCoreByPersonaId(
    personaId: string
  ): IngenieroAgronomoCore {
    return this.ingenierosAgronomos.find(
      a => a.contacto.personaId === personaId
    );
  }

  getPersonaCoreByIngenieroAgronomoId(
    ingenieroAgronomoId: string
  ): PersonaCore {
    const agronomo = this.ingenierosAgronomos.find(
      a => a.ingenieroAgronomoId === ingenieroAgronomoId
    );
    if (!agronomo) {
      return null;
    }
    return this.personas.find(p => p.personaId === agronomo.contacto.personaId);
  }

  getPlanesCoreByPersonaId(personaId: string): PlanCore[] {
    const agronomo = this.getIngenieroAgronomoCoreByPersonaId(personaId);
    return this.planes.filter(plan =>
      personaRelPlanCore(
        plan,
        personaId,
        agronomo ? agronomo.ingenieroAgronomoId : null
      )
    );
  }

  getChacrasCoreByPersonaId(personaId: string): ChacraCore[] {
    const planIds = this.getPlanesCoreByPersonaId(personaId).map(p => p.planId);
    return this.chacras.filter(c => planIds.indexOf(c.planId) > -1);
  }
}
