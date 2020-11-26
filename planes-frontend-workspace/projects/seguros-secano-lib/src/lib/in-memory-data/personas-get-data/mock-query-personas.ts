import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

import { PersonaCore } from 'planes-core-lib';

export class MockQueryPersonas implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const token = payload.req.body.token;
    const response = {
      queryResults: {
        success: true,
        error: null,
        //personas: db.getPersonaCoreByToken(token).personaId
        personas: db.d.personas
      }
    };
    return response;
  }
}
