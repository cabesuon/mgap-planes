import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  PlanesCoreTableColumn,
  PlanesCoreTableParams,
  PLANESCORETABLE_COLUMNS_DEFAULT,
  createPlanesCoreTableRow
} from '../planes-core-table.model';

import {
  TableActionEvent,
  TableParams,
  TableRow
} from '../../extras/components/table.model';

@Component({
  selector: 'lib-planes-core-table',
  templateUrl: './planes-core-table.component.html',
  styleUrls: ['./planes-core-table.component.css']
})
export class PlanesCoreTableComponent implements OnInit {
  // aux
  columns: PlanesCoreTableColumn[] = [];
  rows: TableRow[] = [];

  // input
  private _params: PlanesCoreTableParams = null;
  @Input()
  set params(params: PlanesCoreTableParams) {
    this._params = params;
    this.update();
  }
  get params(): PlanesCoreTableParams {
    return this._params;
  }

  // output
  @Output() actioned = new EventEmitter<TableActionEvent>();

  tableParams: TableParams = {
    columns: [],
    values: []
  };

  update() {
    this.columns = [];
    this.columns = this.params.columns || PLANESCORETABLE_COLUMNS_DEFAULT;
    this.updateRows();
    this.tableParams = {
      columns: this.columns.map(c => ({ ...c })),
      values: this.rows.map(r => ({ ...r })),
      filter: this.params.filter,
      pagination: this.params.pagination
    };
  }

  constructor() {}

  ngOnInit(): void {}

  // datasource

  updateRows() {
    const rows: TableRow[] = [];
    for (const p of this.params.planes) {
      rows.push(createPlanesCoreTableRow(p, this.columns, this.params.sources));
    }
    this.rows = rows;
  }

  emit(action: TableActionEvent) {
    this.actioned.emit(action);
  }
}
