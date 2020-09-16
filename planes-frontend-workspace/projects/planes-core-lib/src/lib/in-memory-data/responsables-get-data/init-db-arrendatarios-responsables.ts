import { GetData } from '../get-data';
import {
  ResponsableCore,
  createBaseResponsableCore
} from '../../responsables-core/responsables-core.model';

export class InitDbArrendatariosResponsables implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbArrendatariosResponsables: ResponsableCore[] = [
      createBaseResponsableCore('3', 'Arrendatario', '1')
    ];
    return initialDbArrendatariosResponsables;
  }
}
