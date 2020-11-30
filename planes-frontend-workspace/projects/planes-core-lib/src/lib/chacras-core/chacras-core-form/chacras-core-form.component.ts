import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { FormActionType } from '../../extras/extras-form';
import {
  DibujoCore,
  DibujoCoreType
} from '../../dibujos-core/dibujos-core.model';

import { ChacraCore } from '../chacras-core.model';
import { ChacrasCoreFormInput } from '../chacras-core-form.model';
@Component({
  selector: 'lib-chacras-core-form',
  templateUrl: './chacras-core-form.component.html',
  styleUrls: ['./chacras-core-form.component.css']
})
export class ChacrasCoreFormComponent implements OnInit {
  @Input() formInput: ChacrasCoreFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<ChacraCore>();

  _polygons: DibujoCore[];
  _polylines: DibujoCore[];

  form = this.fb.group({
    chacraNombre: [null, [Validators.required]],
    chacraGeometria: [null, [Validators.required]],
    chacraFactorLSGeometriaAsignado: [null, []],
    chacraSueloLimitanteId: [null, [Validators.required]],
    chacraDicose: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.formInput.action === FormActionType.Update) {
      this.form.patchValue({
        chacraNombre: this.formInput.chacra.chacraNombre,
        chacraGeometria: this.formInput.chacra.chacraGeometria,
        chacraSueloLimitanteId: this.formInput.chacra.chacraSueloLimitanteId,
        chacraDicose: this.formInput.chacra.chacraDicose
      });
    }
    // split dibujos
    this._polygons = this.formInput.dibujos.filter(
      d => d.dibujoTipo === DibujoCoreType.POLYGON
    );
    this._polylines = this.formInput.dibujos.filter(
      d => d.dibujoTipo === DibujoCoreType.POLYLINE
    );
    // emit
    this.form.valueChanges.subscribe(_ => {
      const value: ChacraCore = {
        ...this.formInput.chacra,
        ...this.form.value
      };
      value.chacraFactorLSGeometriaLimitante =
        value.chacraFactorLSGeometriaLimitante === 'Calculada' && null;
      value.chacraFactorLSEsManual = !value.chacraFactorLSGeometriaLimitante;
      this.formValueChanges.emit(value);
    });
    this.form.statusChanges.subscribe(v => this.formStatusChanges.emit(v));
  }
}
