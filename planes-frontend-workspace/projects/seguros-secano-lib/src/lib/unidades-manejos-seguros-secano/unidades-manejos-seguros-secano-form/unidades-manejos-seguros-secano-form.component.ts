import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { FormActionType, PlanesCoreFormInput } from 'planes-core-lib';
import { CultivoSegurosSecano } from '../../cultivos-seguros-secano/cultivos-seguros-secano.model';
import { CicloSegurosSecano } from '../../ciclos-seguros-secano/ciclos-seguros-secano.model';

import {
  UnidadManejoSegurosSecano
} from '../unidades-manejos-seguros-secano.model';

export interface UnidadesManejosSegurosSecanoFormInput {
  action: FormActionType;
  componente: UnidadManejoSegurosSecano;
  cultivos: CultivoSegurosSecano;
  ciclos: CicloSegurosSecano;
}

@Component({
  selector: 'lib-unidades-manejos-seguros-secano-form',
  templateUrl: './unidades-manejos-seguros-secano-form.component.html',
  styleUrls: ['./unidades-manejos-seguros-secano-form.component.css']
})
export class UnidadesManejosSegurosSecanoFormComponent
  implements OnInit {
  @Input() formInput: UnidadesManejosSegurosSecanoFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<
  UnidadManejoSegurosSecano
  >();

  form = this.fb.group({
    cultivoId: [null, [Validators.required]],
    cicloId: [null, [Validators.required]],

    cultivoAntecesorId: [null],

    aseguradoraId: [null],
    polizaId: [null],

    superficieSembrada: [null],
    superficieCocechada: [null],
    fechaSiembra: [null],
    fechaCocecha: [null],
    fertilizacionP2O5: [null],
    fertilizacionK2O: [null],
    fertilizacionN: [null],
    fertilizacionS: [null],
    analisisSueloPBray: [null],
    analisisSueloK: [null],
    rendimiento: [null],

    zafra: [null],
    anio: [null]
  });

  planesCoreFormInput: PlanesCoreFormInput = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.formInput.action === FormActionType.Update) {
      // pegar valores
    }
    this.form.valueChanges.subscribe(_ =>
      this.formValueChanges.emit({
        ...this.formInput.componente,
        ...this.form.value
      })
    );
    this.form.statusChanges.subscribe(v => this.formStatusChanges.emit(v));
  }
}
