import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PlanesCoreLibModule } from 'planes-core-lib';
import { PlanesSecanoLibModule } from 'planes-secano-lib';
import { SegurosSecanoLibModule } from 'seguros-secano-lib';

import { SharedModule } from '../shared/shared.module';

import { FEATURE_NAME, reducers } from './features.state';

import { FeaturesRoutingModule } from './features.routing.module';
// effects
import { EntityChacrasEffects } from './entity-chacras/entity-chacras.effects';

import { EntityPersonasEffects } from './entity-personas/entity-personas.effects';
import { EntityEmpresasEffects } from './entity-empresas/entity-empresas.effects';

import { EntityComponentesEffects } from './entity-componentes/entity-component.effects';

import { EntityCultivosEffects } from './entity-cultivos/entity-cultivos.effects';
import { EntityAseguradorasEffects } from './entity-aseguradoras/entity-aseguradoras.effects';
import { EntityCiclosEffects } from './entity-ciclos/entity-ciclos.effects';
import { EntityUnidadesManejosEffects } from './entity-unidades/entity-unidades.effects';
// dialogs
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

    PlanesSecanoLibModule,

    SegurosSecanoLibModule,

    SharedModule,

    FeaturesRoutingModule,

    StoreModule.forFeature(FEATURE_NAME, reducers),

    EffectsModule.forFeature([
      EntityChacrasEffects,

      EntityPersonasEffects,
      EntityEmpresasEffects,

      EntityComponentesEffects,

      EntityCultivosEffects,
      EntityAseguradorasEffects,
      EntityCiclosEffects,
      EntityUnidadesManejosEffects
    ])
  ],
  declarations: [
    // vistas
    VistaPrincipalComponent,
    VistaLoginComponent,
    VistaMapaComponent,
    VistaAdministrativoComponent,
    // dialogs
    EntityChacrasFormDialogComponent
  ],
  entryComponents: [EntityChacrasFormDialogComponent]
})
export class FeaturesModule {}
