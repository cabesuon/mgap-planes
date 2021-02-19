import { Component, OnInit, Input } from '@angular/core';
import { DetailField } from 'planes-core-lib';

import { PeriodoSecano } from '../periodos-secano.model';
import {
  PERIODOSSECANODETAIL_DEFAULT_FIELDS,
  PeriodosSecanoDetailParams
} from '../periodos-secano-detail.model';

@Component({
  selector: 'lib-periodos-secano-detail',
  templateUrl: './periodos-secano-detail.component.html',
  styleUrls: ['./periodos-secano-detail.component.css']
})
export class PeriodosSecanoDetailComponent implements OnInit {
  _params: PeriodosSecanoDetailParams = null;
  @Input()
  set params(value: PeriodosSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.periodos = value.periodos || [];
    this.fields = value.fields || PERIODOSSECANODETAIL_DEFAULT_FIELDS;
  }

  periodos: PeriodoSecano[] = [];
  fields: DetailField[] = null;
  rows: string[][] = [];

  constructor() {}

  ngOnInit(): void {}
}
