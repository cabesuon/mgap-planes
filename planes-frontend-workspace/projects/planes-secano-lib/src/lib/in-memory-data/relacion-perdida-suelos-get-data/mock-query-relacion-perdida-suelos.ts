import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryRelacionPerdidaSuelos implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const response = {
      queryResults: {
        success: true,
        error: { code: 0, description: null },
        relacionPerdidaSuelos: db.d.relacionPerdidaSuelos
      }
    };
    return response;
  }
}
