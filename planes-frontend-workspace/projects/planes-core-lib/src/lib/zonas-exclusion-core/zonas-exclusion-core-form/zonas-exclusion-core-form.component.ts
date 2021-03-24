import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { FormActionType } from '../../extras/extras-form';
import { DibujoCore } from '../../dibujos-core/dibujos-core.model';

import { ZonaExclusionCore } from '../zonas-exclusion-core.model';
import { ZonasExclusionCoreFormInput } from '../zonas-exclusion-core-form.model';

@Component({
  selector: 'lib-zonas-exclusion-core-form',
  templateUrl: './zonas-exclusion-core-form.component.html',
  styleUrls: ['./zonas-exclusion-core-form.component.css']
})
export class ZonasExclusionCoreFormComponent implements OnInit {
  @Input() formInput: ZonasExclusionCoreFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<ZonaExclusionCore>();

  _polygons: DibujoCore[];

  form = this.fb.group({
    zonaExclusionGeometria: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.formInput.action === FormActionType.Update) {
      this.form.patchValue({
        zonaExclusionGeometria: this.formInput.zona.zonaExclusionGeometria
      });
    }
    this.form.valueChanges.subscribe(_ =>
      this.formValueChanges.emit({
        ...this.formInput.zona,
        ...this.form.value
      })
    );
    this.form.statusChanges.subscribe(v => this.formStatusChanges.emit(v));
  }
}
