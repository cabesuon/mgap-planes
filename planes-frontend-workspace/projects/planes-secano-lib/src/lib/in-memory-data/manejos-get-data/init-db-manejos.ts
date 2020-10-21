import { GetData } from '../get-data';
import { ManejoSecano } from '../../manejos-secano/manejos-secano.model';

export class InitDbManejos implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbManejos: ManejoSecano[] = [];
    return initialDbManejos;
  }
}
