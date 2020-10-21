import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryResponsables implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const response = {
      queryResults: {
        success: true,
        error: null,
        responsables: db.d.responsables
      }
    };
    return response;
  }
}
