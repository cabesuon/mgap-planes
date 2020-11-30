import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  FormActionType,
  TableActionEvent,
  PersonaCore,
  EmpresaCore,
  EmpresasCoreDetailParams,
  nameEmpresaCore,
  numberEmpresaCore
} from 'planes-core-lib';

import {
  UnidadManejoSegurosSecano,
  createEmptyUnidadManejoSegurosSecano,
  ComponentesProductivosSegurosSecanoTableParams
} from 'seguros-secano-lib';

import { AppState } from '../../../core/core.state';
import { NotificationService } from '../../../core/notifications/notification.service';

import { AseguradoraSegurosSecano } from '../../entity-aseguradoras/entity-aseguradoras.state';
import { ChacraSegurosSecano } from '../../entity-chacras/entity-chacras.state';
import { ComponenteProductivoSegurosSecano } from '../../entity-componentes/entity-componentes.state';
import { CultivoSegurosSecano } from '../../entity-cultivos/entity-cultivos.state';
import { CicloSegurosSecano } from '../../entity-ciclos/entity-ciclos.state';

import {
  EntityUnidadesFormDialogData,
  EntityUnidadesFormDialogComponent
} from '../../entity-unidades/entity-unidades-form-dialog/entity-unidades-form-dialog.component';

import { selectAllEntityChacras } from '../../entity-chacras/entity-chacras.selectors';
import { selectAllEntityUnidadesManejos } from '../../entity-unidades/entity-unidades.selectors';
import { selectAllEntityComponentes } from '../../entity-componentes/entity-component.selectors';
import { selectAllEntityCultivos } from '../../entity-cultivos/entity-cultivos.selectors';
import { selectAllEntityCiclos } from '../../entity-ciclos/entity-ciclos.selectors';
import { selectAllEntityEmpresas } from '../../entity-empresas/entity-empresas.selectors';
import { selectAllEntityPersonas } from '../../entity-personas/entity-personas.selectors';
import { selectAllEntityAseguradoras } from '../../entity-aseguradoras/entity-aseguradoras.selectors';

const DIALOG_WIDTH = '300px';
const DIALOG_MAX_HEIGHT = '500px';

interface UnidadTreeNode {
  unidad: UnidadManejoSegurosSecano;
  chacras: ChacraSegurosSecano[];
  componentes: ComponenteProductivoSegurosSecano[];
  ctps: ComponentesProductivosSegurosSecanoTableParams;
}

@Component({
  selector: 'app-vista-administrativo',
  templateUrl: './vista-administrativo.component.html',
  styleUrls: ['./vista-administrativo.component.scss']
})
export class VistaAdministrativoComponent implements OnInit {
  empresaId: string = null;
  empresaName: string = null;
  empresaNumber: string = null;
  empresa: EmpresaCore = null;
  empresas: EmpresaCore[] = [];
  unidades: UnidadManejoSegurosSecano[] = [];
  chacras: ChacraSegurosSecano[] = [];
  componentes: ComponenteProductivoSegurosSecano[] = [];
  cultivos: CultivoSegurosSecano[] = [];
  ciclos: CicloSegurosSecano[] = [];
  personas: PersonaCore[] = [];
  aseguradoras: AseguradoraSegurosSecano[] = [];

  empresaDetailParams: EmpresasCoreDetailParams;
  componentesTableParams: ComponentesProductivosSegurosSecanoTableParams[];

  generalRow = true;
  generalRowVisible = true;

  uuaaDic: { [key: string]: UnidadTreeNode } = null;
  uuaaArr: UnidadTreeNode[] = [];

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.empresaId = this.route.snapshot.paramMap.get('EmpresaId');

    combineLatest(
      this.store.pipe(
        select(selectAllEntityEmpresas),
        filter(empresas => !!empresas)
      ),
      this.store.pipe(select(selectAllEntityPersonas)),
      this.store.pipe(select(selectAllEntityAseguradoras)),
      this.store.pipe(select(selectAllEntityUnidadesManejos)),
      this.store.pipe(select(selectAllEntityChacras)),
      this.store.pipe(select(selectAllEntityComponentes)),
      this.store.pipe(select(selectAllEntityCultivos)),
      this.store.pipe(select(selectAllEntityCiclos)),
      (
        empresas: EmpresaCore[],
        personas: PersonaCore[],
        aseguradoras: AseguradoraSegurosSecano[],
        unidades: UnidadManejoSegurosSecano[],
        chacras: ChacraSegurosSecano[],
        componentes: ComponenteProductivoSegurosSecano[],
        cultivos: CultivoSegurosSecano[],
        ciclos: CicloSegurosSecano[]
      ) => ({
        empresas,
        personas,
        aseguradoras,
        unidades,
        chacras,
        componentes,
        cultivos,
        ciclos
      })
    ).subscribe(
      (sources: {
        empresas: EmpresaCore[];
        personas: PersonaCore[];
        aseguradoras: AseguradoraSegurosSecano[];
        chacras: ChacraSegurosSecano[];
        unidades: UnidadManejoSegurosSecano[];
        componentes: ComponenteProductivoSegurosSecano[];
        cultivos: CultivoSegurosSecano[];
        ciclos: CicloSegurosSecano[];
      }) => {
        this.empresas = sources.empresas;
        this.personas = sources.personas;
        this.aseguradoras = sources.aseguradoras;
        this.chacras = sources.chacras;
        this.unidades = sources.unidades;
        this.componentes = sources.componentes;
        this.cultivos = sources.cultivos;
        this.ciclos = sources.ciclos;

        if (this.empresaId) {
          this.empresaChange(
            this.empresas.find(e => e.empresaId === this.empresaId)
          );
        }
      }
    );
  }

  empresaChange(empresa: EmpresaCore) {
    if (!empresa) {
      return;
    }

    this.empresaName = nameEmpresaCore(empresa);
    this.empresaNumber = numberEmpresaCore(empresa);
    this.empresa = empresa;

    this.empresaDetailParams = { empresa };

    const unidadesEmpresa = this.unidades.filter(
      u => u.empresaId === empresa.empresaId
    );

    this.uuaaDic = {};
    this.uuaaArr = [];
    for (const unidad of unidadesEmpresa) {
      const u = {
        unidad,
        chacras: [],
        componentes: [],
        ctps: null
      };
      u.chacras = this.chacras.filter(c => c.unidadId === unidad.unidadId);
      for (const uchacra of u.chacras) {
        const ucc = this.componentes.filter(
          uc => uc.chacraId === uchacra.chacraId
        );
        // work on this!!!
        // select only one
        if (ucc && ucc.length > 0) {
          u.componentes.push(ucc[0]);
        }
      }
      u.ctps = {
        componentes: u.componentes,
        sources: {
          empresas: this.empresas,
          chacras: u.chacras,
          cultivos: this.cultivos,
          ciclos: this.ciclos,
          aseguradoras: this.aseguradoras
        }
      };
      this.uuaaDic[unidad.unidadId] = u;
    }
    this.uuaaArr = Object.values(this.uuaaDic);
  }

  componentesTableAction(action: TableActionEvent) {
    switch (action.value) {
      case 'Guardar':
        this.notification.info(
          `Guardar Componente ${action.obj.componenteId}.`
        );
        break;
      case 'Enviar':
        this.notification.info(`Enviar Componente ${action.obj.componenteId}.`);
        break;
    }
  }

  toggleGeneralRow() {
    this.generalRowVisible = !this.generalRowVisible;
  }

  newUnidadManejo() {
    this.openDialogUnidadManejo(FormActionType.Add);
  }

  // dialogs

  openDialogUnidadManejo(action: FormActionType) {
    const inData: EntityUnidadesFormDialogData = {
      unidad: createEmptyUnidadManejoSegurosSecano(),
      action: action
    };
    this.dialog.open(EntityUnidadesFormDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    });
  }
}
