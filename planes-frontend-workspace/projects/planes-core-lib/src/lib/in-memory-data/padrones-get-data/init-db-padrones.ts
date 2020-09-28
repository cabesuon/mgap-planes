import { GetData } from '../get-data';
import { PadronCore } from '../../padrones-core/padrones-core.model';

export class InitDbPadrones implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbPadrones: PadronCore[] = [
      {
        padronId: '1',
        padronCodigoDepartamento: '1',
        padrondDepartamento: 'Artigas',
        padronAreaHa: 1
      },
      {
        padronId: '2',
        padronCodigoDepartamento: '1',
        padrondDepartamento: 'Artigas',
        padronAreaHa: 2
      },
      {
        padronId: '3',
        padronCodigoDepartamento: '1',
        padrondDepartamento: 'Artigas',
        padronAreaHa: 3
      },
      {
        padronId: '4',
        padronCodigoDepartamento: '1',
        padrondDepartamento: 'Artigas',
        padronAreaHa: 4
      }
    ];
    return initialDbPadrones;
  }
}
