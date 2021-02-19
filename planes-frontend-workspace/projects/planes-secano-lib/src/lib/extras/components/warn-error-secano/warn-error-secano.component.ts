import { Component, OnInit, Input } from '@angular/core';

import { WarnError } from '../../warn-error.model';

export interface WarnErrorSecanoParams {
  errors: WarnError[];
  warnings: WarnError[];
}

@Component({
  selector: 'lib-warn-error-secano',
  templateUrl: './warn-error-secano.component.html',
  styleUrls: ['./warn-error-secano.component.css']
})
export class WarnErrorSecanoComponent implements OnInit {
  @Input() params: WarnErrorSecanoParams = null;
  warnings: WarnError[] = [];
  errors: WarnError[] = [];

  constructor() {}

  ngOnInit(): void {
    this.warnings = this.params.warnings || [];
    this.errors = this.params.errors || [];
  }
}
