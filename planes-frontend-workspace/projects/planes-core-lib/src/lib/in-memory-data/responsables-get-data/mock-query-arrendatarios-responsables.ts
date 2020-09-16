import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryArrendatariosResponsables implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const token = payload.req.body.token;
    const personaId = db.getPersonaCoreByToken(token).personaId;
    const planes = db.getPlanesCoreByPersonaId(personaId);
    const personasId = new Set(payload.req.body.personasId);
    if (!personasId || personasId.size === 0) {
      for (const plan of planes) {
        personasId.add(plan.tctResponsableId);
      }
    }
    const response = {
      queryResults: {
        success: true,
        error: null,
        responsables: db.arrendatariosResponsables.filter(responsable =>
          personasId.has(responsable.contacto.personaId)
        )
      }
    };
    return response;
  }
}
