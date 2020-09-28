import { GetData } from '../get-data';
import {
  PlanCore,
  createBasePlanCore
} from '../../planes-core/planes-core.model';

export class InitDbPlanes implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbPlanes: PlanCore[] = [
      createBasePlanCore('1', 1, '1', ['1'], [], '01/01/2020', null, null),
      createBasePlanCore('2', 1, '2', ['2'], [], '01/01/2018', null, null),
      createBasePlanCore('3', 1, '1', ['2'], ['1'], '01/01/2020', null, null),
      createBasePlanCore('4', 1, '2', ['1'], ['2'], '01/01/2018', null, null),
      createBasePlanCore(
        '5',
        2,
        '1',
        ['1'],
        [],
        '01/01/2018',
        '01/02/2018',
        null
      ),
      createBasePlanCore(
        '6',
        2,
        '2',
        ['2'],
        [],
        '01/01/2018',
        '01/02/2018',
        null
      )
    ];
    return initialDbPlanes;
  }
}
