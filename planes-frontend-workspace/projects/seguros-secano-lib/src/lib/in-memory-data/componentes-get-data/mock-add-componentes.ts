import { ComponenteProductivoSegurosSecano } from '../../componentes-productivos-seguros-secano/componentes-productivos-seguros-secano.model';
import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockAddComponentes implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const componentes: ComponenteProductivoSegurosSecano[] = payload.req.body.componentes;

    const response = [];

    for (const c of componentes) {
      c.componenteId = db.nextId();
      db.d.componentes.push(c);
      response.push({
        success: true,
        error: null,
        componente: c
      });
    }

    return {
      addResults: response
    };
  }
}
