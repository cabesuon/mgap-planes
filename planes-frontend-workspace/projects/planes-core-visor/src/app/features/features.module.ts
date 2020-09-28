import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PlanesCoreLibModule } from 'planes-core-lib';

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
// dialogs
import { EntityPlanesFormDialogComponent } from './entity-planes/entity-planes-form-dialog/entity-planes-form-dialog.component';
import { EntityChacrasFormDialogComponent } from './entity-chacras/entity-chacras-form-dialog/entity-chacras-form-dialog.component';
// vistas
import { VistaPrincipalComponent } from './vista-principal/vista-principal/vista-principal.component';
import { VistaLoginComponent } from './vista-login/vista-login/vista-login.component';
import { VistaMapaComponent } from './vista-mapa/vista-mapa/vista-mapa.component';
import { VistaAdministrativoComponent } from './vista-administrativo/vista-administrativo/vista-administrativo.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,

    PlanesCoreLibModule,

    SharedModule,

    FeaturesRoutingModule,

    StoreModule.forFeature(FEATURE_NAME, reducers),

    EffectsModule.forFeature([
      EntityPlanesEffects,
      EntityChacrasEffects,
      EntityZonasExclusionEffects,
      EntityPersonasEffects,
      EntityIngenierosAgronomosEffects,
      EntityEmpresasEffects
    ])
  ],
  declarations: [
    // vistas
    VistaPrincipalComponent,
    VistaLoginComponent,
    VistaMapaComponent,
    VistaAdministrativoComponent,
    // dialogs
    EntityPlanesFormDialogComponent,
    EntityChacrasFormDialogComponent
  ],
  entryComponents: [
    EntityPlanesFormDialogComponent,
    EntityChacrasFormDialogComponent
  ]
})
export class FeaturesModule {}
