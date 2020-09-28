import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { PlanCore, FormActionType } from 'planes-core-lib';

import { AppState } from '../../../core/core.state';

import {
  EntityPlanesAddRequestAction,
  EntityPlanesChangeRequestAction
} from '../entity-planes.actions';
import { PlanesCoreFormInput } from 'planes-core-lib';

export interface EntityPlanesFormDialogData extends PlanesCoreFormInput {
  ingenieroAgronomoId: string;
}

@Component({
  selector: 'app-entity-planes-form-dialog',
  templateUrl: './entity-planes-form-dialog.component.html',
  styleUrls: ['./entity-planes-form-dialog.component.css']
})
export class EntityPlanesFormDialogComponent implements OnInit {
  title = 'Crear Plan';
  submitText = 'Crear';
  cancelText = 'Cancelar';

  formValid: boolean;
  formValue: PlanCore;

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<EntityPlanesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityPlanesFormDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.action === FormActionType.Update) {
      this.title = 'Actualizar Plan';
      this.submitText = 'Actualizar';
    }
  }

  formStatusChanges(status: string) {
    this.formValid = status === 'VALID';
  }

  formValueChanges(plan: PlanCore) {
    this.formValue = plan;
  }

  onCancel() {
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    if (this.formValid) {
      const item = { ...this.formValue };
      item.ingenieroAgronomoId = this.data.ingenieroAgronomoId;
      if (this.data.action === FormActionType.Add) {
        this.store.dispatch(new EntityPlanesAddRequestAction({ item }));
      } else {
        this.store.dispatch(new EntityPlanesChangeRequestAction({ item }));
      }
      this.data.plan = item;
      this.dialogRef.close(this.data);
    }
  }
}
