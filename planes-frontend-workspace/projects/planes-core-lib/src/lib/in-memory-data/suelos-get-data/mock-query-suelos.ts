import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQuerySuelos implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const response = {
      queryResults: {
        success: true,
        error: null,
        suelos: db.d.suelos
      }
    };
    return response;
  }
}
