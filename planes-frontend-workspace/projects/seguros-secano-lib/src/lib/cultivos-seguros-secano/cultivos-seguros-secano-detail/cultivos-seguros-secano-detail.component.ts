import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';
import {
  CULTIVOSSEGUROSSECANODETAIL_DEFAULT_FIELDS,
  CultivosSegurosSecanoDetailParams
} from '../cultivos-seguros-secano-detail.model';

@Component({
  selector: 'lib-cultivos-seguros-secano-detail',
  templateUrl: './cultivos-seguros-secano-detail.component.html',
  styleUrls: ['./cultivos-seguros-secano-detail.component.css']
})
export class CultivosSegurosSecanoDetailComponent implements OnInit {
  _params: CultivosSegurosSecanoDetailParams = null;
  @Input()
  set params(value: CultivosSegurosSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields = value.fields || CULTIVOSSEGUROSSECANODETAIL_DEFAULT_FIELDS;

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
