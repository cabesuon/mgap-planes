import { Component, OnInit, Input } from '@angular/core';

import {
  DetailField,
  DetailParams
} from '../../extras/components/detail.model';

import { formatValue } from '../../extras/extras-format';
import {
  PlanesCoreDetailParams,
  PLANESCOREDETAIL_DEFAULT_FIELDS
} from '../planes-core-detail.model';

@Component({
  selector: 'lib-planes-core-detail',
  templateUrl: './planes-core-detail.component.html',
  styleUrls: ['./planes-core-detail.component.css']
})
export class PlanesCoreDetailComponent implements OnInit {
  _params: PlanesCoreDetailParams = null;
  @Input()
  set params(value: PlanesCoreDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields = value.fields || PLANESCOREDETAIL_DEFAULT_FIELDS;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: formatValue(value.plan[f.name], f.format)
    }));
    this.planDetailParams = {
      rows
    };
  }

  fields: DetailField[] = [];

  planDetailParams: DetailParams = null;

  constructor() {}

  ngOnInit(): void {}
}
