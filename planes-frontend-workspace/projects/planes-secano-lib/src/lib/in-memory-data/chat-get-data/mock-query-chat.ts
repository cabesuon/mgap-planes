import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryChat implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const token = payload.req.body.token;
    const response = {
      queryResults: {
        success: true,
        error: { code: 0, description: null },
        mensajes: db.d.chats
      }
    };
    return response;
  }
}
