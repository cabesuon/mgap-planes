import { ChatSecano } from '../../chat-secano/chat-secano.model';
import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockAddChat implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const chats: ChatSecano[] = payload.req.body.componentes;
    const response = [];

    for (const c of chats) {
      c.mensajeId = db.nextId();
      db.d.chats.push(c);
      response.push({
        success: true,
        error: { code: 0, description: null },
        chat: c
      });
    }

    return {
      addResults: response
    };
  }
}
