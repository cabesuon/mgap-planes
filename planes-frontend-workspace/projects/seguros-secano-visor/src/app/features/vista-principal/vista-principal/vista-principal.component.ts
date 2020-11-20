import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import {
  TableValueType,
  TableActionEvent,
  FormActionType
} from 'planes-core-lib';

import {
  PlanSecano,
  createEmptyPlanSecano,
  PLANESSECANOTABLE_COLUMNS_DEFAULT,
  PlanesSecanoTableParams,
  PlanesSecanoTableAction,
  PlanSecanoEstado
} from 'planes-secano-lib';

import { NotificationService } from '../../../core/notifications/notification.service';

import { LoggingService } from '../../../core/logging/logging.service';

import { AppState } from '../../../core/core.state';

import { selectAllEntityPlanes } from '../../entity-planes/entity-planes.selectors';
import { selectAllEntityPersonas } from '../../entity-personas/entity-personas.selectors';
import { selectAllEntityIngenierosAgronomos } from '../../entity-ingenieros-agronomos/entity-ingenieros-agronomos.selectors';
import { selectAllEntityEmpresas } from '../../entity-empresas/entity-empresas.selectors';

import {
  EntityPlanesFormDialogData,
  EntityPlanesFormDialogComponent
} from '../../entity-planes/entity-planes-form-dialog/entity-planes-form-dialog.component';

const DIALOG_WIDTH = '300px';
const DIALOG_MAX_HEIGHT = '500px';

@Component({
  selector: 'app-vista-principal',
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.scss']
})
export class VistaPrincipalComponent implements OnInit {
  planesTableColumns = [
    ...PLANESSECANOTABLE_COLUMNS_DEFAULT,
    {
      type: TableValueType.ACTION,
      name: 'EstadoAction',
      label: '',
      sort: false,
      filter: false,
      actionFormat: (p: PlanSecano) => {
        switch (p.planSecanoEstado) {
          case PlanSecanoEstado.EDICION:
            return {
              value: PlanesSecanoTableAction.PRESENTAR,
              text: 'Presentar Plan',
              icon: 'file-signature'
            };
          case PlanSecanoEstado.PRESENTADO:
            return null;
        }
      }
    },
    {
      type: TableValueType.ACTION,
      name: 'RemoveAction',
      label: '',
      sort: false,
      filter: false,
      actionFormat: (p: PlanSecano) => {
        switch (p.planSecanoEstado) {
          case PlanSecanoEstado.EDICION:
            return {
              value: PlanesSecanoTableAction.DESCARTAR,
              text: 'Descartar Plan',
              icon: 'trash'
            };
          case PlanSecanoEstado.PRESENTADO:
            return {
              value: PlanesSecanoTableAction.CANCELAR,
              text: 'Cancelar Plan',
              icon: 'ban'
            };
        }
      }
    }
  ];

  planesTableParams: PlanesSecanoTableParams = {
    columns: this.planesTableColumns,
    sources: {
      ingenierosAgronomos: [],
      personas: [],
      empresas: [],
      responsables: []
    },
    planes: []
  };

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
      this.store.pipe(select(selectAllEntityPlanes)),
      this.store.pipe(select(selectAllEntityPersonas)),
      this.store.pipe(select(selectAllEntityIngenierosAgronomos)),
      this.store.pipe(select(selectAllEntityEmpresas)),
      (planes, personas, ingenierosAgronomos, empresas) => ({
        planes,
        personas,
        ingenierosAgronomos,
        empresas
      })
    ).subscribe(
      sources =>
        (this.planesTableParams = {
          columns: this.planesTableColumns,
          sources: {
            personas: sources.personas,
            ingenierosAgronomos: sources.ingenierosAgronomos,
            empresas: sources.empresas,
            responsables: []
          },
          planes: sources.planes
        })
    );
  }

  planesTableActioned(actionValue: TableActionEvent) {
    switch (actionValue.value) {
      case PlanesSecanoTableAction.GOTOVISTAMAPA:
        this.router.navigate([
          '/features/mapa',
          { PlanId: actionValue.obj.planId }
        ]);
        break;
      case PlanesSecanoTableAction.GOTOVISTADMINISTRATIVA:
        this.router.navigate([
          '/features/administrativo',
          { PlanId: actionValue.obj.planId }
        ]);
        break;
      case PlanesSecanoTableAction.PRESENTAR:
        this.notificationService.info(
          `[No Implementado] Presentar ${actionValue.obj.planId}`
        );
        break;
      case PlanesSecanoTableAction.CANCELAR:
        this.notificationService.info(
          `[No Implementado] Cancelar ${actionValue.obj.planId}`
        );
        break;
      case PlanesSecanoTableAction.DESCARTAR:
        this.notificationService.info(
          `[No Implementado] Descartar ${actionValue.obj.planId}`
        );
        break;
      default:
        this.notificationService.info(
          `[No Implementado] ? ${actionValue.obj.planId}`
        );
        break;
    }
  }

  newPlan() {
    this.openDialogPlan(FormActionType.Add);
  }

  // dialogs

  openDialogPlan(action: FormActionType) {
    const inData: EntityPlanesFormDialogData = {
      plan: createEmptyPlanSecano(),
      action: action
      // empresas: this.planesTableParams.sources.empresas,
      // ingenieroAgronomoId: '1'
    };
    this.dialog.open(EntityPlanesFormDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    });
  }
}
