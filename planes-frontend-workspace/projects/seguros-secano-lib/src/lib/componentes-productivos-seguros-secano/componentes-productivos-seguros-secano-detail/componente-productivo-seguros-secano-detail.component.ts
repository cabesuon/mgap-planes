import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';
import {
  ComponentesProductivosSegurosSecanoDetailParams,
  COMPONENTESPRODUCTIVOSSEGUROSSECANODETAIL_DEFAULT_FIELDS
} from '../componentes-productivos-seguros-secano-detail.model';

@Component({
  selector: 'lib-componentes-productivos-seguros-secano-detail',
  templateUrl: './componentes-productivos-seguros-secano-detail.component.html',
  styleUrls: ['./componentes-productivos-seguros-secano-detail.component.css']
})
export class ComponentesProductivosSegurosSecanoDetailComponent
  implements OnInit {
  _params: ComponentesProductivosSegurosSecanoDetailParams = null;
  @Input()
  set params(value: ComponentesProductivosSegurosSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields =
      value.fields || COMPONENTESPRODUCTIVOSSEGUROSSECANODETAIL_DEFAULT_FIELDS;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.componente[f.name]
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
