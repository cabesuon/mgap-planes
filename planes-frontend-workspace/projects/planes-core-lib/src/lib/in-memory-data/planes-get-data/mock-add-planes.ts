import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockAddPlanes implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const planes = payload.req.body.planes;

    const response = [];

    for (const p of planes) {
      p.PlanId = db.nextId();
      p.PlanNro = p.PlanId;
      db.planes.push(p);

      response.push({
        success: true,
        error: null,
        id: p.PlanId
      });
    }

    return response;
  }
}
