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
  ChacrasCoreTableParams,
  ResponsableCore,
  PersonaCore
} from 'projects/planes-core-lib/src/public-api';
import { selectAllEntityResponsables } from '../../entity-responsables/entity-responsables.selectors';
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
  responsables: ResponsableCore[] = [];
  personas: PersonaCore[] = [];

  planDetailParams: { plan: PlanCore } = null;
  chacrasTableParams: ChacrasCoreTableParams = { chacras: [] };
  propietarioDetailParams: {
    responsable: ResponsableCore;
    persona: PersonaCore;
  } = null;
  arrendatarioDetailParams: {
    responsable: ResponsableCore;
    persona: PersonaCore;
  } = null;

  arrendatarioDetailVisible = true;
  propietarioDetailVisible = true;
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
      this.store.pipe(select(selectAllEntityResponsables)),
      (
        planes: PlanCore[],
        chacras: ChacraCore[],
        personas: PersonaCore[],
        responsables: ResponsableCore[]
      ) => ({
        planes,
        chacras,
        personas,
        responsables
      })
    ).subscribe(
      (sources: {
        planes: PlanCore[];
        chacras: ChacraCore[];
        personas: PersonaCore[];
        responsables: ResponsableCore[];
      }) => {
        this.planes = sources.planes;
        this.chacras = sources.chacras;
        this.personas = sources.personas;
        this.responsables = sources.responsables;
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

    this.propietarioDetailParams = {
      responsable: this.responsables.find(
        r => r.contacto.personaId === plan.propietarioResponsableId
      ),
      persona: this.personas.find(
        p => p.personaId === plan.propietarioResponsableId
      )
    };

    if (plan.tctResponsableId) {
      this.arrendatarioDetailParams = {
        responsable: this.responsables.find(
          r => r.contacto.personaId === plan.tctResponsableId
        ),
        persona: this.personas.find(p => p.personaId === plan.tctResponsableId)
      };
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

  togglePropietario() {
    this.propietarioDetailVisible = !this.propietarioDetailVisible;
  }

  toggleArrendatario() {
    this.arrendatarioDetailVisible = !this.arrendatarioDetailVisible;
  }

  toggleChacras() {
    this.chacrasTableVisible = !this.chacrasTableVisible;
  }
}
