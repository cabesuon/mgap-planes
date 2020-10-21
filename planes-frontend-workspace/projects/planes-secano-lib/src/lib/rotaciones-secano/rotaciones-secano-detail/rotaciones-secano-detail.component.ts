import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';
import { ComponentesSecanoDetailParams } from '../../componentes-secano/componentes-secano-detail.model';
import {
  ROTACIONESSECANODETAIL_DEFAULT_FIELDS,
  RotacionesSecanoDetailParams
} from '../rotaciones-secano-detail.model';

@Component({
  selector: 'lib-rotaciones-secano-detail',
  templateUrl: './rotaciones-secano-detail.component.html',
  styleUrls: ['./rotaciones-secano-detail.component.css']
})
export class RotacionesSecanoDetailComponent implements OnInit {
  _params: RotacionesSecanoDetailParams = null;
  @Input()
  set params(value: RotacionesSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields = value.fields || ROTACIONESSECANODETAIL_DEFAULT_FIELDS;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.rotacion[f.name]
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
