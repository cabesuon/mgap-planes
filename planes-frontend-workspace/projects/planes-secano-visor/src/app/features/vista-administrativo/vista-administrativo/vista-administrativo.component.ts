import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  PersonaCore,
  EmpresaCore,
  IngenieroAgronomoCore
} from 'planes-core-lib';

import {
  PlanSecano,
  ChacraSecano,
  RotacionSecano,
  ComponenteSecano,
  CultivoSecano,
  ManejoSecano,
  RendimientoSecano,
  ResponsableSecano,
  RelacionPerdidaSueloSecano,
  PlanSecanoUrlType
} from 'planes-secano-lib';

import { AppState } from '../../../core/core.state';

import { PlanDetallesParams } from '../plan-detalles/plan-detalles.component';
import { PlanRotacionComponentesParams } from '../plan-rotacion-componentes/plan-rotacion-componentes.component';
import { PlanChacrasParams } from '../plan-chacras/plan-chacras.component';

import { selectAllEntityPlanes } from '../../entity-planes/entity-planes.selectors';
import { selectAllEntityChacras } from '../../entity-chacras/entity-chacras.selectors';

import { selectAllEntityRotaciones } from '../../entity-rotaciones/entity-rotaciones.selectors';
import { selectAllEntityComponentes } from '../../entity-componentes/entity-component.selectors';
import { selectAllEntityCultivos } from '../../entity-cultivos/entity-cultivos.selectors';
import { selectAllEntityManejos } from '../../entity-manejos/entity-manejos.selectors';
import { selectAllEntityRendimientos } from '../../entity-rendimientos/entity-rendimientos.selectors';
import { selectAllEntityRelacionesPerdidaSuelo } from '../../entity-relaciones-perdida-suelo/entity-relaciones-perdida-suelo.selectors';

import { selectAllEntityEmpresas } from '../../entity-empresas/entity-empresas.selectors';
import { selectAllEntityPersonas } from '../../entity-personas/entity-personas.selectors';
import { selectAllEntityIngenierosAgronomos } from '../../entity-ingenieros-agronomos/entity-ingenieros-agronomos.selectors';
import { selectAllEntityResponsables } from '../../entity-responsables/entity-responsables.selectors';

import { EntityPlanesGetUrlRequestAction } from '../../entity-planes/entity-planes.actions';

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
  relaciones: RelacionPerdidaSueloSecano[] = [];
  empresas: EmpresaCore[] = [];
  personas: PersonaCore[] = [];
  ingenieros: IngenieroAgronomoCore[] = [];
  responsables: ResponsableSecano[] = [];

  planDetallesParams: PlanDetallesParams = null;
  planChacrasParams: PlanChacrasParams = null;
  planRotacionComponentesParams: PlanRotacionComponentesParams = null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.planId = this.route.snapshot.paramMap.get('PlanId');
  }

  ngOnInit(): void {
    combineLatest(
      this.store.pipe(
        select(selectAllEntityPlanes),
        filter(planes => !!planes)
      ),
      this.store.pipe(select(selectAllEntityChacras)),
      this.store.pipe(select(selectAllEntityPersonas)),
      this.store.pipe(select(selectAllEntityEmpresas)),
      this.store.pipe(select(selectAllEntityIngenierosAgronomos)),
      this.store.pipe(select(selectAllEntityResponsables)),
      this.store.pipe(select(selectAllEntityRotaciones)),
      this.store.pipe(select(selectAllEntityComponentes)),
      this.store.pipe(select(selectAllEntityCultivos)),
      this.store.pipe(select(selectAllEntityManejos)),
      this.store.pipe(select(selectAllEntityRendimientos)),
      this.store.pipe(select(selectAllEntityRelacionesPerdidaSuelo)),
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
        rendimientos: RendimientoSecano[],
        relaciones: RelacionPerdidaSueloSecano[]
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
        rendimientos,
        relaciones
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
        relaciones: RelacionPerdidaSueloSecano[];
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
        this.relaciones = sources.relaciones;
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
    this.planDetallesParams = {
      plan,
      ingenieros: this.ingenieros,
      personas: this.personas,
      empresas: this.empresas
    };
    this.planRotacionComponentesParams = {
      plan,
      rotaciones: this.rotaciones,
      componentes: this.componentes,
      cultivos: this.cultivos,
      manejos: this.manejos,
      rendimientos: this.rendimientos,
      relaciones: this.relaciones
    };
    this.planChacrasParams = {
      plan,
      chacras: this.chacras
    };
  }

  reportePlan() {
    this.store.dispatch(
      new EntityPlanesGetUrlRequestAction({
        item: this.plan,
        urlType: PlanSecanoUrlType.REPORT
      })
    );
  }
}
