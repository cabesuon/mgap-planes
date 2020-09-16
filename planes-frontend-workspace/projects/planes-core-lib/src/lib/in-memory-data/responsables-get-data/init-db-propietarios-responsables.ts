import { GetData } from '../get-data';
import {
  ResponsableCore,
  createBaseResponsableCore
} from '../../responsables-core/responsables-core.model';

export class InitDbPropietariosResponsables implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbPropietariosResponsabels: ResponsableCore[] = [
      createBaseResponsableCore('1', 'Propietario', '2')
    ];
    return initialDbPropietariosResponsabels;
  }
}
