import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';
import { PersonaCore } from '../../personas-core/personas-core.model';
import { MockQueryPlanes } from '../planes-get-data';
import { PlanCore } from '../../planes-core/planes-core.model';

export class MockQueryPersonas implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const personasId = new Set(payload.req.body.personasId);
    if (!personasId || personasId.size === 0) {
      const token = payload.req.body.token;
      const planes = db.getPlanesCoreByPersonaId(
        db.getPersonaCoreByToken(token).personaId
      );
      let agronomo = null;
      for (const plan of planes) {
        personasId.add(plan.propietarioId);
        personasId.add(plan.propietarioResponsableId);
        personasId.add(plan.tenedorCualquierTituloId);
        personasId.add(plan.tctResponsableId);
        agronomo = db.getPersonaCoreByIngenieroAgronomoId(
          plan.ingenieroAgronomoId
        );
        personasId.add(agronomo ? agronomo.PersonaId : null);
      }
    }
    const response = {
      queryResults: {
        success: true,
        error: null,
        personas: db.personas.filter(persona =>
          personasId.has(persona.personaId)
        )
      }
    };
    return response;
  }
}
