import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { FormActionType } from 'planes-core-lib';

import { RotacionSecano } from 'planes-secano-lib';

import { AppState } from '../../../core/core.state';

import {
  EntityRotacionesAddRequestAction,
  EntityRotacionesChangeRequestAction
} from '../entity-rotaciones.actions';

export interface EntityRotacionesFormDialogData {
  rotacion: RotacionSecano;
  action: FormActionType;
}

@Component({
  selector: 'app-entity-rotaciones-form-dialog',
  templateUrl: './entity-rotaciones-form-dialog.component.html',
  styleUrls: ['./entity-rotaciones-form-dialog.component.scss']
})
export class EntityRotacionesFormDialogComponent implements OnInit {
  title = 'Crear Rotación';
  submitText = 'Crear';
  cancelText = 'Cancelar';

  formValid: boolean;
  formValue: RotacionSecano;

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<EntityRotacionesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityRotacionesFormDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.action === FormActionType.Update) {
      this.title = 'Actualizar Rotación';
      this.submitText = 'Actualizar';
    }
  }

  formStatusChanges(status: string) {
    this.formValid = status === 'VALID';
  }

  formValueChanges(rotacion: RotacionSecano) {
    this.formValue = rotacion;
  }

  onCancel() {
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    if (this.formValid) {
      const item = { ...this.formValue };
      if (this.data.action === FormActionType.Add) {
        this.store.dispatch(new EntityRotacionesAddRequestAction({ item }));
      } else {
        this.store.dispatch(new EntityRotacionesChangeRequestAction({ item }));
      }
      this.data.rotacion = item;
      this.dialogRef.close(this.data);
    }
  }
}
