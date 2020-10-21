import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';
import {
  MANEJOSSECANODETAIL_DEFAULT_FIELDS,
  ManejosSecanoDetailParams
} from '../manejos-secano-detail.model';

@Component({
  selector: 'lib-manejos-secano-detail',
  templateUrl: './manejos-secano-detail.component.html',
  styleUrls: ['./manejos-secano-detail.component.css']
})
export class ManejosSecanoDetailComponent implements OnInit {
  _params: ManejosSecanoDetailParams = null;
  @Input()
  set params(value: ManejosSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields = value.fields || MANEJOSSECANODETAIL_DEFAULT_FIELDS;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.manejo[f.name]
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
