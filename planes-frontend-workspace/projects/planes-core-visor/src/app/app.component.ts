import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store, select } from '@ngrx/store';

import { environment as env } from '../environments/environment';

import {
  AppState,
  LocalStorageService,
  selectPersonaId,
  authLogout,
  routeAnimations
} from './core/core.module';

import { EntityPlanesLoadRequestAction } from './features/entity-planes/entity-planes.actions';

import { EntityChacrasLoadRequestAction } from './features/entity-chacras/entity-chacras.actions';

import { EntityZonasExclusionLoadRequestAction } from './features/entity-zonas-exclusion/entity-zonas-exclusion.actions';

import { EntityPersonasLoadRequestAction } from './features/entity-personas/entity-personas.actions';

import { EntityIngenierosAgronomosLoadRequestAction } from './features/entity-ingenieros-agronomos/entity-ingenieros-agronomos.actions';

import {
  EntityResponsablesPropietarioLoadRequestAction,
  EntityResponsablesArrendatarioLoadRequestAction
} from './features/entity-responsables/entity-responsables.actions';
import { PersonaCore } from 'projects/planes-core-lib/src/public-api';
import { selectPersonaById } from './features/entity-personas/entity-personas.selectors';

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
  logo = 'assets/logo-mgap.png'; // require('../');
  navigation = [
    { link: '/features/principal', label: 'Principal' },
    { link: '/features/mapa', label: 'Mapa' },
    { link: '/features/administrativo', label: 'Administrativo' }
  ];
  navigationSideMenu = [...this.navigation];

  personaId: number = null;
  persona: PersonaCore = null;

  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.storageService.testLocalStorage();

    this.store.pipe(select(selectPersonaId)).subscribe(personaId => {
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
  }

  ngAfterViewInit(): void {}

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  onProfileClick() {}

  loadUserData() {
    this.store.dispatch(new EntityPlanesLoadRequestAction());
    this.store.dispatch(new EntityChacrasLoadRequestAction());
    this.store.dispatch(new EntityZonasExclusionLoadRequestAction());
    this.store.dispatch(
      new EntityPersonasLoadRequestAction({ personasId: null })
    );
    this.store.dispatch(
      new EntityIngenierosAgronomosLoadRequestAction({
        ingenierosAgronomosId: null
      })
    );
    this.store.dispatch(
      new EntityResponsablesPropietarioLoadRequestAction({ personasId: null })
    );
    this.store.dispatch(
      new EntityResponsablesArrendatarioLoadRequestAction({ personasId: null })
    );
  }
}
