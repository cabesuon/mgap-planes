import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  PlanesSecanoTableColumn,
  PlanesSecanoTableParams,
  PLANESSECANOTABLE_COLUMNS_DEFAULT,
  createPlanesSecanoTableRow
} from '../planes-secano-table.model';

import { TableActionEvent, TableParams, TableRow } from 'planes-core-lib';
@Component({
  selector: 'lib-planes-secano-table',
  templateUrl: './planes-secano-table.component.html',
  styleUrls: ['./planes-secano-table.component.css']
})
export class PlanesSecanoTableComponent implements OnInit {
  // aux
  columns: PlanesSecanoTableColumn[] = [];
  rows: TableRow[] = [];

  // input
  private _params: PlanesSecanoTableParams = null;
  @Input()
  set params(params: PlanesSecanoTableParams) {
    this._params = params;
    this.update();
  }
  get params(): PlanesSecanoTableParams {
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
    this.columns = this.params.columns || PLANESSECANOTABLE_COLUMNS_DEFAULT;
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
      rows.push(
        createPlanesSecanoTableRow(p, this.columns, this.params.sources)
      );
    }
    this.rows = rows;
  }

  emit(action: TableActionEvent) {
    this.actioned.emit(action);
  }
}
