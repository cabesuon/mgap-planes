import { GetData } from '../get-data';
import {
  PlanCore,
  createBasePlanCore
} from '../../planes-core/planes-core.model';

export class InitDbPlanes implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbPlanes: PlanCore[] = [
      createBasePlanCore(
        '1',
        1,
        '1',
        '2',
        '1',
        null,
        null,
        '01/01/2020',
        null,
        null
      ),
      createBasePlanCore(
        '2',
        4,
        '1',
        '2',
        '1',
        null,
        null,
        '01/01/2018',
        '15/01/2018',
        '01/01/2020'
      ),
      createBasePlanCore(
        '3',
        1,
        '1',
        '2',
        '1',
        null,
        null,
        '01/01/2020',
        null,
        null
      ),
      createBasePlanCore(
        '4',
        2,
        '1',
        '2',
        '1',
        '1',
        '3',
        '01/01/2019',
        '15/01/2019',
        null
      ),
      createBasePlanCore(
        '5',
        2,
        '1',
        '2',
        '1',
        '1',
        '3',
        '01/01/2018',
        '15/01/2018',
        null
      ),
      createBasePlanCore(
        '6',
        1,
        '1',
        '2',
        '1',
        '1',
        '3',
        '01/01/2020',
        null,
        null
      )
    ];
    return initialDbPlanes;
  }
}
