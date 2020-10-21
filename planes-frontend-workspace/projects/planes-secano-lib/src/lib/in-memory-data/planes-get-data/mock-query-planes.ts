import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryPlanes implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const token = payload.req.body.token;
    const persona = db.getPersonaCoreByToken(token);
    const response = {
      queryResults: {
        success: true,
        error: null,
        planes: db.getPlanesSecanoByPersonaId(persona.personaId)
      }
    };
    return response;
  }
}
