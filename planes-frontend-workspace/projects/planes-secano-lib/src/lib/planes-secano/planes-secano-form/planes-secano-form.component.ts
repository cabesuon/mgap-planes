import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import {
  FormActionType,
  EmpresaCore,
  PlanesCoreFormInput
} from 'planes-core-lib';
import { PlanSecano } from '../planes-secano.model';
import { ResponsableSecano } from '../../responsables-secano/responsables-secano.model';

export interface PlanesSecanoFormInput {
  action: FormActionType;
  plan: PlanSecano;
  empresas: EmpresaCore[];
  propietariosResponsables: ResponsableSecano[];
  tctResponsables: ResponsableSecano[];
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

  form = this.fb.group({
    planNombre: [null, [Validators.required]],

    propietarios: [null, [Validators.required]],
    arrendatarios: [null],

    propietarioResponsable: [null, [Validators.required]],
    tctResponsable: [null]
  });

  planesCoreFormInput: PlanesCoreFormInput = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.formInput.action === FormActionType.Update) {
      this.form.patchValue({
        planNombre: this.formInput.plan.planNombre,
        propietarios: this.formInput.plan.propietarios,
        arrendatarios: this.formInput.plan.arrendatarios,
        propietarioResponsable: this.formInput.plan.propietarioResponsableId,
        tctResponsable: this.formInput.plan.tctResponsableId
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
