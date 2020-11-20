import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';
import {
  ASEGURADORASSEGUROSSECANODETAIL_DEFAULT_FIELDS,
  AseguradorasSegurosSecanoDetailParams
} from '../aseguradoras-seguros-secano-detail.model';

@Component({
  selector: 'lib-aseguradoras-seguros-secano-detail',
  templateUrl: './aseguradoras-seguros-secano-detail.component.html',
  styleUrls: ['./aseguradoras-seguros-secano-detail.component.css']
})
export class AseguradorasSegurosSecanoDetailComponent implements OnInit {
  _params: AseguradorasSegurosSecanoDetailParams = null;
  @Input()
  set params(value: AseguradorasSegurosSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields = value.fields || ASEGURADORASSEGUROSSECANODETAIL_DEFAULT_FIELDS;

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
