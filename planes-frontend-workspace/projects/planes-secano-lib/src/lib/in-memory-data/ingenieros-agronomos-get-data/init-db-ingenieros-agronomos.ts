import { GetData } from '../get-data';
import { IngenieroAgronomoCore, createBaseIngenieroAgronomoCore } from 'planes-core-lib';


export class InitDbIngenierosAgronomos implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbIngenierosAgronomos: IngenieroAgronomoCore[] = [
      createBaseIngenieroAgronomoCore('1', null, '1')
    ];
    return initialDbIngenierosAgronomos;
  }
}
