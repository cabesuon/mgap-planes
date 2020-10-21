import { GetData } from '../get-data';
import {
  EmpresaCore,
  createBaseEmpresaCore
} from 'planes-core-lib';

export class InitDbEmpresas implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbEmpresas: EmpresaCore[] = [
      createBaseEmpresaCore('1', []),
      createBaseEmpresaCore('2', []),
      createBaseEmpresaCore('3', [])
    ];
    return initialDbEmpresas;
  }
}
