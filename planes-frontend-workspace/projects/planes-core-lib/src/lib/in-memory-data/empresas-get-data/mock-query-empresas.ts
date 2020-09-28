import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryEmpresas implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const token = payload.req.body.token;
    const persona = db.getPersonaCoreByToken(token);
    const response = {
      queryResults: {
        success: true,
        error: null,
        // ** to fix
        // empresas: db.getEmpresasCoreByPersonaId(persona.personaId)
        empresas: db.d.empresas
      }
    };
    return response;
  }
}
