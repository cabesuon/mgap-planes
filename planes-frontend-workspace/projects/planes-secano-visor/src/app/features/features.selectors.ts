import { createSelector } from '@ngrx/store';

import { selectEntityChacrasIsLoading } from './entity-chacras/entity-chacras.selectors';
import { selectEntityComponentesIsLoading } from './entity-componentes/entity-component.selectors';
import { selectEntityCultivosIsLoading } from './entity-cultivos/entity-cultivos.selectors';
import { selectEntityDibujosIsLoading } from './entity-dibujos/entity-dibujos.selectors';
import { selectEntityEmpresasIsLoading } from './entity-empresas/entity-empresas.selectors';
import { selectEntityIngenierosAgronomosIsLoading } from './entity-ingenieros-agronomos/entity-ingenieros-agronomos.selectors';
import { selectEntityManejosIsLoading } from './entity-manejos/entity-manejos.selectors';
import { selectEntityPersonasIsLoading } from './entity-personas/entity-personas.selectors';
import { selectEntityPlanesIsLoading } from './entity-planes/entity-planes.selectors';
import { selectEntityRelacionesPerdidaSueloSecanoIsLoading } from './entity-relaciones-perdida-suelo/entity-relaciones-perdida-suelo.selectors';
import { selectEntityRendimientosIsLoading } from './entity-rendimientos/entity-rendimientos.selectors';
import { selectEntityResponsablesIsLoading } from './entity-responsables/entity-responsables.selectors';
import { selectEntityRotacionesIsLoading } from './entity-rotaciones/entity-rotaciones.selectors';
import { selectEntitySuelosIsLoading } from './entity-suelos/entity-suelos.selectors';
import { selectEntityZonasExclusionIsLoading } from './entity-zonas-exclusion/entity-zonas-exclusion.selectors';

export const selectAgroItemsIsLoading = createSelector(
  selectEntityComponentesIsLoading,
  selectEntityCultivosIsLoading,
  selectEntityManejosIsLoading,
  selectEntityPlanesIsLoading,
  selectEntityRelacionesPerdidaSueloSecanoIsLoading,
  selectEntityRendimientosIsLoading,
  selectEntityRotacionesIsLoading,
  selectEntitySuelosIsLoading,
  (
    componentesIsLoading: boolean,
    cultivosIsLoading: boolean,
    manejosIsLoading: boolean,
    planesIsLoading: boolean,
    relacionesIsLoading: boolean,
    rendimientosIsLoading: boolean,
    rotacionesIsLoading: boolean,
    suelosIsLoading: boolean
  ) =>
    componentesIsLoading ||
    cultivosIsLoading ||
    manejosIsLoading ||
    planesIsLoading ||
    relacionesIsLoading ||
    rendimientosIsLoading ||
    rotacionesIsLoading ||
    suelosIsLoading
);

export const selectGeoItemsIsLoading = createSelector(
  selectEntityChacrasIsLoading,
  selectEntityDibujosIsLoading,
  selectEntityZonasExclusionIsLoading,
  (
    chacrasIsLoading: boolean,
    dibujosIsLoading: boolean,
    zonasIsLoading: boolean
  ) => chacrasIsLoading || dibujosIsLoading || zonasIsLoading
);

export const selectAdminItemsIsLoading = createSelector(
  selectEntityEmpresasIsLoading,
  selectEntityIngenierosAgronomosIsLoading,
  selectEntityPersonasIsLoading,
  selectEntityResponsablesIsLoading,
  (
    empresasIsLoading: boolean,
    ingenierosIsLoading: boolean,
    personasIsLoading: boolean,
    responsablesIsLoading: boolean
  ) =>
    empresasIsLoading ||
    ingenierosIsLoading ||
    personasIsLoading ||
    responsablesIsLoading
);

export const selectFeaturesIsLoading = createSelector(
  selectAgroItemsIsLoading,
  selectGeoItemsIsLoading,
  selectAdminItemsIsLoading,
  (agroIsLoading: boolean, geoIsLoading: boolean, adminIsLoading: boolean) =>
    agroIsLoading || geoIsLoading || adminIsLoading
);
