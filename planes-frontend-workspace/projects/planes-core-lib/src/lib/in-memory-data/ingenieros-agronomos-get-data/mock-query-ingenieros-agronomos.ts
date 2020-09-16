import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryIngenierosAgronomos implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const agronomosId = new Set(payload.req.body.ingenierosAgronomosId);
    if (!agronomosId || agronomosId.size === 0) {
      const token = payload.req.body.token;
      const planes = db.getPlanesCoreByPersonaId(
        db.getPersonaCoreByToken(token).personaId
      );
      for (const plan of planes) {
        agronomosId.add(plan.ingenieroAgronomoId);
      }
    }
    const response = {
      queryResults: {
        success: true,
        error: null,
        ingenierosAgronomos: db.ingenierosAgronomos.filter(agronomo =>
          agronomosId.has(agronomo.ingenieroAgronomoId)
        )
      }
    };
    return response;
  }
}
