import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';
import {
  ChacrasSegurosSecanoDetailParams,
  CHACRASSEGUROSSECANODETAIL_DEFAULT_FIELDS
} from '../chacras-seguros-secano-detail.model';

@Component({
  selector: 'lib-chacras-seguros-secano-detail',
  templateUrl: './chacras-seguros-secano-detail.component.html',
  styleUrls: ['./chacras-seguros-secano-detail.component.css']
})
export class ChacrasSegurosSecanoDetailComponent implements OnInit {
  _params: ChacrasSegurosSecanoDetailParams = null;
  @Input()
  set params(value: ChacrasSegurosSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields = value.fields || CHACRASSEGUROSSECANODETAIL_DEFAULT_FIELDS;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.chacra[f.name]
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
