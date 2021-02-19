import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import {
  ZonaExclusionCore,
  FormActionType,
  ZonasExclusionCoreFormInput,
  DibujoCore
} from 'planes-core-lib';

import { AppState } from '../../../core/core.state';
import { LoggingService } from '../../../core/logging/logging.service';

import {
  EntityZonasExclusionAddRequestAction,
  EntityZonasExclusionChangeRequestAction
} from '../entity-zonas-exclusion.actions';

export interface EntityZonasExclusionFormDialogData
  extends ZonasExclusionCoreFormInput {}

@Component({
  selector: 'app-entity-zonas-exclusion-form-dialog',
  templateUrl: './entity-zonas-exclusion-form-dialog.component.html',
  styleUrls: ['./entity-zonas-exclusion-form-dialog.component.scss']
})
export class EntityZonasExclusionFormDialogComponent implements OnInit {
  title = 'Crear Zona de Exclusión';
  submitText = 'Crear';
  cancelText = 'Cancelar';

  formValid: boolean;
  formValue: ZonaExclusionCore;

  constructor(
    private store: Store<AppState>,
    private logginService: LoggingService,
    public dialogRef: MatDialogRef<EntityZonasExclusionFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityZonasExclusionFormDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.action === FormActionType.Update) {
      this.title = 'Actualizar Zona de Exclusión';
      this.submitText = 'Actualizar';
    }
  }

  formStatusChanges(status: string) {
    this.formValid = status === 'VALID';
  }

  formValueChanges(zona: ZonaExclusionCore) {
    this.formValue = zona;
  }

  onCancel() {
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    if (this.formValid) {
      const item = { ...this.formValue };
      let dibujo: DibujoCore = null;
      if (
        item.zonaExclusionGeometria &&
        this.data.zona.zonaExclusionGeometria !== item.zonaExclusionGeometria
      ) {
        dibujo = this.data.polygons.find(
          d => d.dibujoGeometria === item.zonaExclusionGeometria
        );
      }
      if (this.data.action === FormActionType.Add) {
        this.store.dispatch(
          new EntityZonasExclusionAddRequestAction({
            item,
            dibujoId: dibujo.dibujoId
          })
        );
      } else {
        this.store.dispatch(
          new EntityZonasExclusionChangeRequestAction({
            item,
            dibujoId: dibujo.dibujoId
          })
        );
      }
      this.data.zona = item;
      this.dialogRef.close(this.data);
    }
  }
}
