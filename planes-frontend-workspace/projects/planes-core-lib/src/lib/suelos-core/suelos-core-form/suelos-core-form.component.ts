import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import {
  SuelosCoreFormInput,
  SuelosCoreFormOutput
} from '../suelos-core-form.model';

@Component({
  selector: 'lib-suelos-core-form',
  templateUrl: './suelos-core-form.component.html',
  styleUrls: ['./suelos-core-form.component.css']
})
export class SuelosCoreFormComponent implements OnInit {
  @Input() formInput: SuelosCoreFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<SuelosCoreFormOutput>();

  form = this.fb.group({
    suelo: [null, [Validators.required]],
    files: [null, [Validators.required]]
  });

  departamentos: { value: string; text: string }[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // emit
    this.form.valueChanges.subscribe(_ => {
      const value: SuelosCoreFormOutput = {
        ...this.form.value
      };
      this.formValueChanges.emit(value);
    });
    this.form.statusChanges.subscribe(v => this.formStatusChanges.emit(v));
  }

  // file

  importFiles(event: any) {
    const filename = event.target.value.toLowerCase();
    if (filename.indexOf('.pdf') === -1) {
      return;
    }
    this.form.patchValue({ files: event.target.files });
  }
}
