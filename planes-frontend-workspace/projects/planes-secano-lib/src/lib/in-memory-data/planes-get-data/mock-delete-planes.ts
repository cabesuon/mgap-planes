import { dateToString } from 'planes-core-lib';
import {
  PlanSecano,
  PlanSecanoEstado,
  PlanSecanoDeleteResult
} from '../../planes-secano/planes-secano.model';
import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockDeletePlanes implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const planesIds: string[] = payload.req.body.ids;
    console.log(`[MockDeletePlanes] planesId: ${planesIds.join('')}`);
    const response = [];

    const today = dateToString(new Date());

    let d: PlanSecano, r: PlanSecanoDeleteResult;
    for (const planId of planesIds) {
      d = db.d.planes.find(o => o.planId === planId);
      if (d) {
        // deberia chequear si esta en edicion para eliminar
        // o en presentacion para cancelar
        db.removePlan(planId);
        r = {
          success: true,
          error: null,
          planId: planId
        };
      } else {
        r = {
          success: false,
          error: {
            code: 404,
            description: 'No se encontro el plan.'
          },
          planId: planId
        };
      }

      response.push(r);
    }

    console.log(
      `[MockDeletePlanes] success: ${response.map(r => r.success).join('')}`
    );

    return {
      deleteResults: response
    };
  }
}
