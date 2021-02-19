import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import {
  TableValueType,
  TableActionEvent,
  FormActionType,
  ConfirmDialogData,
  ConfirmDialogResultType,
  ConfirmDialogComponent
} from 'planes-core-lib';

import {
  PlanSecano,
  createEmptyPlanSecano,
  PLANESSECANOTABLE_COLUMNS_DEFAULT,
  PlanesSecanoTableParams,
  PlanesSecanoTableAction,
  PlanSecanoEstado,
  PlanSecanoUrlType
} from 'planes-secano-lib';

import { NotificationService } from '../../../core/notifications/notification.service';

import { LoggingService } from '../../../core/logging/logging.service';

import { AppState } from '../../../core/core.state';

import { selectAuthPersonaId } from '../../../core/auth/auth.selectors';

import { selectAllEntityPlanes } from '../../entity-planes/entity-planes.selectors';
import { selectAllEntityPersonas } from '../../entity-personas/entity-personas.selectors';
import { selectAllEntityIngenierosAgronomos } from '../../entity-ingenieros-agronomos/entity-ingenieros-agronomos.selectors';
import { selectAllEntityEmpresas } from '../../entity-empresas/entity-empresas.selectors';

import {
  EntityPlanesFormDialogData,
  EntityPlanesFormDialogComponent
} from '../../entity-planes/entity-planes-form-dialog/entity-planes-form-dialog.component';

import {
  EntityPlanesChangeRequestAction,
  EntityPlanesDeleteRequestAction,
  EntityPlanesCopyRequestAction,
  EntityPlanesGetUrlRequestAction
} from '../../entity-planes/entity-planes.actions';
import { IngenieroAgronomoCore } from 'projects/planes-core-lib/src/public-api';

const DIALOG_WIDTH = '300px';
const DIALOG_MAX_HEIGHT = '500px';

@Component({
  selector: 'app-vista-principal',
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.scss']
})
export class VistaPrincipalComponent implements OnInit {
  planesTableColumns = [
    {
      type: TableValueType.ACTION,
      name: 'ModificarAction',
      label: '',
      sort: false,
      filter: false,
      actionFormat: (p: PlanSecano) => {
        if (p.planEstado === PlanSecanoEstado.EDICION) {
          return {
            value: PlanesSecanoTableAction.MODIFICAR,
            text: 'Modificar Plan',
            icon: 'edit'
          };
        }
        return null;
      }
    },
    {
      type: TableValueType.ACTION,
      name: 'CopiarAction',
      label: '',
      sort: false,
      filter: false,
      actionFormat: (p: PlanSecano) => {
        return {
          value: PlanesSecanoTableAction.COPIAR,
          text: 'Copiar Plan',
          icon: 'clone'
        };
      }
    },
    ...PLANESSECANOTABLE_COLUMNS_DEFAULT,
    {
      type: TableValueType.ACTION,
      name: 'EstadoAction',
      label: '',
      sort: false,
      filter: false,
      actionFormat: (p: PlanSecano) => {
        switch (p.planEstado) {
          case PlanSecanoEstado.EDICION:
            return {
              value: PlanesSecanoTableAction.PRESENTAR,
              text: 'Presentar Plan',
              icon: 'file-signature'
            };
          case PlanSecanoEstado.PENDIENTEPAGO:
            return {
              value: PlanesSecanoTableAction.PAGAR,
              text: 'Pagar',
              icon: 'dollar-sign'
            };
          case PlanSecanoEstado.PRESENTADO:
          default:
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
        switch (p.planEstado) {
          case PlanSecanoEstado.EDICION:
            return {
              value: PlanesSecanoTableAction.DESCARTAR,
              text: 'Descartar Plan',
              icon: 'trash'
            };
          case PlanSecanoEstado.PRESENTADO:
          case PlanSecanoEstado.PENDIENTEPAGO:
            return {
              value: PlanesSecanoTableAction.CANCELAR,
              text: 'Cancelar Plan',
              icon: 'ban'
            };
          default:
            return {
              value: 'Shellshock',
              text: 'Shellshock',
              icon: 'bomb'
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
    planes: [],
    filter: true,
    pagination: true
  };

  ingenieroAgronomo: IngenieroAgronomoCore = null;

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
      this.store.pipe(select(selectAuthPersonaId)),
      this.store.pipe(select(selectAllEntityPlanes)),
      this.store.pipe(select(selectAllEntityPersonas)),
      this.store.pipe(select(selectAllEntityIngenierosAgronomos)),
      this.store.pipe(select(selectAllEntityEmpresas)),
      (personaId, planes, personas, ingenierosAgronomos, empresas) => ({
        personaId,
        planes,
        personas,
        ingenierosAgronomos,
        empresas
      })
    ).subscribe(sources => {
      this.ingenieroAgronomo = sources.ingenierosAgronomos.find(
        ia => ia.contacto.personaId === sources.personaId
      );
      this.planesTableParams = {
        columns: this.ingenieroAgronomo
          ? this.planesTableColumns
          : PLANESSECANOTABLE_COLUMNS_DEFAULT,
        sources: {
          personas: sources.personas,
          ingenierosAgronomos: sources.ingenierosAgronomos,
          empresas: sources.empresas,
          responsables: []
        },
        planes: sources.planes,
        filter: true,
        pagination: true
      };
    });
  }

  planesTableActioned(actionValue: TableActionEvent) {
    let action = null;
    switch (actionValue.value) {
      case PlanesSecanoTableAction.MODIFICAR:
        this.updatePlan(actionValue.obj);
        break;
      case PlanesSecanoTableAction.COPIAR:
        this.copyPlan(actionValue.obj);
        break;
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
        action = new EntityPlanesChangeRequestAction({
          item: {
            ...actionValue.obj,
            planEstado: PlanSecanoEstado.PRESENTADO
          }
        });
        this.openConfirmDialog(
          'Presentar Plan',
          `Confirma la presentación del plan ${actionValue.obj.planNombre}.`,
          action
        );
        break;
      case PlanesSecanoTableAction.CANCELAR:
        action = new EntityPlanesDeleteRequestAction({
          item: {
            ...actionValue.obj
          }
        });
        this.openConfirmDialog(
          'Cancelar Plan',
          `Confirma la cancelación del plan ${actionValue.obj.planNombre}.`,
          action
        );
        break;
      case PlanesSecanoTableAction.DESCARTAR:
        action = new EntityPlanesDeleteRequestAction({
          item: {
            ...actionValue.obj
          }
        });
        this.openConfirmDialog(
          'Eliminar Plan',
          `Confirma la eliminación del plan ${actionValue.obj.planNombre}.`,
          action
        );
        break;
      case PlanesSecanoTableAction.PAGAR:
        this.store.dispatch(
          new EntityPlanesGetUrlRequestAction({
            item: actionValue.obj,
            urlType: PlanSecanoUrlType.PASARELA_PAGOS
          })
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
    this.openPlanDialog(FormActionType.Add, {
      ...createEmptyPlanSecano(),
      ingenieroAgronomoId: this.ingenieroAgronomo.ingenieroAgronomoId
    });
  }

  updatePlan(plan: PlanSecano) {
    this.openPlanDialog(FormActionType.Update, plan);
  }

  copyPlan(plan: PlanSecano) {
    this.store.dispatch(new EntityPlanesCopyRequestAction({ item: plan }));
  }

  newTemplateRotacion() {
    this.notificationService.default('Nuevo Template Rotación.');
  }

  // dialogs

  openPlanDialog(action: FormActionType, plan: PlanSecano) {
    const inData: EntityPlanesFormDialogData = {
      plan,
      action: action,
      empresas: this.planesTableParams.sources.empresas
    };
    this.dialog.open(EntityPlanesFormDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    });
  }

  openConfirmDialog(title: string, question: string, action: any) {
    const inData: ConfirmDialogData = {
      title,
      question,
      result: ConfirmDialogResultType.Cancel
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    });
    dialogRef.afterClosed().subscribe(outData => {
      if (outData && outData.result === ConfirmDialogResultType.Ok) {
        if (action) {
          this.store.dispatch(action);
        }
      }
    });
  }
}
