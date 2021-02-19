import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { FormActionType } from 'planes-core-lib';

import {
  ComponenteSecano,
  ComponentesSecanoFormInput
} from 'planes-secano-lib';

import { AppState } from '../../../core/core.state';

import {
  EntityComponentesAddRequestAction,
  EntityComponentesChangeRequestAction
} from '../entity-componentes.actions';

export interface EntityComponentesFormDialogData
  extends ComponentesSecanoFormInput {}

@Component({
  selector: 'app-entity-componentes-form-dialog',
  templateUrl: './entity-componentes-form-dialog.component.html',
  styleUrls: ['./entity-componentes-form-dialog.component.scss']
})
export class EntityComponentesFormDialogComponent implements OnInit {
  title = 'Agregar Componente';
  submitText = 'Crear';
  cancelText = 'Cancelar';

  formValid: boolean;
  formValue: ComponenteSecano;

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<EntityComponentesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityComponentesFormDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.action === FormActionType.Update) {
      this.title = 'Actualizar Componente';
      this.submitText = 'Actualizar';
    }
  }

  formStatusChanges(status: string) {
    this.formValid = status === 'VALID';
  }

  formValueChanges(componente: ComponenteSecano) {
    this.formValue = componente;
  }

  onCancel() {
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    if (this.formValid) {
      const c = this.data.cultivos.find(
        c => c.cultivoId === this.formValue.cultivoId
      );
      const item: ComponenteSecano = {
        ...this.formValue,
        componenteNombre: c.cultivoNombre
      };
      if (this.data.action === FormActionType.Add) {
        this.store.dispatch(new EntityComponentesAddRequestAction({ item }));
      } else {
        this.store.dispatch(new EntityComponentesChangeRequestAction({ item }));
      }
      this.data.componente = item;
      this.dialogRef.close(this.data);
    }
  }
}
