import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';
import {
  UnidadesManejosSegurosSecanoDetailParams,
  UNIDADESMANEJOSSEGUROSSECANODETAIL_DEFAULT_FIELDS
} from '../unidades-manejos-seguros-secano-detail.model';

@Component({
  selector: 'lib-unidades-manejos-seguros-secano-detail',
  templateUrl: './unidades-manejos-seguros-secano-detail.component.html',
  styleUrls: ['./unidades-manejos-seguros-secano-detail.component.css']
})
export class UnidadesManejosSegurosSecanoDetailComponent
  implements OnInit {
  _params: UnidadesManejosSegurosSecanoDetailParams = null;
  @Input()
  set params(value: UnidadesManejosSegurosSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields =
      value.fields || UNIDADESMANEJOSSEGUROSSECANODETAIL_DEFAULT_FIELDS;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.unidad[f.name]
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
