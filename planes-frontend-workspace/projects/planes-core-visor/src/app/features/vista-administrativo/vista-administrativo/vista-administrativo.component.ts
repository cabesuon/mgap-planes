import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';

import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

import { TableActionEvent } from 'planes-core-lib';

import { AppState } from '../../../core/core.state';

import { selectAllEntityPlanes } from '../../entity-planes/entity-planes.selectors';
import { PlanCore } from '../../entity-planes/entity-planes.state';
import { selectAllEntityChacras } from '../../entity-chacras/entity-chacras.selectors';
import { ChacraCore } from '../../entity-chacras/entity-chacras.state';
import {
  PlanesCoreDetailParams,
  ChacrasCoreTableParams,
  PersonaCore,
  EmpresaCore,
  EmpresasCoreDetailParams
} from 'projects/planes-core-lib/src/public-api';
import { selectAllEntityEmpresas } from '../../entity-empresas/entity-empresas.selectors';
import { selectAllEntityPersonas } from '../../entity-personas/entity-personas.selectors';

@Component({
  selector: 'app-vista-administrativo',
  templateUrl: './vista-administrativo.component.html',
  styleUrls: ['./vista-administrativo.component.scss']
})
export class VistaAdministrativoComponent implements OnInit {
  planId: string = null;
  plan: PlanCore = null;

  planes: PlanCore[];
  chacras: ChacraCore[];
  empresas: EmpresaCore[] = [];
  personas: PersonaCore[] = [];

  planDetailParams: PlanesCoreDetailParams = null;
  chacrasTableParams: ChacrasCoreTableParams = { chacras: [] };
  propietariosDetailParams: EmpresasCoreDetailParams[] = [];
  arrendatariosDetailParams: EmpresasCoreDetailParams[] = [];

  arrendatariosDetailVisible = true;
  propietariosDetailVisible = true;
  chacrasTableVisible = true;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.planId = this.route.snapshot.paramMap.get('PlanId');

    combineLatest(
      this.store.pipe(
        select(selectAllEntityPlanes),
        filter(planes => !!planes)
      ),
      this.store.pipe(select(selectAllEntityChacras)),
      this.store.pipe(select(selectAllEntityPersonas)),
      this.store.pipe(select(selectAllEntityEmpresas)),
      (
        planes: PlanCore[],
        chacras: ChacraCore[],
        personas: PersonaCore[],
        empresas: EmpresaCore[]
      ) => ({
        planes,
        chacras,
        personas,
        empresas
      })
    ).subscribe(
      (sources: {
        planes: PlanCore[];
        chacras: ChacraCore[];
        personas: PersonaCore[];
        empresas: EmpresaCore[];
      }) => {
        this.planes = sources.planes;
        this.chacras = sources.chacras;
        this.personas = sources.personas;
        this.empresas = sources.empresas;
        if (this.planId) {
          this.planesChange(this.planes.find(p => p.planId === this.planId));
        }
      }
    );
  }

  planesChange(plan: PlanCore) {
    if (!plan) {
      return;
    }
    this.plan = plan;

    this.planDetailParams = { plan };

    this.propietariosDetailParams = this.empresas
      .filter(e => this.plan.propietarios.indexOf(e.empresaId) > -1)
      .map(e => ({ empresa: e }));

    this.arrendatariosDetailParams = null;
    if (this.plan.arrendatarios) {
      this.arrendatariosDetailParams = this.empresas
        .filter(e => this.plan.arrendatarios.indexOf(e.empresaId) > -1)
        .map(e => ({ empresa: e }));
    }

    this.chacrasTableParams = {
      chacras: this.chacras.filter(c => c.planId === plan.planId)
    };
  }

  chacrasTableAction(action: TableActionEvent) {
    switch (action.value) {
      case 'GotoVistaMapa':
        this.router.navigate(['/features/mapa', { PlanId: this.plan.planId }]);
        break;
    }
  }

  togglePropietarios() {
    this.propietariosDetailVisible = !this.propietariosDetailVisible;
  }

  toggleArrendatarios() {
    this.arrendatariosDetailVisible = !this.arrendatariosDetailVisible;
  }

  toggleChacras() {
    this.chacrasTableVisible = !this.chacrasTableVisible;
  }
}
