import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, skip } from 'rxjs/operators';

import {
  TableActionEvent,
  PersonaCore,
  EmpresaCore,
  IngenieroAgronomoCore,
  EmpresasCoreDetailParams,
  IngenierosCoreDetailParams
} from 'planes-core-lib';

import { AppState } from '../../../core/core.state';

import { PlanSecano } from '../../entity-planes/entity-planes.state';
import { ChacraSecano } from '../../entity-chacras/entity-chacras.state';

import { RotacionSecano } from '../../entity-rotaciones/entity-rotaciones.state';
import { ComponenteSecano } from '../../entity-componentes/entity-componentes.state';
import { CultivoSecano } from '../../entity-cultivos/entity-cultivos.state';
import { ManejoSecano } from '../../entity-manejos/entity-manejos.state';
import { RendimientoSecano } from '../../entity-rendimientos/entity-rendimientos.state';

import { ResponsableSecano } from '../../entity-responsables/entity-responsables.state';

import {
  PlanesSecanoDetailParams,
  ChacrasSecanoTableParams,
  RotacionesSecanoDetailParams,
  ResponsablesSecanoDetailParams,
  ComponentesSecanoDetailParams
} from 'planes-secano-lib';

import { selectAllEntityPlanes } from '../../entity-planes/entity-planes.selectors';
import { selectAllEntityChacras } from '../../entity-chacras/entity-chacras.selectors';

import { selectAllEntityRotaciones } from '../../entity-rotaciones/entity-rotaciones.selectors';
import { selectAllEntityComponentes } from '../../entity-componentes/entity-component.selectors';
import { selectAllEntityCultivos } from '../../entity-cultivos/entity-cultivos.selectors';
import { selectAllEntityManejos } from '../../entity-manejos/entity-manejos.selectors';
import { selectAllEntityRendimientos } from '../../entity-rendimientos/entity-rendimientos.selectors';

import { selectAllEntityEmpresas } from '../../entity-empresas/entity-empresas.selectors';
import { selectAllEntityPersonas } from '../../entity-personas/entity-personas.selectors';
import { selectAllEntityIngenierosAgronomos } from '../../entity-ingenieros-agronomos/entity-ingenieros-agronomos.selectors';
import { selectAllEntityResponsables } from '../../entity-responsables/entity-responsables.selectors';

@Component({
  selector: 'app-vista-administrativo',
  templateUrl: './vista-administrativo.component.html',
  styleUrls: ['./vista-administrativo.component.scss']
})
export class VistaAdministrativoComponent implements OnInit {
  planId: string = null;
  plan: PlanSecano = null;

  planes: PlanSecano[] = [];
  chacras: ChacraSecano[] = [];

  rotaciones: RotacionSecano[] = [];
  componentes: ComponenteSecano[] = [];
  cultivos: CultivoSecano[] = [];
  manejos: ManejoSecano[] = [];
  rendimientos: RendimientoSecano[] = [];

  empresas: EmpresaCore[] = [];
  personas: PersonaCore[] = [];
  ingenieros: IngenieroAgronomoCore[] = [];
  responsables: ResponsableSecano[] = [];

  planDetailParams: PlanesSecanoDetailParams = null;
  chacrasTableParams: ChacrasSecanoTableParams = { chacras: [] };

  rotacionDetailParams: RotacionesSecanoDetailParams = null;
  componentesDetailParams: ComponentesSecanoDetailParams[] = [];

  propietariosDetailParams: EmpresasCoreDetailParams[] = [];
  arrendatariosDetailParams: EmpresasCoreDetailParams[] = [];
  propietarioResponsableDetailParams: ResponsablesSecanoDetailParams = null;
  arrendatarioResponsableDetailParams: ResponsablesSecanoDetailParams = null;

  ingenieroDetailParams: IngenierosCoreDetailParams = null;

  generalRow = true;
  chacrasRow = true;
  rotacionRow = true;
  generalRowVisible = true;
  chacrasRowVisible = true;
  rotacionRowVisible = true;

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
      this.store.pipe(
        select(selectAllEntityChacras),
        skip(1)
      ),

      this.store.pipe(
        select(selectAllEntityPersonas),
        skip(1)
      ),
      this.store.pipe(
        select(selectAllEntityEmpresas),
        skip(1)
      ),
      this.store.pipe(
        select(selectAllEntityIngenierosAgronomos),
        skip(1)
      ),
      this.store.pipe(
        select(selectAllEntityResponsables),
        skip(1)
      ),

      this.store.pipe(
        select(selectAllEntityRotaciones),
        skip(1)
      ),
      this.store.pipe(
        select(selectAllEntityComponentes),
        skip(1)
      ),
      this.store.pipe(
        select(selectAllEntityCultivos),
        skip(1)
      ),
      this.store.pipe(
        select(selectAllEntityManejos),
        skip(1)
      ),
      this.store.pipe(
        select(selectAllEntityRendimientos),
        skip(1)
      ),
      (
        planes: PlanSecano[],
        chacras: ChacraSecano[],

        personas: PersonaCore[],
        empresas: EmpresaCore[],
        ingenieros: IngenieroAgronomoCore[],
        responsables: ResponsableSecano[],

        rotaciones: RotacionSecano[],
        componentes: ComponenteSecano[],
        cultivos: CultivoSecano[],
        manejos: ManejoSecano[],
        rendimientos: RendimientoSecano[]
      ) => ({
        planes,
        chacras,

        personas,
        empresas,
        ingenieros,
        responsables,

        rotaciones,
        componentes,
        cultivos,
        manejos,
        rendimientos
      })
    ).subscribe(
      (sources: {
        planes: PlanSecano[];
        chacras: ChacraSecano[];
        personas: PersonaCore[];
        empresas: EmpresaCore[];
        ingenieros: IngenieroAgronomoCore[];
        responsables: ResponsableSecano[];
        rotaciones: RotacionSecano[];
        componentes: ComponenteSecano[];
        cultivos: CultivoSecano[];
        manejos: ManejoSecano[];
        rendimientos: RendimientoSecano[];
      }) => {
        this.planes = sources.planes;
        this.chacras = sources.chacras;

        this.personas = sources.personas;
        this.empresas = sources.empresas;
        this.ingenieros = sources.ingenieros;
        this.responsables = sources.responsables;

        this.rotaciones = sources.rotaciones;
        this.componentes = sources.componentes;
        this.cultivos = sources.cultivos;
        this.manejos = sources.manejos;
        this.rendimientos = sources.rendimientos;

        if (this.planId) {
          this.planesChange(this.planes.find(p => p.planId === this.planId));
        }
      }
    );
  }

  planesChange(plan: PlanSecano) {
    if (!plan) {
      return;
    }

    this.plan = plan;

    this.planDetailParams = { plan };

    const ingeniero = this.ingenieros.find(
      i => i.ingenieroAgronomoId === this.plan.ingenieroAgronomoId
    );
    this.ingenieroDetailParams = {
      ingeniero,
      persona: this.personas.find(
        p => p.personaId === ingeniero.contacto.personaId
      )
    };

    // propietarios
    this.propietariosDetailParams = this.empresas
      .filter(e => this.plan.propietarios.indexOf(e.empresaId) > -1)
      .map(e => ({ empresa: e }));

    this.propietarioResponsableDetailParams = {
      responsable: this.responsables.find(
        r => r.contacto.personaId === this.plan.propietarioResponsableId
      ),
      persona: this.personas.find(
        p => p.personaId === this.plan.propietarioResponsableId
      )
    };

    // arrendatarios
    this.arrendatariosDetailParams = null;
    if (this.plan.arrendatarios) {
      this.arrendatariosDetailParams = this.empresas
        .filter(e => this.plan.arrendatarios.indexOf(e.empresaId) > -1)
        .map(e => ({ empresa: e }));
    }

    this.arrendatarioResponsableDetailParams = null;
    if (this.plan.tctResponsableId) {
      this.arrendatarioResponsableDetailParams = {
        responsable: this.responsables.find(
          r => r.contacto.personaId === this.plan.tctResponsableId
        ),
        persona: this.personas.find(
          p => p.personaId === this.plan.tctResponsableId
        )
      };
    }

    // chacras
    const chacras = this.chacras.filter(c => c.planId === plan.planId);
    this.chacrasTableParams = {
      chacras
    };

    // rotacion
    const rotacion = this.rotaciones.find(
      r => r.rotacionPlanId === this.planId
    );
    this.componentesDetailParams = this.componentes
      .filter(componente => componente.rotacionId === rotacion.rotacionId)
      .map(componente => ({
        componente,
        cultivoDetailParams: {
          cultivo: this.cultivos.find(c => c.cultivoId === componente.cultivoId)
        },
        manejoDetailParams: {
          manejo: this.manejos.find(m => m.manejoId === componente.manejoId)
        },
        rendimientoDetailParams: {
          rendimiento: this.rendimientos.find(
            r => r.rendimientoId === componente.rendimientoId
          )
        }
      }));
    this.rotacionDetailParams = {
      rotacion,
      componentesDetailParams: []
    };

    this.chacrasRow = chacras && chacras.length > 0;
    this.rotacionRow = !!rotacion;
  }

  chacrasTableAction(action: TableActionEvent) {
    switch (action.value) {
      case 'GotoVistaMapa':
        this.router.navigate(['/features/mapa', { PlanId: this.plan.planId }]);
        break;
    }
  }

  toggleGeneralRow() {
    this.generalRowVisible = !this.generalRowVisible;
  }

  toggleChacrasRow() {
    this.chacrasRowVisible = !this.chacrasRowVisible;
  }

  toggleRotacionRow() {
    this.rotacionRowVisible = !this.rotacionRowVisible;
  }
}
