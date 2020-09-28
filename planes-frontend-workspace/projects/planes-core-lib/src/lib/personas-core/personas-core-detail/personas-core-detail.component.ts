import { Component, OnInit, Input } from '@angular/core';

import {
  DetailParams,
  DetailField
} from '../../extras/components/detail.model';
import { formatValue } from '../../extras/extras-format';
import {
  PersonasCoreDetailParams,
  PERSONASCOREDETAIL_DEFAULT_FIELDS
} from '../personas-core-detail.model';

@Component({
  selector: 'lib-personas-core-detail',
  templateUrl: './personas-core-detail.component.html',
  styleUrls: ['./personas-core-detail.component.css']
})
export class PersonasCoreDetailComponent implements OnInit {
  _params: PersonasCoreDetailParams = null;
  @Input()
  set params(value: PersonasCoreDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }
    this.fields = value.fields || PERSONASCOREDETAIL_DEFAULT_FIELDS;
    const rows = this.fields.map(f => ({
      label: f.label,
      value: formatValue(value.persona[f.name], f.format)
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
