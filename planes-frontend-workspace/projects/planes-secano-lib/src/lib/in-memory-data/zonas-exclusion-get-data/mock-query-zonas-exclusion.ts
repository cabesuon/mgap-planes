import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryZonasExclusion implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const token = payload.req.body.token;
    const personaId = db.getPersonaCoreByToken(token).personaId;
    const planesId = db
      .getPlanesSecanoByPersonaId(personaId)
      .map(p => p.planId);
    const response = {
      queryResults: {
        success: true,
        error: null,
        zonasExclusion: db.d.zonasExclusion.filter(
          z => planesId.indexOf(z.planId) > -1
        )
      }
    };
    return response;
  }
}
