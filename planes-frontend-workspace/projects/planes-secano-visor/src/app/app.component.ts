import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, mergeAll } from 'rxjs/operators';

import { environment as env } from '../environments/environment';

import {
  AppState,
  LocalStorageService,
  selectAuthPersonaId,
  selectAuthIsLoading,
  authLogout,
  routeAnimations
} from './core/core.module';

import { EntityPlanesLoadRequestAction } from './features/entity-planes/entity-planes.actions';
import { EntityChacrasLoadRequestAction } from './features/entity-chacras/entity-chacras.actions';
import { EntityZonasExclusionLoadRequestAction } from './features/entity-zonas-exclusion/entity-zonas-exclusion.actions';

import { EntityPersonasLoadRequestAction } from './features/entity-personas/entity-personas.actions';
import { EntityIngenierosAgronomosLoadRequestAction } from './features/entity-ingenieros-agronomos/entity-ingenieros-agronomos.actions';
import { EntityEmpresasLoadRequestAction } from './features/entity-empresas/entity-empresas.actions';

import { EntityRotacionesLoadRequestAction } from './features/entity-rotaciones/entity-rotaciones.actions';
import { EntityComponentesLoadRequestAction } from './features/entity-componentes/entity-componentes.actions';
import { EntityCultivosLoadRequestAction } from './features/entity-cultivos/entity-cultivos.actions';
import { EntityManejosLoadRequestAction } from './features/entity-manejos/entity-manejos.actions';
import { EntityRelacionesPerdidaSueloLoadRequestAction } from './features/entity-relaciones-perdida-suelo/entity-relaciones-perida-suelo.actions';
import { EntityRendimientosLoadRequestAction } from './features/entity-rendimientos/entity-rendimientos.actions';
import { EntityChatLoadRequestAction } from './features/entity-chat/entity-chat.actions';
import { EntitySuelosLoadRequestAction } from './features/entity-suelos/entity-suelos.actions';

import { PersonaCore } from 'planes-core-lib';
import { selectPersonaById } from './features/entity-personas/entity-personas.selectors';
import { selectFeaturesIsLoading } from './features/features.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'planes-core-visor';
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  useMockServer = env.useMockServer ? 'TRUE' : 'FALSE';
  year = new Date().getFullYear();
  logo = 'assets/logo.png'; // require('../');
  navigation = [
    { link: '/features/principal', label: 'Principal' },
    { link: '/features/mapa', label: 'Mapa' },
    { link: '/features/administrativo', label: 'Administrativo' }
  ];
  navigationSideMenu = [...this.navigation];

  personaId: string = null;
  persona: PersonaCore = null;

  isLoading: boolean;

  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.storageService.testLocalStorage();

    this.store
      .pipe(
        select(selectAuthPersonaId),
        filter(personaId => !!personaId)
      )
      .subscribe((personaId: string) => {
        this.personaId = personaId;

        if (this.personaId) {
          this.loadUserData();
          this.store
            .pipe(select(selectPersonaById(this.personaId)))
            .subscribe(persona => {
              this.persona = persona;
            });
        }
      });

    of(
      this.store.select(selectAuthIsLoading),
      this.store.select(selectFeaturesIsLoading)
    )
      .pipe(mergeAll())
      .subscribe((isLoading: boolean) => (this.isLoading = isLoading));
  }

  ngAfterViewInit(): void {}

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  onProfileClick() {}

  loadUserData() {
    this.store.dispatch(new EntityPersonasLoadRequestAction());
    this.store.dispatch(new EntityIngenierosAgronomosLoadRequestAction());
    this.store.dispatch(new EntityEmpresasLoadRequestAction());

    this.store.dispatch(new EntityPlanesLoadRequestAction());
    this.store.dispatch(new EntityChacrasLoadRequestAction());
    this.store.dispatch(new EntityZonasExclusionLoadRequestAction());

    this.store.dispatch(new EntityRotacionesLoadRequestAction());
    this.store.dispatch(new EntityComponentesLoadRequestAction());

    this.store.dispatch(new EntityCultivosLoadRequestAction());
    this.store.dispatch(new EntityManejosLoadRequestAction());
    this.store.dispatch(new EntityRendimientosLoadRequestAction());
    this.store.dispatch(new EntityRelacionesPerdidaSueloLoadRequestAction());
    this.store.dispatch(new EntityChatLoadRequestAction());
    this.store.dispatch(new EntitySuelosLoadRequestAction());
  }
}
