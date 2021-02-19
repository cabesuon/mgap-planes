import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableRow, TableParams, TableActionEvent } from 'planes-core-lib';

import {
  PeriodosSecanoTableColumn,
  PeriodosSecanoTableParams,
  createPeriodosSecanoTableRow,
  PERIODOSSECANOTABLE_COLUMNS_DEFAULT
} from '../periodos-secano-table.model';

@Component({
  selector: 'lib-periodos-secano-table',
  templateUrl: './periodos-secano-table.component.html',
  styleUrls: ['./periodos-secano-table.component.css']
})
export class PeriodosSecanoTableComponent implements OnInit {
  // aux
  columns: PeriodosSecanoTableColumn[] = [];
  rows: TableRow[] = [];

  // input
  private _params: PeriodosSecanoTableParams = null;
  @Input()
  set params(params: PeriodosSecanoTableParams) {
    this._params = params;
    this.update();
  }
  get params(): PeriodosSecanoTableParams {
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
    this.rows = [];
    this.columns = this.params.columns || PERIODOSSECANOTABLE_COLUMNS_DEFAULT;
    this.updateRows();
    this.tableParams = {
      columns: this.columns.map(c => ({ ...c })),
      values: this.rows.map(r => ({ ...r }))
    };
  }

  constructor() {}

  ngOnInit(): void {}

  updateRows() {
    const rows: TableRow[] = [];
    if (this.params.periodos) {
      for (const p of this.params.periodos) {
        rows.push(createPeriodosSecanoTableRow(p, this.columns));
      }
    }
    this.rows = rows;
  }

  emit(action: TableActionEvent) {
    this.actioned.emit(action);
  }
}
