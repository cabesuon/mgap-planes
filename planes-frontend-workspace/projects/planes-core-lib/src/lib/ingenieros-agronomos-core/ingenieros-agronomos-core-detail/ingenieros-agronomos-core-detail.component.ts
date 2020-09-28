import { Component, OnInit, Input } from '@angular/core';

import { PersonasCoreDetailParams } from '../../personas-core/personas-core-detail.model';
import {
  DetailParams,
  DetailField
} from '../../extras/components/detail.model';
import { ContactoCoreDetailParams } from '../../contacto-core/contacto-core-detail.model';
import {
  IngenierosCoreDetailParams,
  INGENIEROSAGRONOMOSCOREDETAIL_DEFAULT_FIELDS
} from '../ingenieros-agronomos-core-detail.model';

@Component({
  selector: 'lib-ingenieros-agronomos-core-detail',
  templateUrl: './ingenieros-agronomos-core-detail.component.html',
  styleUrls: ['./ingenieros-agronomos-core-detail.component.css']
})
export class IngenierosAgronomosCoreDetailComponent implements OnInit {
  _params: IngenierosCoreDetailParams = null;
  @Input()
  set params(value: IngenierosCoreDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }
    this.fields = value.fields || INGENIEROSAGRONOMOSCOREDETAIL_DEFAULT_FIELDS;
    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.persona[f.name]
    }));
    this.detailParams = {
      rows
    };
    this.personaDetailParams = { persona: value.persona };
    this.contactoDetailParams = { contacto: value.ingeniero.contacto };
  }

  fields: DetailField[] = [];

  detailParams: DetailParams = null;

  personaDetailParams: PersonasCoreDetailParams = null;

  contactoDetailParams: ContactoCoreDetailParams = null;

  constructor() {}

  ngOnInit(): void {}
}
