import { Component, OnInit, Input } from '@angular/core';

import { PlanCore } from '../planes-core.model';

import { formatValue, FormatsType } from '../../extras/extras-format';
import { DetailParams } from '../../extras/components/detail.model';

@Component({
  selector: 'lib-planes-core-detail',
  templateUrl: './planes-core-detail.component.html',
  styleUrls: ['./planes-core-detail.component.css']
})
export class PlanesCoreDetailComponent implements OnInit {
  _params: { plan: PlanCore } = null;
  @Input()
  set params(value: { plan: PlanCore }) {
    this._params = value;
    if (!value) {
      return;
    }
    const rows = this.fields.map(f => ({
      label: f.label,
      value: formatValue(value.plan[f.field], f.format || FormatsType.None)
    }));
    this.planDetailParams = {
      rows
    };
  }

  fields: any[] = [
    {
      field: 'planNro',
      label: 'Nro. del Plan',
      format: FormatsType.None
    },
    {
      field: 'planNombre',
      label: 'Nombre del Plan',
      format: FormatsType.None
    },
    {
      field: 'planFechaCreacion',
      label: 'Fecha de Creacion',
      format: FormatsType.Date
    },
    {
      field: 'planFechaPresentacion',
      label: 'Fecha de Presentacion',
      format: FormatsType.Date
    },
    {
      field: 'planEstado',
      label: 'Estado',
      format: FormatsType.PlanEstado
    }
  ];

  planDetailParams: DetailParams = null;

  constructor() {}

  ngOnInit(): void {}
}
