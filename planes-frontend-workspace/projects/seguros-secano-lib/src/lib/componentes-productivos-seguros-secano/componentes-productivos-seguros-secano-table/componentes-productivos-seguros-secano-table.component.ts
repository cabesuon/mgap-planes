import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  ComponentesProductivosSegurosSecanoTableColumn,
  ComponentesProductivosSegurosSecanoTableParams,
  COMPONENTESPRODUCTIVOSSEGUROSSECANOTABLE_COLUMNS_DEFAULT,
  createComponentesProductivosSegurosSecanoTableRow
} from '../componentes-productivos-seguros-secano-table.model';

import { TableActionEvent, TableParams, TableRow } from 'planes-core-lib';
@Component({
  selector: 'lib-componentes-productivos-seguros-secano-table',
  templateUrl: './componentes-productivos-seguros-secano-table.component.html',
  styleUrls: ['./componentes-productivos-seguros-secano-table.component.css']
})
export class ComponentesProductivosSegurosSecanoTableComponent
  implements OnInit {
  // aux
  columns: ComponentesProductivosSegurosSecanoTableColumn[] = [];
  rows: TableRow[] = [];

  // input
  private _params: ComponentesProductivosSegurosSecanoTableParams = null;
  @Input()
  set params(params: ComponentesProductivosSegurosSecanoTableParams) {
    this._params = params;
    this.update();
  }
  get params(): ComponentesProductivosSegurosSecanoTableParams {
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
    this.columns =
      this.params.columns ||
      COMPONENTESPRODUCTIVOSSEGUROSSECANOTABLE_COLUMNS_DEFAULT;
    this.updateRows();
    this.tableParams = {
      columns: this.columns.map(c => ({ ...c })),
      values: this.rows.map(r => ({ ...r }))
    };
  }

  constructor() {}

  ngOnInit(): void {}

  // datasource

  updateRows() {
    const rows: TableRow[] = [];
    for (const p of this.params.componentes) {
      rows.push(
        createComponentesProductivosSegurosSecanoTableRow(
          p,
          this.columns,
          this.params.sources
        )
      );
    }
    this.rows = rows;
  }

  emit(action: TableActionEvent) {
    this.actioned.emit(action);
  }
}
