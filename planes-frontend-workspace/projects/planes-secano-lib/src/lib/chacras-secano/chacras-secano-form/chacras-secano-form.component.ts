import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { FormActionType, ChacraCore, compareFormStatus } from 'planes-core-lib';

import { ChacrasSecanoFormInput } from '../chacras-secano-form.model';
import {
  ChacraSecano,
  MecanicaDeApoyo,
  MECANICAS
} from '../chacras-secano.model';
@Component({
  selector: 'lib-chacras-secano-form',
  templateUrl: './chacras-secano-form.component.html',
  styleUrls: ['./chacras-secano-form.component.css']
})
export class ChacrasSecanoFormComponent implements OnInit {
  @Input() formInput: ChacrasSecanoFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<ChacraSecano>();

  isUpdate: boolean = false;

  coreFormStatus: string = null;
  coreFormValue: ChacraCore = null;

  form = this.fb.group({
    aplicaPractica: [false],
    mecanicaDeApoyoId: [null],
    chacraMecanicaApoyoCobertura: [null]
  });

  setFormLogic() {
    const mecanicaDeApoyoId = this.form.get('mecanicaDeApoyoId');
    const chacraMecanicaApoyoCobertura = this.form.get(
      'chacraMecanicaApoyoCobertura'
    );
    this.form.get('aplicaPractica').valueChanges.subscribe(v => {
      if (!v) {
        mecanicaDeApoyoId.disable();
        mecanicaDeApoyoId.setValidators(null);
        chacraMecanicaApoyoCobertura.disable();
        chacraMecanicaApoyoCobertura.setValidators(null);
      } else {
        mecanicaDeApoyoId.enable();
        mecanicaDeApoyoId.setValidators([Validators.required]);
        chacraMecanicaApoyoCobertura.enable();
        chacraMecanicaApoyoCobertura.setValidators([Validators.required]);
      }
    });
    if (!this.form.value.aplicaPractica) {
      mecanicaDeApoyoId.disable();
      mecanicaDeApoyoId.setValidators(null);
      chacraMecanicaApoyoCobertura.disable();
      chacraMecanicaApoyoCobertura.setValidators(null);
    } else {
      mecanicaDeApoyoId.enable();
      mecanicaDeApoyoId.setValidators([Validators.required]);
      chacraMecanicaApoyoCobertura.enable();
      chacraMecanicaApoyoCobertura.setValidators([Validators.required]);
    }
  }

  mecanicas: MecanicaDeApoyo[] = MECANICAS;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isUpdate = this.formInput.action === FormActionType.Update;
    if (this.isUpdate) {
      this.form.patchValue({
        aplicaPractica: this.formInput.chacra.mecanicaDeApoyoId > 0,
        mecanicaDeApoyoId: this.formInput.chacra.mecanicaDeApoyoId,
        chacraMecanicaApoyoCobertura: this.formInput.chacra
          .chacraMecanicaApoyoCobertura
      });
    }
    this.setFormLogic();
    // emit
    this.form.valueChanges.subscribe(_ => this.emitFormValueChanges());
    this.form.statusChanges.subscribe(_ => this.emitFormStatusChanges());
  }

  coreFormStatusChanges(status: string) {
    this.coreFormStatus = status;
    this.emitFormStatusChanges();
  }

  coreFormValueChanges(chacra: ChacraCore) {
    this.coreFormValue = chacra;
    this.emitFormValueChanges();
  }

  emitFormStatusChanges() {
    let c = compareFormStatus(this.coreFormStatus, this.form.status);
    this.formStatusChanges.emit(
      c <= 0 ? this.coreFormStatus : this.form.status
    );
  }

  emitFormValueChanges() {
    this.formValueChanges.emit({
      ...this.coreFormValue,
      ...this.form.value
    });
  }
}
