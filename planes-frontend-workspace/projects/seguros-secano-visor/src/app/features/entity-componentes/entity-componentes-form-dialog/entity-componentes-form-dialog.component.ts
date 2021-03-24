import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { FormActionType, ConfirmDialogData, ConfirmDialogResultType, ConfirmDialogComponent } from 'planes-core-lib'; 

import { ComponenteProductivoSegurosSecano, ComponentesProductivosSegurosSecanoFormInput } from 'seguros-secano-lib';

import { AppState } from '../../../core/core.state';
import { LoggingService } from '../../../core/logging/logging.service';

import {
  EntityComponentesAddRequestAction,
  EntityComponentesChangeRequestAction
} from '../entity-componentes.actions';

const DIALOG_WIDTH = '300px';
const DIALOG_MAX_HEIGHT = '500px';

export interface EntityComponentesFormDialogData extends ComponentesProductivosSegurosSecanoFormInput {  
}

@Component({
  selector: 'lib-entity-componentes-form-dialog',
  templateUrl: './entity-componentes-form-dialog.component.html',
  styleUrls: ['./entity-componentes-form-dialog.component.css']
})  
export class EntityComponentesFormDialogComponent implements OnInit {
  title = 'Crear Componente Productivo';
  submitText = 'Crear';
  sendText = 'Presentar';
  cancelText = 'Cancelar';

  formValid: boolean;
  formValue: ComponenteProductivoSegurosSecano;

  constructor(
    private store: Store<AppState>,
    private logginService: LoggingService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EntityComponentesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityComponentesFormDialogData
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

  formValueChanges(componente: ComponenteProductivoSegurosSecano) {
    this.formValue = componente;
  }

  onCancel() {
    this.dialogRef.close(this.data);
  }

  // Para actualizar el componente 
  onSubmit() {
    let dHoy = new Date(); 
    this.formValue.fechaModificado = dHoy;    
    const item = { ...this.formValue };    
    if (this.data.action === FormActionType.Add) {
      this.store.dispatch(new EntityComponentesAddRequestAction({ item }));
    } else {
      this.store.dispatch(new EntityComponentesChangeRequestAction({ item: [item] }));
    }
    this.data.componente = item;
    this.dialogRef.close(this.data);      
  }

  onSend() {
    if (this.formValid) {
      let dHoy = new Date();      
      this.formValue.fechaEnviado = dHoy;      
      const item = { ...this.formValue };
      this.openConfirmDialog(
        'Confirmar presentación',
        `Una vez que presente los datos completados estos no podrán ser modificados.`,
        new EntityComponentesChangeRequestAction({ item: [item] })
      );      
      this.data.componente = item;
      this.dialogRef.close(this.data);
    }
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
