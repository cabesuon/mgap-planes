import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { FormActionType } from 'planes-core-lib';

import { UnidadManejoSegurosSecano } from 'seguros-secano-lib';

import { AppState } from '../../../core/core.state';
import { LoggingService } from '../../../core/logging/logging.service';

import {
  EntityUnidadesManejosAddRequestAction,
  EntityUnidadesManejosChangeRequestAction
} from '../entity-unidades.actions';

import { DibujoCore } from 'planes-core-lib';

export interface EntityUnidadesFormDialogData {
  unidad: UnidadManejoSegurosSecano;
  action: FormActionType;
}

@Component({
  selector: 'lib-entity-unidades-form-dialog',
  templateUrl: './entity-unidades-form-dialog.component.html',
  styleUrls: ['./entity-unidades-form-dialog.component.css']
})
export class EntityUnidadesFormDialogComponent implements OnInit {
  title = 'Crear Unidad de Manejo';
  submitText = 'Crear';
  cancelText = 'Cancelar';

  formValid: boolean;
  formValue: UnidadManejoSegurosSecano;

  constructor(
    private store: Store<AppState>,
    private logginService: LoggingService,
    public dialogRef: MatDialogRef<EntityUnidadesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityUnidadesFormDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.action === FormActionType.Update) {
      this.title = 'Actualizar Componente Productivo';
      this.submitText = 'Actualizar';
    }
  }

  formStatusChanges(status: string) {
    this.formValid = status === 'VALID';
  }

  formValueChanges(componente: UnidadManejoSegurosSecano) {
    this.formValue = componente;
  }

  onCancel() {
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    if (this.formValid) {
      const item = { ...this.formValue };
      if (this.data.action === FormActionType.Add) {
        this.store.dispatch(
          new EntityUnidadesManejosAddRequestAction({ item })
        );
      } else {
        this.store.dispatch(
          new EntityUnidadesManejosChangeRequestAction({ item })
        );
      }
      this.data.unidad = item;
      this.dialogRef.close(this.data);
    }
  }
}
