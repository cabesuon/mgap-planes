import { ZonaExclusionCore } from 'planes-core-lib';
import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockAddZonasExclusion implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const zonas: ZonaExclusionCore[] = payload.req.body.zonasExclusion;

    const response = [];

    for (const z of zonas) {
      z.zonaExclusionId = db.nextId();
      db.d.zonasExclusion.push(z);

      response.push({
        success: true,
        error: null,
        zonaExclusion: z
      });
    }

    return { addResults: response };
  }
}
