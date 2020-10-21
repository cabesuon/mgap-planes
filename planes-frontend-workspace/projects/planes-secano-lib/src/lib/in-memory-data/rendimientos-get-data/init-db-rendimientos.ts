import { GetData } from '../get-data';
import { RendimientoSecano } from '../../rendimientos-secano/rendimientos-secano.model';

export class InitDbRendimientos implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbRendimientos: RendimientoSecano[] = [];
    return initialDbRendimientos;
  }
}
