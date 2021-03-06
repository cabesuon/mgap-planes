import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ConfirmDialogComponent, PlanesCoreLibModule } from 'planes-core-lib';
import { PlanesSecanoLibModule } from 'planes-secano-lib';

import { SharedModule } from '../shared/shared.module';

import { FEATURE_NAME, reducers } from './features.state';

import { FeaturesRoutingModule } from './features.routing.module';
// effects
import { EntityPlanesEffects } from './entity-planes/entity-planes.effects';
import { EntityChacrasEffects } from './entity-chacras/entity-chacras.effects';
import { EntityZonasExclusionEffects } from './entity-zonas-exclusion/entity-zonas-exclusion.effects';

import { EntityPersonasEffects } from './entity-personas/entity-personas.effects';
import { EntityIngenierosAgronomosEffects } from './entity-ingenieros-agronomos/entity-ingenieros-agronomos.effects';
import { EntityEmpresasEffects } from './entity-empresas/entity-empresas.effects';
import { EntityResponsablesEffects } from './entity-responsables/entity-responsables.effects';

import { EntityRotacionesEffects } from './entity-rotaciones/entity-rotaciones.effects';
import { EntityComponentesEffects } from './entity-componentes/entity-component.effects';

import { EntityCultivosEffects } from './entity-cultivos/entity-cultivos.effects';
import { EntityManejosEffects } from './entity-manejos/entity-manejos.effect';
import { EntityRendimientosEffects } from './entity-rendimientos/entity-rendimientos.effect';
import { EntityRelacionesPerdidaSueloSecanoEffects } from './entity-relaciones-perdida-suelo/entity-relaciones-perdida-suelo.effects';

import { EntityChatEffects } from './entity-chat/entity-chat.effects';
import { EntitySuelosEffects } from './entity-suelos/entity-suelos.effects';

// dialogs
import { EntityPlanesFormDialogComponent } from './entity-planes/entity-planes-form-dialog/entity-planes-form-dialog.component';
import { EntityChacrasFormDialogComponent } from './entity-chacras/entity-chacras-form-dialog/entity-chacras-form-dialog.component';
import { EntityZonasExclusionFormDialogComponent } from './entity-zonas-exclusion/entity-zonas-exclusion-form-dialog/entity-zonas-exclusion-form-dialog.component';
import { EntityRotacionesFormDialogComponent } from './entity-rotaciones/entity-rotaciones-form-dialog/entity-rotaciones-form-dialog.component';
import { EntityComponentesFormDialogComponent } from './entity-componentes/entity-componentes-form-dialog/entity-componentes-form-dialog.component';
// vistas
import { VistaPrincipalComponent } from './vista-principal/vista-principal/vista-principal.component';
import { VistaLoginComponent } from './vista-login/vista-login/vista-login.component';
import { VistaMapaComponent } from './vista-mapa/vista-mapa/vista-mapa.component';
import { VistaAdministrativoComponent } from './vista-administrativo/vista-administrativo/vista-administrativo.component';
import { PlanRotacionComponentesComponent } from './vista-administrativo/plan-rotacion-componentes/plan-rotacion-componentes.component';
import { PlanDetallesComponent } from './vista-administrativo/plan-detalles/plan-detalles.component';
import { PlanChacrasComponent } from './vista-administrativo/plan-chacras/plan-chacras.component';
import { PlanChatComponent } from './vista-administrativo/plan-chat/plan-chat.component';
import { VistaChatComponent } from './vista-chat/vista-chat/vista-chat.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,

    PlanesCoreLibModule,

    PlanesSecanoLibModule,

    SharedModule,

    FeaturesRoutingModule,

    StoreModule.forFeature(FEATURE_NAME, reducers),

    EffectsModule.forFeature([
      EntityPlanesEffects,
      EntityChacrasEffects,
      EntityZonasExclusionEffects,

      EntityPersonasEffects,
      EntityIngenierosAgronomosEffects,
      EntityEmpresasEffects,
      EntityResponsablesEffects,

      EntityRotacionesEffects,
      EntityComponentesEffects,

      EntityManejosEffects,
      EntityRelacionesPerdidaSueloSecanoEffects,
      EntityCultivosEffects,
      EntityRendimientosEffects,

      EntityChatEffects,
      EntitySuelosEffects
    ])
  ],
  declarations: [
    // vistas
    VistaPrincipalComponent,
    VistaLoginComponent,
    VistaMapaComponent,
    VistaAdministrativoComponent,
    VistaChatComponent,
    // dialogs
    EntityPlanesFormDialogComponent,
    EntityChacrasFormDialogComponent,
    EntityZonasExclusionFormDialogComponent,
    EntityRotacionesFormDialogComponent,
    EntityComponentesFormDialogComponent,
    PlanRotacionComponentesComponent,
    PlanDetallesComponent,
    PlanChacrasComponent,
    PlanChatComponent
  ],
  entryComponents: [
    EntityPlanesFormDialogComponent,
    EntityChacrasFormDialogComponent,
    EntityZonasExclusionFormDialogComponent,
    ConfirmDialogComponent,
    EntityRotacionesFormDialogComponent,
    EntityComponentesFormDialogComponent
  ]
})
export class FeaturesModule {}
