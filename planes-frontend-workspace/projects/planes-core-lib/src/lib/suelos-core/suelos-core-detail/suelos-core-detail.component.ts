import { Component, OnInit, Input } from '@angular/core';

import {
  DetailParams,
  DetailField
} from '../../extras/components/detail.model';
import {
  SuelosCoreDetailParams,
  SUELOSCOREDETAIL_DEFAULT_FIELDS
} from '../suelos-core-detail.model';

@Component({
  selector: 'lib-suelos-core-detail',
  templateUrl: './suelos-core-detail.component.html',
  styleUrls: ['./suelos-core-detail.component.css']
})
export class SuelosCoreDetailComponent implements OnInit {
  _params: SuelosCoreDetailParams = null;
  @Input()
  set params(value: SuelosCoreDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }
    this.fields = value.fields || SUELOSCOREDETAIL_DEFAULT_FIELDS;
    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.suelo[f.name]
    }));
    this.detailParams = {
      rows
    };
  }

  fields: DetailField[] = [];

  detailParams: DetailParams = null;

  constructor() {}

  ngOnInit(): void {}
}
