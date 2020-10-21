import { GetData } from '../get-data';
import { CultivoSecano } from '../../cultivos-secano/cultivos-secano.model';

export class InitDbCultivos implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbCultivos: CultivoSecano[] = [];
    return initialDbCultivos;
  }
}
