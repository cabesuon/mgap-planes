import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';
import { RotacionSecano } from '../../rotaciones-secano/rotaciones-secano.model';

export class MockAddRotaciones implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const rotaciones: RotacionSecano[] = payload.req.body.rotaciones;

    const response = [];

    for (const r of rotaciones) {
      r.rotacionPlanId = db.nextId();
      db.d.rotaciones.push(r);
      response.push({
        success: true,
        error: null,
        rotacion: r
      });
    }

    return {
      addResults: response
    };
  }
}
