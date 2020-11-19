import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { FormActionType, PlanesCoreFormInput } from 'planes-core-lib';
import { CultivoSegurosSecano } from '../../cultivos-seguros-secano/cultivos-seguros-secano.model';
import { CicloSegurosSecano } from '../../ciclos-seguros-secano/ciclos-seguros-secano.model';

import { ComponenteProductivoSegurosSecano } from '../componentes-productivos-seguros-secano.model';

export interface ComponentesProductivosSegurosSecanoFormInput {
  action: FormActionType;
  componente: ComponenteProductivoSegurosSecano;
  cultivos: CultivoSegurosSecano;
  ciclos: CicloSegurosSecano;
}

@Component({
  selector: 'lib-componentes-productivos-seguros-secano-form',
  templateUrl: './componentes-productivos-seguros-secano-form.component.html',
  styleUrls: ['./componentes-productivos-seguros-secano-form.component.css']
})
export class ComponentesProductivosSegurosSecanoFormComponent
  implements OnInit {
  @Input() formInput: ComponentesProductivosSegurosSecanoFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<
    ComponenteProductivoSegurosSecano
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
