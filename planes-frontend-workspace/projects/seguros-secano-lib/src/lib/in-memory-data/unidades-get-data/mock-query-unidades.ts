import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryUnidades implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const token = payload.req.body.token;
    const personaId = db.getPersonaCoreByToken(token).personaId;
    const response = {
      queryResults: {
        success: true,
        error: null,
        unidades: db.getUnidadesManejosSegurosSecanoByPersonaId(personaId)
      }
    };
    return response;
  }
}
