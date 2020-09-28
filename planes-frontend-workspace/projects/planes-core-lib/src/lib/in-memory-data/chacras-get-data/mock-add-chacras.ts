import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';
import { ChacraCore } from '../../chacras-core/chacras-core.model';

export class MockAddChacras implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const chacras: ChacraCore[] = payload.req.body.chacras;

    const response = [];

    for (const c of chacras) {
      c.chacraId = db.nextId();
      c.chacraNro = c.chacraId;
      db.d.chacras.push(c);
      response.push({
        success: true,
        error: null,
        chacra: c
      });
    }

    return {
      addResults: response
    };
  }
}
