import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import {
  EmpresaCore,
  nameEmpresaCore,
  numberEmpresaCore
} from 'planes-core-lib';

import {
  UnidadManejoSegurosSecano,
  ChacraSegurosSecano,
  ComponenteProductivoSegurosSecano
} from 'seguros-secano-lib';

import { NotificationService } from '../../../core/notifications/notification.service';

import { LoggingService } from '../../../core/logging/logging.service';

import { AppState } from '../../../core/core.state';

import { selectAllEntityUnidadesManejos } from '../../entity-unidades/entity-unidades.selectors';
import { selectAllEntityEmpresas } from '../../entity-empresas/entity-empresas.selectors';
import { selectAllEntityChacras } from '../../entity-chacras/entity-chacras.selectors';
import { selectAllEntityComponentes } from '../../entity-componentes/entity-component.selectors';

@Component({
  selector: 'app-vista-principal',
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.scss']
})
export class VistaPrincipalComponent implements OnInit {
  empresas: EmpresaCore[] = [];
  empresasName: string[] = [];
  empresasNumber: string[] = [];
  unidades: UnidadManejoSegurosSecano[] = [];
  chacras: ChacraSegurosSecano[] = [];
  componentes: ComponenteProductivoSegurosSecano[] = [];
  rdata = {};

  constructor(
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private loggingService: LoggingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    combineLatest(
      this.store.pipe(select(selectAllEntityEmpresas)),
      this.store.pipe(select(selectAllEntityUnidadesManejos)),
      this.store.pipe(select(selectAllEntityChacras)),
      this.store.pipe(select(selectAllEntityComponentes)),
      (empresas, unidades, chacras, componentes) => ({
        empresas,
        unidades,
        chacras,
        componentes
      })
    ).subscribe(sources => {
      this.empresas = sources.empresas;
      this.unidades = sources.unidades;
      this.chacras = sources.chacras;
      this.componentes = sources.componentes;
      this.relateData();
    });
  }

  relateData() {
    this.rdata = {};
    if (!this.empresas) {
      return;
    }
    for (const e of this.empresas) {
      this.empresasName.push(nameEmpresaCore(e));
      this.empresasNumber.push(numberEmpresaCore(e));
      this.rdata[e.empresaId] = {
        empresa: e,
        unidades: {},
        chacras: {},
        unidadesArr: [],
        chacrasArr: []
      };
    }
    if (!this.unidades) {
      return;
    }
    for (const u of this.unidades) {
      this.rdata[u.empresaId].unidadesArr.push(u);
      this.rdata[u.empresaId].unidades[u.unidadId] = {
        unidad: u,
        chacras: {},
        componentes: {},
        chacrasArr: [],
        componentesArr: []
      };
    }
    if (!this.chacras) {
      return;
    }
    for (const c of this.chacras) {
      if (c.unidadId) {
        this.rdata[c.empresaId].unidades[c.unidadId].chacrasArr.push(c);
        this.rdata[c.empresaId].unidades[c.unidadId].chacras[c.chacraId] = {
          chacra: c,
          componentes: this.componentes.find(c => c.chacraId === c.chacraId),
          componentesArr: []
        };
      } else {
        this.rdata[c.empresaId].chacrasArr.push(c);
        let enviado = "";
        console.log("todos lso componentes");
        console.log(this.componentes);
        const componente = this.componentes.find(compo => compo.chacraId === c.chacraId);
        console.log("componentes");
        console.log(componente);
        if (componente && componente.fechaEnviado){
          enviado = "Enviado";
        } else {
          enviado = "No enviado";
        }
        this.rdata[c.empresaId].chacras[c.chacraId] = {
          chacra: c,
          componentes: componente,
          componentesArr: [],
          enviado: enviado 
        };
        console.log(this.rdata[c.empresaId].chacras[c.chacraId]);
      }
    }
  }

  actionClick(action: string, empresa: EmpresaCore) {
    switch (action) {
      case 'GotoVistaMapa':
        this.router.navigate([
          '/features/mapa',
          { EmpresaId: empresa.empresaId }
        ]);
        break;
      case 'GotoVistaAdministrativo':
        this.router.navigate([
          '/features/administrativo',
          { EmpresaId: empresa.empresaId }
        ]);
        break;
    }
  }
}
