import { GetData } from '../get-data';
import { ResponsableSecano } from '../../responsables-secano/responsables-secano.model';

export class InitDbResponsables implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbResponsables: ResponsableSecano[] = [];
    return initialDbResponsables;
  }
}
