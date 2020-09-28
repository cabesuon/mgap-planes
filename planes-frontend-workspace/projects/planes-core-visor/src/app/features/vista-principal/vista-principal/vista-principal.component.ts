import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import {
  PlanCore,
  createEmptyPlanCore,
  PLANESCORETABLE_COLUMNS_DEFAULT,
  PlanesCoreTableParams,
  PlanesCoreTableAction,
  TableValueType,
  TableActionEvent,
  FormActionType,
  PlanCoreEstado
} from 'planes-core-lib';

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
    ...PLANESCORETABLE_COLUMNS_DEFAULT,
    {
      type: TableValueType.ACTION,
      name: 'EstadoAction',
      label: '',
      sort: false,
      filter: false,
      actionFormat: (p: PlanCore) => {
        switch (p.planEstado) {
          case PlanCoreEstado.EDICION:
            return {
              value: PlanesCoreTableAction.PRESENTAR,
              text: 'Presentar Plan',
              icon: 'file-signature'
            };
          case PlanCoreEstado.PRESENTADO:
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
      actionFormat: (p: PlanCore) => {
        switch (p.planEstado) {
          case PlanCoreEstado.EDICION:
            return {
              value: PlanesCoreTableAction.DESCARTAR,
              text: 'Descartar Plan',
              icon: 'trash'
            };
          case PlanCoreEstado.PRESENTADO:
            return {
              value: PlanesCoreTableAction.CANCELAR,
              text: 'Cancelar Plan',
              icon: 'ban'
            };
        }
      }
    }
  ];

  planesTableParams: PlanesCoreTableParams = {
    columns: this.planesTableColumns,
    sources: {
      ingenierosAgronomos: [],
      personas: [],
      empresas: []
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
            empresas: sources.empresas
          },
          planes: sources.planes
        })
    );
  }

  planesTableActioned(actionValue: TableActionEvent) {
    switch (actionValue.value) {
      case PlanesCoreTableAction.GOTOVISTAMAPA:
        this.router.navigate([
          '/features/mapa',
          { PlanId: actionValue.obj.planId }
        ]);
        break;
      case PlanesCoreTableAction.GOTOVISTADMINISTRATIVA:
        this.router.navigate([
          '/features/administrativo',
          { PlanId: actionValue.obj.planId }
        ]);
        break;
      case PlanesCoreTableAction.PRESENTAR:
        this.notificationService.info(
          `[No Implementado] Presentar ${actionValue.obj.planId}`
        );
        break;
      case PlanesCoreTableAction.CANCELAR:
        this.notificationService.info(
          `[No Implementado] Cancelar ${actionValue.obj.planId}`
        );
        break;
      case PlanesCoreTableAction.DESCARTAR:
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
      plan: createEmptyPlanCore(),
      action: action,
      empresas: this.planesTableParams.sources.empresas,
      ingenieroAgronomoId: '1'
    };
    this.dialog.open(EntityPlanesFormDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    });
  }
}
