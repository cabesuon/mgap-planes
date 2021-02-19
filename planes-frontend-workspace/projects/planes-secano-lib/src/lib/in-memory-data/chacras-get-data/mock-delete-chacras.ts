import { dateToString } from 'planes-core-lib';
import {
  ChacraSecano,
  ChacraSecanoDeleteResult
} from '../../chacras-secano/chacras-secano.model';
import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockDeleteChacras implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const chacrasIds: string[] = payload.req.body.ids;

    const response = [];

    const today = dateToString(new Date());

    let d: ChacraSecano, r: ChacraSecanoDeleteResult;
    for (const chacraId of chacrasIds) {
      d = db.d.chacras.find(o => o.chacraId === chacraId);
      if (d) {
        // deberia chequear si el plan asociado esta en edicion para eliminar
        // o en presentacion para cancelar
        db.removeChacra(chacraId);
        r = {
          success: true,
          error: null,
          chacraId: chacraId
        };
      } else {
        r = {
          success: false,
          error: {
            code: 404,
            description: 'No se encontro la chacra.'
          },
          chacraId: chacraId
        };
      }

      response.push(r);
    }

    return {
      deleteResults: response
    };
  }
}
