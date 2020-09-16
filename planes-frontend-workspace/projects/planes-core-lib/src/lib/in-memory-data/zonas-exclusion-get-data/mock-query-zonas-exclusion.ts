import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryZonasExclusion implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const token = payload.req.body.token;
    const personaId = db.getPersonaCoreByToken(token).personaId;
    const planesId = db.getPlanesCoreByPersonaId(personaId).map(p => p.planId);
    const chacrasId = db.chacras
      .filter(c => planesId.indexOf(c.planId) > -1)
      .map(c => c.chacraId);
    const response = {
      queryResults: {
        success: true,
        error: null,
        zonasExclusion: db.zonasExclusion.filter(
          z => chacrasId.indexOf(z.chacraId) > -1
        )
      }
    };
    return response;
  }
}
