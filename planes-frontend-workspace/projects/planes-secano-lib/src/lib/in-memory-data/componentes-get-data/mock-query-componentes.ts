import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryComponentes implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const token = payload.req.body.token;
    const personaId = db.getPersonaCoreByToken(token).personaId;
    const rotaciones = db.getRotacionesSecanoByPersonaId(personaId);
    const response = {
      queryResults: {
        success: true,
        error: null,
        componentes: db.d.componentes.filter(c =>
          rotaciones.some(r => r.rotacionId === c.rotacionId)
        )
      }
    };
    return response;
  }
}
