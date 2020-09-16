import { Component, OnInit, Input } from '@angular/core';

import { IngenieroAgronomoCore } from '../ingenieros-agronomos-core.model';

import { PersonaCore } from '../../personas-core/personas-core.model';
import { DetailParams } from '../../extras/components/detail.model';
import { ContactoCore } from '../../contacto-core/contacto-core.model';

@Component({
  selector: 'lib-ingenieros-agronomos-core-detail',
  templateUrl: './ingenieros-agronomos-core-detail.component.html',
  styleUrls: ['./ingenieros-agronomos-core-detail.component.css']
})
export class IngenierosAgronomosCoreDetailComponent implements OnInit {
  _params: { ingeniero: IngenieroAgronomoCore; persona: PersonaCore } = null;
  @Input()
  set params(value: {
    ingeniero: IngenieroAgronomoCore;
    persona: PersonaCore;
  }) {
    this._params = value;
    if (!value) {
      return;
    }
    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.persona[f.field]
    }));
    this.detailParams = {
      rows
    };
    this.personaDetailParams = { persona: value.persona };
    this.contactoDetailParams = { contacto: value.ingeniero.contacto };
  }

  fields: any[] = [
    { field: 'cjppu', label: 'CJJPU' },
    { field: 'regionalId', label: 'Regional' }
  ];

  detailParams: DetailParams = null;

  personaDetailParams: { persona: PersonaCore } = null;

  contactoDetailParams: { contacto: ContactoCore } = null;

  constructor() {}

  ngOnInit(): void {}
}
