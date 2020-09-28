import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

import { PersonaCore } from '../../personas-core/personas-core.model';
import { MockQueryPlanes } from '../planes-get-data';
import { PlanCore } from '../../planes-core/planes-core.model';

export class MockQueryPersonas implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const token = payload.req.body.token;
    const planes = db.getPlanesCoreByPersonaId(
      db.getPersonaCoreByToken(token).personaId
    );
    const pids: string[] = [];
    let eids: string[] = [];
    let agronomo: PersonaCore = null;
    for (const plan of planes) {
      eids = eids.concat(plan.propietarios, plan.arrendatarios);
      agronomo = db.getPersonaCoreByIngenieroAgronomoId(
        plan.ingenieroAgronomoId
      );
      if (agronomo) {
        pids.push(agronomo.personaId);
      }
    }
    for (const id of new Set(eids)) {
      pids.concat(db.getPersonasFromEmpresaId(id).map(p => p.personaId));
    }
    const personasId = new Set(pids);
    const response = {
      queryResults: {
        success: true,
        error: null,
        personas: db.d.personas.filter(persona =>
          personasId.has(persona.personaId)
        )
      }
    };
    return response;
  }
}
