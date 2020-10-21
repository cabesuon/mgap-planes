import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';
import {
  RELACIONPERDIDASUELOSSECANODETAIL_DEFAULT_FIELDS,
  RelacionesPerdidaSueloSecanoDetailParams
} from '../relaciones-perdida-suelo-secano-detail.model';

@Component({
  selector: 'lib-relaciones-perdida-suelo-secano-detail',
  templateUrl: './relaciones-perdida-suelo-secano-detail.component.html',
  styleUrls: ['./relaciones-perdida-suelo-secano-detail.component.css']
})
export class RelacionesPerdidaSueloSecanoDetailComponent implements OnInit {
  _params: RelacionesPerdidaSueloSecanoDetailParams = null;
  @Input()
  set params(value: RelacionesPerdidaSueloSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields =
      value.fields || RELACIONPERDIDASUELOSSECANODETAIL_DEFAULT_FIELDS;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.relacionPerdidaSuelo[f.name]
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
