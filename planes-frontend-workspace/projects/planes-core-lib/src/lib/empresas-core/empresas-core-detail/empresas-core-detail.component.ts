import { Component, OnInit, Input } from '@angular/core';

import {
  DetailParams,
  DetailField
} from '../../extras/components/detail.model';
import { ContactoCoreDetailParams } from '../../contacto-core/contacto-core-detail.model';
import {
  EmpresasCoreDetailParams,
  EMPRESASCOREDETAIL_DEFAULT_FIELDS
} from '../empresas-core-detail.model';

@Component({
  selector: 'lib-empresas-core-detail',
  templateUrl: './empresas-core-detail.component.html',
  styleUrls: ['./empresas-core-detail.component.css']
})
export class EmpresasCoreDetailComponent implements OnInit {
  _params: EmpresasCoreDetailParams = null;
  @Input()
  set params(value: EmpresasCoreDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields = value.fields || EMPRESASCOREDETAIL_DEFAULT_FIELDS;

    const rows = this.fields
      .filter(f => f.name !== 'contactos')
      .map(f => ({
        label: f.label,
        value: value.empresa[f.name]
      }));
    this.detailParams = {
      rows
    };
    if (this.fields.some(f => f.name === 'contactos')) {
      this.contactosDetailParams = this.params.empresa.contactos.map(
        contacto => ({ contacto })
      );
    }
  }

  fields: DetailField[] = [];

  detailParams: DetailParams = null;

  contactosDetailParams: ContactoCoreDetailParams[] = [];

  constructor() {}

  ngOnInit(): void {}
}
