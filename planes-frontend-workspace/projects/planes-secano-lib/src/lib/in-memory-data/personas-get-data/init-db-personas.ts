import { GetData } from '../get-data';
import {
  PersonaCore,
  createBasePersonaCore
} from 'planes-core-lib';

export class InitDbPersonas implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbPersonas: PersonaCore[] = [
      createBasePersonaCore('1'),
      createBasePersonaCore('2'),
      createBasePersonaCore('3')
    ];
    return initialDbPersonas;
  }
}
