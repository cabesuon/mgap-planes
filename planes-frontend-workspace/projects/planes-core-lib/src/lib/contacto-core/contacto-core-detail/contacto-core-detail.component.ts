import { Component, OnInit, Input } from '@angular/core';

import { ContactoCore } from '../contacto-core.model';
import { DetailParams } from '../../extras/components/detail.model';

@Component({
  selector: 'lib-contacto-core-detail',
  templateUrl: './contacto-core-detail.component.html',
  styleUrls: ['./contacto-core-detail.component.css']
})
export class ContactoCoreDetailComponent implements OnInit {
  _params: { contacto: ContactoCore } = null;
  @Input()
  set params(value: { contacto: ContactoCore }) {
    this._params = value;
    if (!value) {
      return;
    }
    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.contacto[f.field]
    }));
    this.detailParams = {
      rows
    };
  }

  fields: any[] = [
    { field: 'email', label: 'Email' },
    { field: 'telefono', label: 'Telefono' },
    { field: 'celular', label: 'Celular' },
    { field: 'domicilio', label: 'Domicilio' },
    { field: 'ciudad', label: 'Ciudad' }
  ];

  detailParams: DetailParams = null;

  constructor() {}

  ngOnInit(): void {}
}
