import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import {
  PlanesCoreTableParams,
  PlanesCoreTableActionValue,
  PlanesCoreTableAction,
  FormActionType
} from 'planes-core-lib';

import { NotificationService } from '../../../core/notifications/notification.service';

import { LoggingService } from '../../../core/logging/logging.service';

import { AppState } from '../../../core/core.state';

import { selectAllEntityPlanes } from '../../entity-planes/entity-planes.selectors';
import { selectAllEntityPersonas } from '../../entity-personas/entity-personas.selectors';
import { selectAllEntityIngenierosAgronomos } from '../../entity-ingenieros-agronomos/entity-ingenieros-agronomos.selectors';
import { selectAllEntityResponsables } from '../../entity-responsables/entity-responsables.selectors';

import {
  EntityPlanesFormDialogData,
  EntityPlanesFormDialogComponent
} from '../../entity-planes/entity-planes-form-dialog/entity-planes-form-dialog.component';
import { createEmptyPlanCore } from 'projects/planes-core-lib/src/public-api';

const DIALOG_WIDTH = '300px';
const DIALOG_MAX_HEIGHT = '500px';

@Component({
  selector: 'app-vista-principal',
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.scss']
})
export class VistaPrincipalComponent implements OnInit {
  planesTableParams: PlanesCoreTableParams = {
    sources: {
      planes: [],
      ingenierosAgronomos: [],
      personas: [],
      responsables: []
    },
    actions: true
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
      this.store.pipe(select(selectAllEntityResponsables)),
      (planes, personas, ingenierosAgronomos, responsables) => ({
        planes,
        personas,
        ingenierosAgronomos,
        responsables
      })
    ).subscribe(
      sources => (this.planesTableParams = { sources, actions: true })
    );
  }

  planesTableActioned(actionValue: PlanesCoreTableActionValue) {
    switch (actionValue.action) {
      case PlanesCoreTableAction.GOTOVISTAMAPA:
        this.router.navigate([
          '/features/mapa',
          { PlanId: actionValue.plan.planId }
        ]);
        break;
      case PlanesCoreTableAction.GOTOVISTAADMINISTRATIVO:
        this.router.navigate([
          '/features/administrativo',
          { PlanId: actionValue.plan.planId }
        ]);
        break;
      case PlanesCoreTableAction.PRESENTAR:
        this.notificationService.info(
          `[En Desarrollo] Presentar ${actionValue.plan.planId}`
        );
        break;
      case PlanesCoreTableAction.REVISARPAGO:
        this.notificationService.info(
          `[En Desarrollo] Revisar Pago ${actionValue.plan.planId}`
        );
        break;
      case PlanesCoreTableAction.DESCARTAR:
        this.notificationService.info(
          `[En Desarrollo] Descartar ${actionValue.plan.planId}`
        );
        break;
      default:
        this.notificationService.info(
          `[En Desarrollo] ? ${actionValue.plan.planId}`
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
      action: action
    };
    const dialogRef = this.dialog.open(EntityPlanesFormDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    });
    // dialogRef.afterClosed().subscribe(outData => {
    //   this.loggingService.info(outData, this);
    // });
  }
}
