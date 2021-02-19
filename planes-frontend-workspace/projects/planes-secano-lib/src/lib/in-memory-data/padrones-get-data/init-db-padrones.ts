import { GetData } from '../get-data';
import { PadronCore } from 'planes-core-lib';

export class InitDbPadrones implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbPadrones: PadronCore[] = [
      {
        padronId: '1',
        departamentoId: '1',
        departamentoNombre: 'Artigas',
        padronArea: 1,
        padronFueSeleccionado: true
      },
      {
        padronId: '2',
        departamentoId: '1',
        departamentoNombre: 'Artigas',
        padronArea: 2,
        padronFueSeleccionado: true
      },
      {
        padronId: '3',
        departamentoId: '1',
        departamentoNombre: 'Artigas',
        padronArea: 3,
        padronFueSeleccionado: false
      },
      {
        padronId: '4',
        departamentoId: '1',
        departamentoNombre: 'Artigas',
        padronArea: 4,
        padronFueSeleccionado: false
      }
    ];
    return initialDbPadrones;
  }
}
