import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';
import {
  CULTIVOSSECANODETAIL_DEFAULT_FIELDS,
  CultivosSecanoDetailParams
} from '../cultivos-secano-detail.model';

@Component({
  selector: 'lib-cultivos-secano-detail',
  templateUrl: './cultivos-secano-detail.component.html',
  styleUrls: ['./cultivos-secano-detail.component.css']
})
export class CultivosSecanoDetailComponent implements OnInit {
  _params: CultivosSecanoDetailParams = null;
  @Input()
  set params(value: CultivosSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields = value.fields || CULTIVOSSECANODETAIL_DEFAULT_FIELDS;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.cultivo[f.name]
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
