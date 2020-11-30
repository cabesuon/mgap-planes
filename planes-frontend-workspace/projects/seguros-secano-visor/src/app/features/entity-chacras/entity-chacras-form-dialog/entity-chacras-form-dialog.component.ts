import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import {  
  FormActionType,
  ChacrasCoreFormInput
} from 'planes-core-lib';

import { ChacraSegurosSecano } from 'seguros-secano-lib';

import { AppState } from '../../../core/core.state';
import { LoggingService } from '../../../core/logging/logging.service';

import {
  EntityChacrasAddRequestAction,
  EntityChacrasChangeRequestAction
} from '../entity-chacras.actions';
import { DibujoCore } from 'projects/planes-core-lib/src/public-api';

export interface EntityChacrasFormDialogData extends ChacrasCoreFormInput {}

@Component({
  selector: 'lib-entity-chacras-form-dialog',
  templateUrl: './entity-chacras-form-dialog.component.html',
  styleUrls: ['./entity-chacras-form-dialog.component.css']
})
export class EntityChacrasFormDialogComponent implements OnInit {
  title = 'Crear Chacra';
  submitText = 'Crear';
  cancelText = 'Cancelar';

  formValid: boolean;
  formValue: ChacraSegurosSecano;

  constructor(
    private store: Store<AppState>,
    private logginService: LoggingService,
    public dialogRef: MatDialogRef<EntityChacrasFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityChacrasFormDialogData
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

  formValueChanges(chacra: ChacraSegurosSecano) {
    this.formValue = chacra;
  }

  onCancel() {
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    if (this.formValid) {
      const item = { ...this.formValue };
      let dibujos: DibujoCore[] = [];
      if (this.formValue.chacraGeometria) {
        dibujos.push(
          this.data.dibujos.find(
            d => d.dibujoGeometria === this.formValue.chacraGeometria
          )
        );
      }
      if (this.formValue.chacraFactorLSGeometriaAsignado) {
        dibujos.push(
          this.data.dibujos.find(
            d =>
              d.dibujoGeometria ===
              this.formValue.chacraFactorLSGeometriaAsignado
          )
        );
      }
      const dibujosId: number[] = dibujos.map(d => d.dibujoId);
      if (this.data.action === FormActionType.Add) {
        this.store.dispatch(
          new EntityChacrasAddRequestAction({ item, dibujosId })
        );
      } else {
        this.store.dispatch(
          new EntityChacrasChangeRequestAction({ item, dibujosId })
        );
      }
      this.data.chacra = item;
      this.dialogRef.close(this.data);
    }
  }
}
