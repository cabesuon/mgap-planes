import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { environment as env } from '../environments/environment';

import {
  AppState,
  LocalStorageService,
  selectPersonaId,
  authLogout,
  routeAnimations
} from './core/core.module';

import { EntityChacrasLoadRequestAction } from './features/entity-chacras/entity-chacras.actions';
import { EntityPersonasLoadRequestAction } from './features/entity-personas/entity-personas.actions';
import { EntityEmpresasLoadRequestAction } from './features/entity-empresas/entity-empresas.actions';
import { EntityComponentesLoadRequestAction } from './features/entity-componentes/entity-componentes.actions';
import { EntityCultivosLoadRequestAction } from './features/entity-cultivos/entity-cultivos.actions';
import { EntityAseguradorasLoadRequestAction } from './features/entity-aseguradoras/entity-aseguradoras.actions';
import { PersonaCore } from 'planes-core-lib';
import { selectPersonaById } from './features/entity-personas/entity-personas.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'seguros-secano-visor';
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  useMockServer = env.useMockServer ? 'TRUE' : 'FALSE';
  year = new Date().getFullYear();
  logo = 'assets/MGAP blanco + fondo azul.png'; // require('../');
  navigation = [
    { link: '/features/principal', label: 'Principal' },
    { link: '/features/mapa', label: 'Mapa' },
    { link: '/features/administrativo', label: 'Administrativo' }
  ];
  navigationSideMenu = [...this.navigation];

  personaId: string = null;
  persona: PersonaCore = null;

  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.storageService.testLocalStorage();

    this.store
      .pipe(
        select(selectPersonaId),
        filter(personaId => !!personaId)
      )
      .subscribe(personaId => {
        this.personaId = personaId.toString();

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
    this.store.dispatch(new EntityPersonasLoadRequestAction());
    this.store.dispatch(new EntityEmpresasLoadRequestAction());
    this.store.dispatch(new EntityChacrasLoadRequestAction());
    this.store.dispatch(new EntityComponentesLoadRequestAction());
    this.store.dispatch(new EntityCultivosLoadRequestAction());
    this.store.dispatch(new EntityAseguradorasLoadRequestAction());
  }
}