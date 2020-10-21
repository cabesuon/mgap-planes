import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';
import {
  PlanesSecanoDetailParams,
  PLANESSECANODETAIL_DEFAULT_FIELDS
} from '../planes-secano-detail.model';

@Component({
  selector: 'lib-planes-secano-detail',
  templateUrl: './planes-secano-detail.component.html',
  styleUrls: ['./planes-secano-detail.component.css']
})
export class PlanesSecanoDetailComponent implements OnInit {
  _params: PlanesSecanoDetailParams = null;
  @Input()
  set params(value: PlanesSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields = value.fields || PLANESSECANODETAIL_DEFAULT_FIELDS;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.plan[f.name]
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
