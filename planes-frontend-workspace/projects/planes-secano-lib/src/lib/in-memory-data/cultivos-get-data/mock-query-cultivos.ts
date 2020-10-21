import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryCultivos implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const response = {
      queryResults: {
        success: true,
        error: { code: 0, description: null },
        cultivos: db.d.cultivos
      }
    };
    return response;
  }
}
