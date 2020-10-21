import { GetData } from '../get-data';
import {
  ComponenteSecano,
  createBaseComponenteSecano
} from '../../componentes-secano/componentes-secano.model';
import { createBasePeriodoSecano } from '../../periodos-secano/periodos-secano.model';

export class InitDbPlanes implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbComponents: ComponenteSecano[] = [];
    return initialDbComponents;
  }
}
