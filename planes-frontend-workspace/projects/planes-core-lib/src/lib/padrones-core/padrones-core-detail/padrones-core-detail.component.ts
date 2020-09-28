import { Component, OnInit, Input } from '@angular/core';

import {
  DetailParams,
  DetailField
} from '../../extras/components/detail.model';
import {
  PadronesCoreDetailParams,
  PADRONESCOREDETAIL_DEFAULT_FIELDS
} from '../padrones-core-detail.model';

@Component({
  selector: 'lib-padrones-core-detail',
  templateUrl: './padrones-core-detail.component.html',
  styleUrls: ['./padrones-core-detail.component.css']
})
export class PadronesCoreDetailComponent implements OnInit {
  _params: PadronesCoreDetailParams = null;
  @Input()
  set params(value: PadronesCoreDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }
    this.fields = value.fields || PADRONESCOREDETAIL_DEFAULT_FIELDS;
    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.padron[f.name]
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
