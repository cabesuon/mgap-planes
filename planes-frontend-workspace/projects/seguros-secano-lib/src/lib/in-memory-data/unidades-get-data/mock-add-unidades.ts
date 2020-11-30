import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';
import { UnidadManejoSegurosSecano } from '../../unidades-manejos-seguros-secano/unidades-manejos-seguros-secano.model';

export class MockAddUnidades implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const unidades: UnidadManejoSegurosSecano[] = payload.req.body.unidades;

    const response = [];
    console.log("mockaddunidades");
    console.log(unidades);
    for (const u of unidades) {
      u.unidadId = db.nextId();
      db.d.unidades.push(u);
      response.push({
        success: true,
        error: null,
        unidad: u
      });
    }

    return {
      addResults: response
    };
  }
}
