import { GetData } from '../get-data';
import {
  SueloCore,
  createBaseSueloCore
} from '../../suelos-core/suelos-core.model';

export class InitDbSuelos implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbSuelos: SueloCore[] = [
      createBaseSueloCore(1),
      createBaseSueloCore(2),
      createBaseSueloCore(3)
    ];
    return initialDbSuelos;
  }
}
