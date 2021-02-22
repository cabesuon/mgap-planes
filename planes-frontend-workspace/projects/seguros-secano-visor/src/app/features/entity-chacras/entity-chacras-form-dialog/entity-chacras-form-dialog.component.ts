import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { FormActionType } from 'planes-core-lib';

import { AppState } from '../../../core/core.state';
import { LoggingService } from '../../../core/logging/logging.service';

import {
  ChacraSegurosSecano,
  ChacrasSegurosSecanoFormInput,  
  createEmptyComponenteProductivoSegurosSecano
} from 'seguros-secano-lib';

import {
  EntityChacrasAddRequestAction,
  EntityChacrasChangeRequestAction
} from '../entity-chacras.actions';
import { DibujoCore } from 'projects/planes-core-lib/src/public-api';

export interface EntityChacrasFormDialogData
  extends ChacrasSegurosSecanoFormInput {}

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
      const item = {
        ...this.formValue
      };
      let dibujos: DibujoCore[] = [];
      if (this.formValue.chacraGeometria) {
        dibujos.push(
          this.data.dibujos.find(
            d => d.dibujoGeometria === this.formValue.chacraGeometria
          )
        );
      }
      /*if (this.formValue.chacraFactorLSGeometriaAsignado) {
        dibujos.push(
          this.data.dibujos.find(
            d =>
              d.dibujoGeometria ===
              this.formValue.chacraFactorLSGeometriaAsignado
          )
        );
      }*/
      
      const unidad = this.data.unidades.find(unidad => unidad.unidadId === item.unidadId);      
      let componente = {
        ...createEmptyComponenteProductivoSegurosSecano(),
        ...unidad,
        // hardcodeado la zafra y el año. obtenerla luego de una db
        zafra: "Verano",
        anio: 2020
      };      
      /* crear un compoennte poniendole los campos de uniad de manejo */
      const dibujosId: number[] = dibujos.map(d => d.dibujoId);
      if (this.data.action === FormActionType.Add) {
        this.store.dispatch(
          new EntityChacrasAddRequestAction({ item, dibujosId, componente })
        );
      } else {
        this.store.dispatch(
          new EntityChacrasChangeRequestAction({ item, dibujosId, componente })
        );
      }
      this.data.chacra = item;
      this.dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
      );
      this.dialogRef.close(this.data);
            
    }
  }
}
