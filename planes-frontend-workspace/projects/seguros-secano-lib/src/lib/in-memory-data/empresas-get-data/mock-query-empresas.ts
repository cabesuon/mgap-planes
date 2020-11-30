import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryEmpresas implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const token = payload.req.body.token;
    const persona = db.getPersonaCoreByToken(token);
    const empresas = db.getEmpresasCoreByPersonaId(persona.personaId);
    const response = {
      queryResults: {
        success: true,
        error: null,
        empresas
      }
    };
    return response;
  }
}
