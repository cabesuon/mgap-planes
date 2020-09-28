import { Component, OnInit, Input } from '@angular/core';

import {
  DetailParams,
  DetailField
} from '../../extras/components/detail.model';
import {
  ContactoCoreDetailParams,
  CONTACTOCOREDETAIL_DEFAULT_FIELDS
} from '../contacto-core-detail.model';

@Component({
  selector: 'lib-contacto-core-detail',
  templateUrl: './contacto-core-detail.component.html',
  styleUrls: ['./contacto-core-detail.component.css']
})
export class ContactoCoreDetailComponent implements OnInit {
  _params: ContactoCoreDetailParams = null;
  @Input()
  set params(value: ContactoCoreDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }
    this.fields = value.fields || CONTACTOCOREDETAIL_DEFAULT_FIELDS;
    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.contacto[f.name]
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
