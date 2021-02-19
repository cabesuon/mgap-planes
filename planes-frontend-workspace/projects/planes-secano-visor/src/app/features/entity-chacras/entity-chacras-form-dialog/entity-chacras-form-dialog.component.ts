import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { FormActionType, DibujoCore } from 'planes-core-lib';

import { ChacraSecano, ChacrasSecanoFormInput } from 'planes-secano-lib';

import { AppState } from '../../../core/core.state';
import { LoggingService } from '../../../core/logging/logging.service';

import {
  EntityChacrasAddRequestAction,
  EntityChacrasChangeRequestAction
} from '../entity-chacras.actions';

export interface EntityChacrasFormDialogData extends ChacrasSecanoFormInput {}

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
  formValue: ChacraSecano;

  constructor(
    private store: Store<AppState>,
    private logginService: LoggingService,
    public dialogRef: MatDialogRef<EntityChacrasFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityChacrasFormDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.action === FormActionType.Update) {
      this.title = 'Actualizar Chacra';
      this.submitText = 'Actualizar';
    }
  }

  formStatusChanges(status: string) {
    this.formValid = status === 'VALID';
  }

  formValueChanges(chacra: ChacraSecano) {
    this.formValue = chacra;
  }

  onCancel() {
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    if (this.formValid) {
      const item = { ...this.formValue };
      let dibujos: DibujoCore[] = [];
      if (
        item.chacraGeometria &&
        this.data.chacra.chacraGeometria !== item.chacraGeometria
      ) {
        dibujos.push(
          this.data.dibujos.find(
            d => d.dibujoGeometria === item.chacraGeometria
          )
        );
      }
      if (
        item.chacraFactorLSGeometriaAsignado &&
        this.data.chacra.chacraFactorLSGeometriaAsignado !==
          item.chacraFactorLSGeometriaAsignado &&
        this.data.chacra.chacraFactorLSGeometriaLimitante !==
          item.chacraFactorLSGeometriaAsignado
      ) {
        dibujos.push(
          this.data.dibujos.find(
            d => d.dibujoGeometria === item.chacraFactorLSGeometriaAsignado
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
