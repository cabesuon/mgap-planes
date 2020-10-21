import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryChacras implements GetData {
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
        chacras: db.d.chacras.filter(c => planesId.indexOf(c.planId) > -1)
      }
    };
    return response;
  }
}
