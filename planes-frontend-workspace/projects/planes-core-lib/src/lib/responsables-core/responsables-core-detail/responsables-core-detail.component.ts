import { Component, OnInit, Input } from '@angular/core';

import { PersonaCore } from '../../personas-core/personas-core.model';
import { ResponsableCore } from '../responsables-core.model';
import { DetailParams } from '../../extras/components/detail.model';
import { ContactoCore } from '../../contacto-core/contacto-core.model';

@Component({
  selector: 'lib-responsables-core-detail',
  templateUrl: './responsables-core-detail.component.html',
  styleUrls: ['./responsables-core-detail.component.css']
})
export class ResponsablesCoreDetailComponent implements OnInit {
  _params: { responsable: ResponsableCore; persona: PersonaCore } = null;
  @Input()
  set params(value: { responsable: ResponsableCore; persona: PersonaCore }) {
    this._params = value;
    if (!value || !value.responsable) {
      return;
    }
    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.responsable[f.field]
    }));
    this.detailParams = {
      rows
    };
    this.personaDetailParams = { persona: value.persona };
    this.contactoDetailParams = { contacto: value.responsable.contacto };
  }

  fields: any[] = [{ field: 'empresaId', label: 'Empresa' }];

  detailParams: DetailParams = null;

  personaDetailParams: { persona: PersonaCore } = null;

  contactoDetailParams: { contacto: ContactoCore } = null;

  constructor() {}

  ngOnInit(): void {}
}
