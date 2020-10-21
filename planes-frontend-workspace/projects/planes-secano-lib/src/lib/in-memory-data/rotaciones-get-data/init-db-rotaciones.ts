import { GetData } from '../get-data';
import {
  RotacionSecano,
  createBaseRotacionSecano
} from '../../rotaciones-secano/rotaciones-secano.model';

export class InitDbRotaciones implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbRotaciones: RotacionSecano[] = [
      createBaseRotacionSecano('1', '1', 2020, false),
      createBaseRotacionSecano('2', '2', 2018, false),
      createBaseRotacionSecano('3', '3', 2020, true),
      createBaseRotacionSecano('4', '4', 2018, false),
      createBaseRotacionSecano('5', '5', 2018, true),
      createBaseRotacionSecano('6', '6', 2018, false)
    ];
    return initialDbRotaciones;
  }
}
