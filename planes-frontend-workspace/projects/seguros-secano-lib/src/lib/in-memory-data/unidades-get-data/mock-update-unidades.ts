import { GetData } from '../get-data';
import { InMemoryDb } from '../in-memory-db';
import { UnidadManejoSegurosSecano } from '../../unidades-manejos-seguros-secano/unidades-manejos-seguros-secano.model';

export class MockUpdateUnidades implements GetData {
  getData(payload: any, db?: InMemoryDb): any {
    const unidades: UnidadManejoSegurosSecano[] = payload.req.body.unidades;    
    
    const response = [];
    unidades.forEach(u => {
      const unidad = db.getUnidadManejoById(u.unidadId);
      const i = db.d.unidades.indexOf(unidad);
      db.d.unidades[i] = u;
      response.push({
        success: true,
        error: null,
        unidadesManejo: u
      });
    });     
    
    return {
      updateResults: response
    };
  }
}
