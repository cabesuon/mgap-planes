import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { PadronCore, DepartamentoCore } from '../padrones-core.model';
import { PadronesCoreFormInput } from '../padrones-core-form.model';

@Component({
  selector: 'lib-padrones-core-form',
  templateUrl: './padrones-core-form.component.html',
  styleUrls: ['./padrones-core-form.component.css']
})
export class PadronesCoreFormComponent implements OnInit {
  @Input() formInput: PadronesCoreFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<PadronCore>();

  form = this.fb.group({
    padronId: [null, [Validators.required]],
    departamento: [null, [Validators.required]]
  });

  departamentos: DepartamentoCore[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // emit
    this.form.valueChanges.subscribe(_ => {
      const value: PadronCore = {
        padronId: this.form.value.padronId,
        departamentoId: this.form.value.departamento.id,
        departamentoNombre: this.form.value.departamento.nombre,
        padronFueSeleccionado: true
      };
      this.formValueChanges.emit(value);
    });
    this.form.statusChanges.subscribe(v => this.formStatusChanges.emit(v));
  }
}
