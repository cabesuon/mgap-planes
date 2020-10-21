import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryManejos implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const response = {
      queryResults: {
        success: true,
        error: { code: 0, description: null },
        manejos: db.d.manejos
      }
    };
    return response;
  }
}
