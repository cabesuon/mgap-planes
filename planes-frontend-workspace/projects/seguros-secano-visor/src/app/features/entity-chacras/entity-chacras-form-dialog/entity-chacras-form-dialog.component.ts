import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { FormActionType } from 'planes-core-lib';

import { AppState } from '../../../core/core.state';
import { LoggingService } from '../../../core/logging/logging.service';

import {
  ChacraSegurosSecano,
  ChacrasSegurosSecanoFormInput,  
  createEmptyComponenteProductivoSegurosSecano,
  ComponenteProductivoSegurosSecano
} from 'seguros-secano-lib';

import {
  EntityChacrasAddRequestAction,
  EntityChacrasChangeRequestAction
} from '../entity-chacras.actions';
import { DibujoCore } from 'projects/planes-core-lib/src/public-api';

export interface EntityChacrasFormDialogData
  extends ChacrasSegurosSecanoFormInput {
    componentes: ComponenteProductivoSegurosSecano[];
  }

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

  componente: ComponenteProductivoSegurosSecano;

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
      this.componente = this.data.componentes.find(c => c.chacraId == this.data.chacra.chacraId);      
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
      /* crear un compoennte poniendole los campos de uniad de manejo */
      let dibujosId: number[];
      if (dibujos.length == 0 || dibujos[0] == undefined){
        dibujosId = null;
      } else {
        dibujosId = dibujos.map(d => d.dibujoId);      
      }

      const unidad = this.data.unidades.find(unidad => unidad.unidadId === item.unidadId);
      if (this.data.action === FormActionType.Add) {              
        let componente = {
          ...createEmptyComponenteProductivoSegurosSecano(),
          ...unidad,
          // hardcodeado la zafra y el año. obtenerla luego de una db
          zafra: 1,
          anio: 2020
        };     
        this.store.dispatch(
          new EntityChacrasAddRequestAction({ item, dibujosId, componente })
        );
      } else {
        const componenteChacra: ComponenteProductivoSegurosSecano = {           
          ...this.componente,
          ...unidad
        };        
        this.store.dispatch(
          new EntityChacrasChangeRequestAction({ item, dibujosId, componente: componenteChacra })
        );
      }
      this.data.chacra = item;
      this.dialogRef.afterClosed().subscribe(        
      );
      this.dialogRef.close(this.data);
            
    }
  }
}
