import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';
import {
  RENDIMIENTOSSECANODETAIL_DEFAULT_FIELDS,
  RendimientosSecanoDetailParams
} from '../rendimientos-secano-detail.model';

@Component({
  selector: 'lib-rendimientos-secano-detail',
  templateUrl: './rendimientos-secano-detail.component.html',
  styleUrls: ['./rendimientos-secano-detail.component.css']
})
export class RendimientosSecanoDetailComponent implements OnInit {
  _params: RendimientosSecanoDetailParams = null;
  @Input()
  set params(value: RendimientosSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields = value.fields || RENDIMIENTOSSECANODETAIL_DEFAULT_FIELDS;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.rendimiento[f.name]
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
