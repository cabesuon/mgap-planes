import { GetData } from '../get-data';
import {
  PlanSecano,
  createBasePlanSecano
} from '../../planes-secano/planes-secano.model';

export class InitDbPlanes implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbPlanes: PlanSecano[] = [
      createBasePlanSecano(
        '1',
        1,
        '1',
        ['1'],
        [],
        '01/01/2020',
        null,
        null,
        '2',
        null
      ),
      createBasePlanSecano(
        '2',
        1,
        '2',
        ['2'],
        [],
        '01/01/2018',
        null,
        null,
        '3',
        null
      ),
      createBasePlanSecano(
        '3',
        1,
        '1',
        ['2'],
        ['1'],
        '01/01/2020',
        null,
        null,
        '3',
        '4'
      ),
      createBasePlanSecano(
        '4',
        1,
        '2',
        ['1'],
        ['2'],
        '01/01/2018',
        null,
        null,
        '2',
        '5'
      ),
      createBasePlanSecano(
        '5',
        2,
        '1',
        ['1'],
        [],
        '01/01/2018',
        '01/02/2018',
        null,
        '2',
        null
      ),
      createBasePlanSecano(
        '6',
        2,
        '2',
        ['2'],
        [],
        '01/01/2018',
        '01/02/2018',
        null,
        '3',
        null
      )
    ];
    return initialDbPlanes;
  }
}
