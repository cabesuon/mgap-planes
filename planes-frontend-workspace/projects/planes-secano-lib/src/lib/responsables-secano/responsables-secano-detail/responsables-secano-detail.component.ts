import { Component, OnInit, Input } from '@angular/core';

import {
  DetailParams,
  DetailField,
  PersonasCoreDetailParams,
  ContactoCoreDetailParams
} from 'planes-core-lib';
import {
  ResponsablesSecanoDetailParams,
  RESPONSABLESCOREDETAIL_DEFAULT_FIELDS
} from '../responsables-secano-detail.model';

@Component({
  selector: 'lib-responsables-secano-detail',
  templateUrl: './responsables-secano-detail.component.html',
  styleUrls: ['./responsables-secano-detail.component.css']
})
export class ResponsablesSecanoDetailComponent implements OnInit {
  _params: ResponsablesSecanoDetailParams = null;
  @Input()
  set params(value: ResponsablesSecanoDetailParams) {
    this._params = value;
    if (!value || !value.responsable) {
      return;
    }

    this.fields = value.fields || RESPONSABLESCOREDETAIL_DEFAULT_FIELDS;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.responsable[f.name]
    }));
    this.detailParams = {
      rows
    };
    this.personaDetailParams = { persona: value.persona };
    this.contactoDetailParams = { contacto: value.responsable.contacto };
  }

  fields: DetailField[] = [];

  detailParams: DetailParams = null;

  personaDetailParams: PersonasCoreDetailParams = null;

  contactoDetailParams: ContactoCoreDetailParams = null;

  constructor() {}

  ngOnInit(): void {}
}
