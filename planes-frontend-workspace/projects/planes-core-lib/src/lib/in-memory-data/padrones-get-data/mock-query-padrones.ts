import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryPadrones implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const response = {
      queryResults: {
        success: true,
        error: null,
        padrones: db.d.padrones
      }
    };
    return response;
  }
}
