import { Component, OnInit, Input } from '@angular/core';

import {
  DetailField,
  DetailParams
} from '../../extras/components/detail.model';

import {
  ChacrasCoreDetailParams,
  CHACRASCOREDETAIL_DEFAULT_FIELDS
} from '../chacras-core-detail.model';

@Component({
  selector: 'lib-chacras-core-detail',
  templateUrl: './chacras-core-detail.component.html',
  styleUrls: ['./chacras-core-detail.component.css']
})
export class ChacrasCoreDetailComponent implements OnInit {
  _params: ChacrasCoreDetailParams = null;
  @Input()
  set params(value: ChacrasCoreDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }
    this.fields = value.fields || CHACRASCOREDETAIL_DEFAULT_FIELDS;
    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.chacra[f.name]
    }));
    this.detailParams = {
      rows
    };
  }

  fields: DetailField[] = null;

  detailParams: DetailParams = null;

  constructor() {}

  ngOnInit() {}
}
