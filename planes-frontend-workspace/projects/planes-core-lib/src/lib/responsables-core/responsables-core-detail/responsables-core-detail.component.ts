import { Component, OnInit, Input } from '@angular/core';

import {
  DetailParams,
  DetailField
} from '../../extras/components/detail.model';
import { PersonasCoreDetailParams } from '../../personas-core/personas-core-detail.model';
import { ContactoCoreDetailParams } from '../../contacto-core/contacto-core-detail.model';
import {
  ResponsablesCoreDetailParams,
  RESPONSABLESCOREDETAIL_DEFAULT_FIELDS
} from '../responsables-core-detail.model';

@Component({
  selector: 'lib-responsables-core-detail',
  templateUrl: './responsables-core-detail.component.html',
  styleUrls: ['./responsables-core-detail.component.css']
})
export class ResponsablesCoreDetailComponent implements OnInit {
  _params: ResponsablesCoreDetailParams = null;
  @Input()
  set params(value: ResponsablesCoreDetailParams) {
    this._params = value;
    if (!value || !value.responsable) {
      return;
    }
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

  ngOnInit(): void {
    this.fields = this.params.fields || RESPONSABLESCOREDETAIL_DEFAULT_FIELDS;
  }
}
