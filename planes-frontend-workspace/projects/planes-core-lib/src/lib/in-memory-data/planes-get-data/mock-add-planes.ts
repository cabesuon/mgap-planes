import { dateFromString, dateToString } from '../../extras/extras-date';
import { PlanCore, PlanCoreEstado } from '../../planes-core/planes-core.model';
import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockAddPlanes implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const planes: PlanCore[] = payload.req.body.planes;

    const response = [];

    const today = dateToString(new Date());

    for (const p of planes) {
      p.planId = db.nextId();
      p.planNro = p.planId;
      p.planEstado = PlanCoreEstado.EDICION;
      p.planFechaCreacion = today;
      db.d.planes.push(p);

      response.push({
        success: true,
        error: null,
        plan: p
      });
    }

    return {
      addResults: response
    };
  }
}
