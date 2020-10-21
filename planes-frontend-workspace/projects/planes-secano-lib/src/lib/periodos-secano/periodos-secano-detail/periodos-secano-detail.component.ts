import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';

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

    this.fields = value.fields || PERIODOSSECANODETAIL_DEFAULT_FIELDS;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.periodo[f.name]
    }));
    this.detailParams = {
      rows
    };
  }

  fields: DetailField[] = null;
  detailParams: DetailParams = null;

  constructor() {}

  ngOnInit(): void {}
}
