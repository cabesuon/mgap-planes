import { GetData } from '../get-data';
import { ContactoCore } from '../../contacto-core/contacto-core.model';
import {
  IngenieroAgronomoCore,
  createBaseIngenieroAgronomoCore
} from '../../ingenieros-agronomos-core/ingenieros-agronomos-core.model';

export class InitDbIngenierosAgronomos implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbIngenierosAgronomos: IngenieroAgronomoCore[] = [
      createBaseIngenieroAgronomoCore('1', '2')
    ];
    return initialDbIngenierosAgronomos;
  }
}
