import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { FormActionType } from '../../extras/extras-form';
import { PlanCore } from '../planes-core.model';

export interface PlanesCoreFormInput {
  action: FormActionType;
  plan: PlanCore;
}

@Component({
  selector: 'lib-planes-core-form',
  templateUrl: './planes-core-form.component.html',
  styleUrls: ['./planes-core-form.component.css']
})
export class PlanesCoreFormComponent implements OnInit {
  @Input() formInput: PlanesCoreFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<PlanCore>();

  form = this.fb.group({
    planNombre: [null, [Validators.required]],

    propietarioId: [null, [Validators.required]],
    propietarioResponsableId: [null, [Validators.required]],
    tenedorCualquierTituloId: [null],
    tctResponsableId: [null],

    departamentoId: [null],
    regionalId: [null],
    planRubro: [null]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.formInput.action === FormActionType.Update) {
      this.form.patchValue({
        planNombre: this.formInput.plan.planNombre,
        propietarioId: this.formInput.plan.propietarioId,
        propietarioResponsableId: this.formInput.plan.propietarioResponsableId,
        tenedorCualquierTituloId: this.formInput.plan.tenedorCualquierTituloId,
        tctResponsableId: this.formInput.plan.tctResponsableId,
        departamentoId: this.formInput.plan.departamentoId,
        regionalId: this.formInput.plan.regionalId,
        planRubro: this.formInput.plan.planRubro
      });
    }
    this.form.valueChanges.subscribe(_ =>
      this.formValueChanges.emit({
        ...this.formInput.plan,
        ...this.form.value
      })
    );
    this.form.statusChanges.subscribe(v => this.formStatusChanges.emit(v));
  }
}
