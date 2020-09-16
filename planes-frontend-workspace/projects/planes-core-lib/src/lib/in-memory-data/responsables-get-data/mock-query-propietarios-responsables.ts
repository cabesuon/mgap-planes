import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryPropietariosResponsables implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const personasId = new Set(payload.req.body.personasId);
    if (!personasId || personasId.size === 0) {
      const token = payload.req.body.token;
      const planes = db.getPlanesCoreByPersonaId(
        db.getPersonaCoreByToken(token).personaId
      );
      for (const plan of planes) {
        personasId.add(plan.propietarioResponsableId);
      }
    }
    const response = {
      queryResults: {
        success: true,
        error: null,
        responsables: db.propietariosResponsables.filter(responsable =>
          personasId.has(responsable.contacto.personaId)
        )
      }
    };
    return response;
  }
}
