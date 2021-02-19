import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import {
  FormActionType,
  EmpresaCore,
  dateFromStringServerFormat,
  dateToStringServerFormat
} from 'planes-core-lib';
import { PlanSecano, PlanSecanoTipoTenencia } from '../planes-secano.model';

export interface PlanesSecanoFormInput {
  action: FormActionType;
  plan: PlanSecano;
  empresas: EmpresaCore[];
}

@Component({
  selector: 'lib-planes-secano-form',
  templateUrl: './planes-secano-form.component.html',
  styleUrls: ['./planes-secano-form.component.css']
})
export class PlanesSecanoFormComponent implements OnInit {
  @Input() formInput: PlanesSecanoFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<PlanSecano>();

  tiposTenencia: string[] = [];

  form = this.fb.group({
    planNombre: [null, [Validators.required]],

    propietarioId: [null, [Validators.required]],

    planTieneTenedor: [false, [Validators.required]],
    tenedorCualquierTituloId: [null, [Validators.required]],
    planVencimientoContractual: [null, [Validators.required]],
    planTipoTenencia: [null, [Validators.required]]
  });

  setTenedorFormLogic() {
    const planTieneTenedor = this.form.get('planTieneTenedor');
    const tenedorCualquierTituloId = this.form.get('tenedorCualquierTituloId');
    const planVencimientoContractual = this.form.get(
      'planVencimientoContractual'
    );
    const planTipoTenencia = this.form.get('planTipoTenencia');

    if (!planTieneTenedor.value) {
      tenedorCualquierTituloId.disable();
      planVencimientoContractual.disable();
      planTipoTenencia.disable();
    } else {
      tenedorCualquierTituloId.enable();
      planVencimientoContractual.enable();
      planTipoTenencia.enable();
    }
    this.form.get('planTieneTenedor').valueChanges.subscribe(v => {
      if (!v) {
        tenedorCualquierTituloId.disable();
        tenedorCualquierTituloId.setValidators(null);
        planVencimientoContractual.disable();
        planVencimientoContractual.setValidators(null);
        planTipoTenencia.disable();
        planTipoTenencia.setValidators(null);
      } else {
        tenedorCualquierTituloId.enable();
        tenedorCualquierTituloId.setValidators([Validators.required]);
        planVencimientoContractual.enable();
        planVencimientoContractual.setValidators([Validators.required]);
        planTipoTenencia.enable();
        planTipoTenencia.setValidators([Validators.required]);
      }
    });
  }

  constructor(private fb: FormBuilder) {
    for (const tt in PlanSecanoTipoTenencia) {
      this.tiposTenencia.push(PlanSecanoTipoTenencia[tt]);
    }
  }

  ngOnInit(): void {
    if (this.formInput.action === FormActionType.Update) {
      this.form.patchValue({
        planNombre: this.formInput.plan.planNombre,
        propietarioId: this.formInput.plan.propietarioId,
        planTieneTenedor: this.formInput.plan.planTieneTenedor,
        tenedorCualquierTituloId: this.formInput.plan.tenedorCualquierTituloId,
        planVencimientoContractual: dateFromStringServerFormat(
          this.formInput.plan.planVencimientoContractual
        ),
        planTipoTenencia: this.formInput.plan.planTipoTenencia
      });
    }
    this.form.valueChanges.subscribe(_ =>
      this.formValueChanges.emit({
        ...this.formInput.plan,
        planNombre: this.form.value.planNombre,
        propietarioId: this.form.value.propietarioId,
        planTieneTenedor: this.form.value.planTieneTenedor,
        tenedorCualquierTituloId: this.form.value.tenedorCualquierTituloId,
        planVencimientoContractual: dateToStringServerFormat(
          this.form.value.planVencimientoContractual
        ),
        planTipoTenencia: this.form.value.planTipoTenencia
      })
    );
    this.setTenedorFormLogic();
    this.form.statusChanges.subscribe(v => this.formStatusChanges.emit(v));
  }
}
