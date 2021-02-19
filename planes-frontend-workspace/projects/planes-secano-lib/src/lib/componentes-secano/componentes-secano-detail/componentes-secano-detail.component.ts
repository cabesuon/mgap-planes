import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';

import { PeriodosSecanoDetailParams } from '../../periodos-secano/periodos-secano-detail.model';
import {
  COMPONENTESSECANODETAIL_DEFAULT_FIELDS,
  ComponentesSecanoDetailParams
} from '../componentes-secano-detail.model';

@Component({
  selector: 'lib-componentes-secano-detail',
  templateUrl: './componentes-secano-detail.component.html',
  styleUrls: ['./componentes-secano-detail.component.css']
})
export class ComponentesSecanoDetailComponent implements OnInit {
  _params: ComponentesSecanoDetailParams = null;
  @Input()
  get params(): ComponentesSecanoDetailParams {
    return this._params;
  }
  set params(value: ComponentesSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields = value.fields || COMPONENTESSECANODETAIL_DEFAULT_FIELDS;

    this.periodosDetailParams = {
      periodos: value.componente.periodos
    };
  }

  fields: DetailField[] = null;

  periodosDetailParams: PeriodosSecanoDetailParams = null;

  constructor() {}

  ngOnInit(): void {}
}
