import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockQueryComponentes implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    //const token = payload.req.body.token;
    //const personaId = db.getPersonaCoreByToken(token).personaId;
    //const chacras = db.getChacrasSegurosSecanoByPersonaId(personaId);
    const response = {
      queryResults: {
        success: true,
        error: null,
        //componentes: db.d.componentes.filter(co =>
        //  chacras.some(ch => ch.chacraId === co.chacraId)
        //)
        componentes: db.d.componentes
      }
    };
    //console.log("MockQueryComponentes");
    //console.log(response);
    return response;
  }
}
