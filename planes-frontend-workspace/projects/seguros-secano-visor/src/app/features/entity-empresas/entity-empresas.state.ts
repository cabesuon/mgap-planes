import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { EmpresaCore } from 'planes-core-lib';

export { EmpresaCore } from 'planes-core-lib';

export const entityEmpresasAdapter: EntityAdapter<
  EmpresaCore
> = createEntityAdapter<EmpresaCore>({
  selectId: model => model.empresaId,
  sortComparer: (a: EmpresaCore, b: EmpresaCore): number =>
    b.empresaId.toString().localeCompare(a.empresaId.toString())
});

export interface EntityEmpresasState extends EntityState<EmpresaCore> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityEmpresasState = entityEmpresasAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
