import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { FormActionType, EmpresaCore } from 'planes-core-lib';

import { PlanSecano } from 'planes-secano-lib';

import { AppState } from '../../../core/core.state';

import { getEmpresaResponsableContacto } from '../../entity-empresas/entity-empresas.state';

import {
  EntityPlanesAddRequestAction,
  EntityPlanesChangeRequestAction
} from '../entity-planes.actions';

export interface EntityPlanesFormDialogData {
  plan: PlanSecano;
  action: FormActionType;
  empresas: EmpresaCore[];
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
  formValue: PlanSecano;

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

  formValueChanges(plan: PlanSecano) {
    this.formValue = plan;
  }

  onCancel() {
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    if (this.formValid) {
      const item = { ...this.formValue };
      const propietarioResponsable = getEmpresaResponsableContacto(
        this.data.empresas.find(e => e.empresaId === item.propietarioId)
      );
      if (propietarioResponsable) {
        item.propietarioResponsableId = propietarioResponsable.personaId;
      }
      if (item.tenedorCualquierTituloId) {
        const arrendatarioResponsable = getEmpresaResponsableContacto(
          this.data.empresas.find(
            e => e.empresaId === item.tenedorCualquierTituloId
          )
        );
        if (arrendatarioResponsable) {
          item.tctResponsableId = arrendatarioResponsable.personaId;
        }
      }

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
