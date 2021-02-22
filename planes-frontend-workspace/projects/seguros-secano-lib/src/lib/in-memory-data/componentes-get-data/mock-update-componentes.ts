import { ComponenteProductivoSegurosSecano } from '../../componentes-productivos-seguros-secano/componentes-productivos-seguros-secano.model';
import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';

export class MockUpdateComponentes implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const componentes: ComponenteProductivoSegurosSecano[] =
      payload.req.body.componentes;

    const response = [];
    for (const c of componentes) {      
      let i = db.d.componentes.indexOf(db.getComponenteById(c.componenteId));      
      db.d.componentes[i] = c;

      response.push({
        success: true,
        error: null,
        componente: c
      });
    }
    return {
      updateResults: response
    };
  }
}
