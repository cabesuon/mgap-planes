import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryTokens implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const tokens = payload.req.body.tokens;
    const response = {
      queryResults: {
        success: true,
        error: { code: 0, description: null },
        personasId: db.tokens
          .filter(token => {
            return tokens.indexOf(token.token) > -1;
          })
          .map(token => token.personaId)
      }
    };
    return response;
  }
}
