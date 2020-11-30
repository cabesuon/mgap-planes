import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import {
  TableValueType,
  TableActionEvent,
  FormActionType,
  EmpresaCore,
  ChacraCore
} from 'planes-core-lib';

import {
  UnidadManejoSegurosSecano,
  createEmptyUnidadManejoSegurosSecano,
  UNIDADESMANEJOSSEGUROSSECANOTABLE_COLUMNS_DEFAULT,
  UnidadesManejosSegurosSecanoTableParams,
  UnidadesManejosSegurosSecanoTableAction,
  ChacraSegurosSecano
} from 'seguros-secano-lib';

import { NotificationService } from '../../../core/notifications/notification.service';

import { LoggingService } from '../../../core/logging/logging.service';

import { AppState } from '../../../core/core.state';

import { selectAllEntityUnidadesManejos } from '../../entity-unidades/entity-unidades.selectors';
import { selectAllEntityPersonas } from '../../entity-personas/entity-personas.selectors';
import { selectAllEntityEmpresas } from '../../entity-empresas/entity-empresas.selectors';
import { selectAllEntityChacras } from '../../entity-chacras/entity-chacras.selectors';
import { selectAllEntityCiclos } from '../../entity-ciclos/entity-ciclos.selectors';
import { selectAllEntityCultivos } from '../../entity-cultivos/entity-cultivos.selectors';

import {
  EntityUnidadesFormDialogData,
  EntityUnidadesFormDialogComponent
} from '../../entity-unidades/entity-unidades-form-dialog/entity-unidades-form-dialog.component';
import { selectAllEntityAseguradoras } from '../../entity-aseguradoras/entity-aseguradoras.selectors';

const DIALOG_WIDTH = '300px';
const DIALOG_MAX_HEIGHT = '500px';

@Component({
  selector: 'app-vista-principal',
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.scss']
})
export class VistaPrincipalComponent implements OnInit {
  unidadesTableColumns = [
    ...UNIDADESMANEJOSSEGUROSSECANOTABLE_COLUMNS_DEFAULT,
    {
      type: TableValueType.ACTION,
      name: 'EstadoAction',
      label: '',
      sort: false,
      filter: false,
      actionFormat: (u: UnidadManejoSegurosSecano) => {
        return {
          value: UnidadesManejosSegurosSecanoTableAction.ENVIAR,
          text: 'Enviar Unidad de Manejo',
          icon: 'file-signature'
        };
      }
    }
  ];

  unidadesTableParams: UnidadesManejosSegurosSecanoTableParams = {
    columns: this.unidadesTableColumns,
    unidades: [],
    sources: {
      ciclos: [],
      cultivos: [],
      aseguradoras: [],
      empresas: []
    }
  };

  empresas: EmpresaCore[] = [];
  unidades: UnidadManejoSegurosSecano[] = [];
  chacras: ChacraSegurosSecano [] = [];

  constructor(
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private loggingService: LoggingService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    combineLatest(      
      this.store.pipe(select(selectAllEntityCiclos)),
      this.store.pipe(select(selectAllEntityCultivos)),
      this.store.pipe(select(selectAllEntityPersonas)),
      this.store.pipe(select(selectAllEntityEmpresas)),
      this.store.pipe(select(selectAllEntityUnidadesManejos)),
      this.store.pipe(select(selectAllEntityAseguradoras)),
      this.store.pipe(select(selectAllEntityChacras)),
      (ciclos, cultivos, personas, empresas, unidades, aseguradoras, chacras) => ({
        ciclos,
        cultivos,
        personas,
        empresas,
        unidades,
        aseguradoras,
        chacras
      })
    ).subscribe((
      sources =>
        (
          this.unidadesTableParams = {
            columns: this.unidadesTableColumns,
            sources: {
              ciclos: sources.ciclos,
              cultivos: sources.cultivos,
              aseguradoras: sources.aseguradoras,
              empresas: sources.empresas
            },
            unidades: sources.unidades
          },
          console.log(sources.unidades),
          this.empresas = sources.empresas,
          this.unidades = sources.unidades,
          this.chacras = sources.chacras
        )
    ));
  }

  unidadesTableActioned(actionValue: TableActionEvent) {
    switch (actionValue.value) {
      /*case UnidadesManejosSegurosSecanoTableAction.GOTOVISTAMAPA:
        this.router.navigate([
          '/features/mapa', 
          { UnidadId: actionValue.obj.unidadId }
        ]);
        break;
      case UnidadesManejosSegurosSecanoTableAction.GOTOVISTADMINISTRATIVA:
        this.router.navigate([
          '/features/administrativo',
          { UnidadId: actionValue.obj.unidadId }
        ]);
        break;*/
      default:
        this.notificationService.info(
          `[No Implementado] ? ${actionValue.obj.planId}`
        );
        break;
    }
  }

  newUnidadManejo() {
    this.openDialogUnidadManejo(FormActionType.Add);
  }

  // dialogs

  openDialogUnidadManejo(action: FormActionType) {
    const inData: EntityUnidadesFormDialogData = {
      unidad: createEmptyUnidadManejoSegurosSecano(),
      action: action,
      aseguradoras: this.unidadesTableParams.sources.aseguradoras,
      cultivos: this.unidadesTableParams.sources.cultivos,
      ciclos: this.unidadesTableParams.sources.ciclos,
      empresas: this.unidadesTableParams.sources.empresas      
    };
    this.dialog.open(EntityUnidadesFormDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    });
  }
}
