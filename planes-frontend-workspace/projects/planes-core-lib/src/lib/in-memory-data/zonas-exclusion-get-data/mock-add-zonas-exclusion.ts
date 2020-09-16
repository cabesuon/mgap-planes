import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockAddZonasExclusion implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const token = payload.req.body.token;
    const zonas = payload.req.body.zonasDeExclusion;
    const personaId = db.getPersonaCoreByToken(token).personaId;
    const planesId = db.getPlanesCoreByPersonaId(personaId).map(p => p.planId);
    const chacrasId = db.chacras
      .filter(c => planesId.indexOf(c.planId))
      .map(c => c.chacraId);

    let nextId = db.zonasExclusion.length;
    for (const z of zonas) {
      z.ZonaId = nextId;
      nextId++;
    }

    const response = {
      success: true,
      error: null,
      zonasDeExclusion: db.zonasExclusion.concat(zonas)
    };
    return response;
  }
}
