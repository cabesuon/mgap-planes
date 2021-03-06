import { dateToString } from 'planes-core-lib';
import {
  ChacraSecano,
  ChacraSecanoUpdateResult
} from '../../chacras-secano/chacras-secano.model';
import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockUpdateChacras implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const chacras: ChacraSecano[] = payload.req.body.chacras;

    const response = [];

    const today = dateToString(new Date());

    let u: ChacraSecano, r: ChacraSecanoUpdateResult;
    for (const c of chacras) {
      u = db.d.chacras.find(o => o.chacraId === c.chacraId);
      if (u) {
        u = {
          ...u,
          ...c
        };
        r = {
          success: true,
          error: null,
          chacra: c
        };
      } else {
        r = {
          success: false,
          error: {
            code: 404,
            description: 'No se encontro la chacra.'
          },
          chacra: c
        };
      }
      response.push(r);
    }

    return {
      updateResults: response
    };
  }
}
