import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  TableRow,
  TableParams,
  TableActionEvent
} from '../../extras/components/table.model';

import {
  ChacrasCoreTableColumn,
  ChacrasCoreTableParams,
  createChacrasCoreTableRow,
  CHACRASCORETABLE_COLUMNS_DEFAULT
} from '../chacras-core-table.model';

@Component({
  selector: 'lib-chacras-core-table',
  templateUrl: './chacras-core-table.component.html',
  styleUrls: ['./chacras-core-table.component.css']
})
export class ChacrasCoreTableComponent implements OnInit {
  // aux
  columns: ChacrasCoreTableColumn[] = [];
  rows: TableRow[] = [];

  // input
  private _params: ChacrasCoreTableParams = null;
  @Input()
  set params(params: ChacrasCoreTableParams) {
    this._params = params;
    this.update();
  }
  get params(): ChacrasCoreTableParams {
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
    this.columns = this.params.columns || CHACRASCORETABLE_COLUMNS_DEFAULT;
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
    if (this.params.chacras) {
      for (const chacra of this.params.chacras) {
        rows.push(createChacrasCoreTableRow(chacra, this.columns));
      }
    }
    this.rows = rows;
  }

  emit(action: TableActionEvent) {
    this.actioned.emit(action);
  }
}
