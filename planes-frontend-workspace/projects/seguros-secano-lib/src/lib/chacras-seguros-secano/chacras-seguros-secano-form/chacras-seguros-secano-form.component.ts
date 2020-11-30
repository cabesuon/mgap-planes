import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import {
  FormActionType,
  compareFormStatus,
  ChacraCore,
  ChacrasCoreFormInput,
  DibujoCore
} from 'planes-core-lib';
import { UnidadManejoSegurosSecano } from '../../unidades-manejos-seguros-secano/unidades-manejos-seguros-secano.model';
import { ChacraSegurosSecano } from '../chacras-seguros-secano.model';

export interface ChacrasSegurosSecanoFormInput {
  action: FormActionType;
  chacra: ChacraSegurosSecano;
  dibujos: DibujoCore[];
  unidades: UnidadManejoSegurosSecano[];
}

@Component({
  selector: 'lib-chacras-seguros-secano-form',
  templateUrl: './chacras-seguros-secano-form.component.html',
  styleUrls: ['./chacras-seguros-secano-form.component.css']
})
export class ChacrasSegurosSecanoFormComponent implements OnInit {
  @Input() formInput: ChacrasSegurosSecanoFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<ChacraSegurosSecano>();

  unidades: UnidadManejoSegurosSecano[] = [];
  form = this.fb.group({
    unidadId: [null]
  });

  coreData: ChacrasCoreFormInput = null;
  coreFormValue: ChacraCore = null;
  coreFormStatus: string = 'INVALID';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.coreData = {
      action: this.formInput.action,
      chacra: { ...this.formInput.chacra },
      dibujos: this.formInput.dibujos
    };
    this.unidades = this.formInput.unidades || [];
    if (this.formInput.action === FormActionType.Update) {
      this.form.patchValue({
        unidadId: this.formInput.chacra.unidadId
      });
    }
    // emit
    this.form.valueChanges.subscribe(_ => this.emitFormValueChanges());
    this.form.statusChanges.subscribe(v => {
      this.emitFormStatusChanges();
    });
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
    const cs = compareFormStatus(this.coreFormStatus, this.form.status);
    this.formStatusChanges.emit(
      cs === -1 ? this.coreFormStatus : this.form.status
    );
  }

  emitFormValueChanges() {
    const value: ChacraSegurosSecano = {
      ...this.formInput.chacra,
      ...this.coreFormValue,
      ...this.form.value
    };
    this.formValueChanges.emit(value);
  }
}
