import { dateToString } from 'planes-core-lib';
import {
  ChacraSegurosSecano,
  ChacraSegurosSecanoDeleteResult
} from '../../chacras-seguros-secano/chacras-seguros-secano.model';
import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockDeleteChacras implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    console.log("payload");
    console.log(payload);
    const chacrasIds: string[] = payload.req.body.chacrasIds;

    const response = [];

    const today = dateToString(new Date());

    let d: ChacraSegurosSecano, r: ChacraSegurosSecanoDeleteResult;
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
    console.log(response);
    return {
      deleteResults: response
    };
  }
}