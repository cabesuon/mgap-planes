import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { PlanSecano } from '../../planes-secano/planes-secano.model';
import { RotacionSecano } from '../../rotaciones-secano/rotaciones-secano.model';

import { FormActionType } from 'planes-core-lib';

export interface PlanesCoreFormInput {
  action: FormActionType;
  rotacion: RotacionSecano;
  plan: PlanSecano;
}

@Component({
  selector: 'lib-rotaciones-secano-form',
  templateUrl: './rotaciones-secano-form.component.html',
  styleUrls: ['./rotaciones-secano-form.component.css']
})
export class RotacionesSecanoFormComponent implements OnInit {
  @Input() formInput: PlanesCoreFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<RotacionSecano>();

  form = this.fb.group({
    rotacionNombre: [null, [Validators.required]],
    rotacionAnio: [null, [Validators.required]],
    rotacionEsSiembraDirecta: [null]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.formInput.action === FormActionType.Update) {
      this.form.patchValue({
        rotacionNombre: this.formInput.rotacion.rotacionNombre,
        rotacionAnio: this.formInput.rotacion.rotacionAnio,
        rotacionEsSiembraDirecta: this.formInput.rotacion
          .rotacionEsSiembraDirecta
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
