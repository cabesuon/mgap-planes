import { dateToString } from 'planes-core-lib';
import {
  PlanSecano,
  PlanSecanoUpdateResult
} from '../../planes-secano/planes-secano.model';
import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockUpdatePlanes implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const planes: PlanSecano[] = payload.req.body.planes;

    const response = [];

    const today = dateToString(new Date());

    let u: PlanSecano, r: PlanSecanoUpdateResult;
    for (const p of planes) {
      u = db.d.planes.find(o => o.planId === p.planId);
      if (u) {
        u = {
          ...u,
          ...p
        };
        r = {
          success: true,
          error: null,
          plan: p
        };
      } else {
        r = {
          success: false,
          error: {
            code: 404,
            description: 'No se encontro el plan.'
          },
          plan: p
        };
      }
      response.push(r);
    }

    return {
      updateResults: response
    };
  }
}
