import { Component, OnInit, Input } from '@angular/core';

import { PersonaCore } from '../personas-core.model';
import { DetailParams } from '../../extras/components/detail.model';
import { formatValue, FormatsType } from '../../extras/extras-format';

@Component({
  selector: 'lib-personas-core-detail',
  templateUrl: './personas-core-detail.component.html',
  styleUrls: ['./personas-core-detail.component.css']
})
export class PersonasCoreDetailComponent implements OnInit {
  _params: { persona: PersonaCore } = null;
  @Input()
  set params(value: { persona: PersonaCore }) {
    this._params = value;
    if (!value) {
      return;
    }
    const rows = this.fields.map(f => ({
      label: f.label,
      value: formatValue(value.persona[f.field], f.format || FormatsType.None)
    }));
    this.detailParams = {
      rows
    };
  }

  fields: any[] = [
    { field: 'personaCedula', label: 'Cedula' },
    { field: 'personaNombre', label: 'Nombre' },
    { field: 'personaPrimerApellido', label: 'Primer Apellido' },
    { field: 'personaSegundoApellido', label: 'Segundo Apellido' },
    {
      field: 'personaFechaDeNacimiento',
      label: 'Fecha de Nacimiento',
      format: FormatsType.Date
    }
  ];

  detailParams: DetailParams = null;

  constructor() {}

  ngOnInit(): void {}
}
