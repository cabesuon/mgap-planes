import { GetData } from '../get-data';
import { RelacionPerdidaSueloSecano } from '../../relaciones-perdida-suelo-secano/relaciones-perdida-suelo-secano.model';

export class InitDbRelacionPerdidaSuelo implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbRelacionPerdidaSuelo: RelacionPerdidaSueloSecano[] = [];
    return initialDbRelacionPerdidaSuelo;
  }
}
