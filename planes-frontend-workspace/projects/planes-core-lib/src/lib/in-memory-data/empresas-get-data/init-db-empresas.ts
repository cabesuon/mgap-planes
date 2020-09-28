import { GetData } from '../get-data';
import {
  EmpresaCore,
  createBaseEmpresaCore
} from '../../empresas-core/empresas-core.model';

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
