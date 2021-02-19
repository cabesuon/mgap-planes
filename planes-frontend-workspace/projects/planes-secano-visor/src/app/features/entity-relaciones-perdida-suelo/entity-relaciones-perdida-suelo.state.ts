import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { RelacionPerdidaSueloSecano } from 'planes-secano-lib';
export { RelacionPerdidaSueloSecano } from 'planes-secano-lib';

export const entityRelacionesPerdidaSueloSecanoAdapter: EntityAdapter<
  RelacionPerdidaSueloSecano
> = createEntityAdapter<RelacionPerdidaSueloSecano>({
  selectId: model => model.rpsId,
  sortComparer: (
    a: RelacionPerdidaSueloSecano,
    b: RelacionPerdidaSueloSecano
  ): number => b.rpsId.toString().localeCompare(a.rpsId.toString())
});

export interface EntityRelacionesPerdidaSueloSecanoState
  extends EntityState<RelacionPerdidaSueloSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityRelacionesPerdidaSueloSecanoState = entityRelacionesPerdidaSueloSecanoAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
