import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';
import {
  CICLOSSEGUROSSECANODETAIL_DEFAULT_FIELDS,
  CiclosSegurosSecanoDetailParams
} from '../ciclos-seguros-secano-detail.model';

@Component({
  selector: 'lib-ciclos-seguros-secano-detail',
  templateUrl: './ciclos-seguros-secano-detail.component.html',
  styleUrls: ['./ciclos-seguros-secano-detail.component.css']
})
export class CiclosSegurosSecanoDetailComponent implements OnInit {
  _params: CiclosSegurosSecanoDetailParams = null;
  @Input()
  set params(value: CiclosSegurosSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields = value.fields || CICLOSSEGUROSSECANODETAIL_DEFAULT_FIELDS;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.ciclo[f.name]
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
