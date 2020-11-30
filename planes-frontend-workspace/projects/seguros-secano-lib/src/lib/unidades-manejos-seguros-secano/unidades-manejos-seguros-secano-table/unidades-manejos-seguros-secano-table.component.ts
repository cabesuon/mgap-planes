import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  UnidadesManejosSegurosSecanoTableColumn,
  UnidadesManejosSegurosSecanoTableParams,
  UNIDADESMANEJOSSEGUROSSECANOTABLE_COLUMNS_DEFAULT,
  createUnidadesManejosSegurosSecanoTableRow
} from '../unidades-manejos-seguros-secano-table.model';

import { TableActionEvent, TableParams, TableRow } from 'planes-core-lib';
@Component({
  selector: 'lib-unidades-manejos-seguros-secano-table',
  templateUrl: './unidades-manejos-seguros-secano-table.component.html',
  styleUrls: ['./unidades-manejos-seguros-secano-table.component.css']
})
export class UnidadesManejosSegurosSecanoTableComponent implements OnInit {
  // aux
  columns: UnidadesManejosSegurosSecanoTableColumn[] = [];
  rows: TableRow[] = [];

  // input
  private _params: UnidadesManejosSegurosSecanoTableParams = null;
  @Input()
  set params(params: UnidadesManejosSegurosSecanoTableParams) {
    this._params = params;
    this.update();
  }
  get params(): UnidadesManejosSegurosSecanoTableParams {
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
      this.params.columns || UNIDADESMANEJOSSEGUROSSECANOTABLE_COLUMNS_DEFAULT;
    this.updateRows();
    this.tableParams = {
      columns: this.columns.map(c => ({ ...c })),
      values: this.rows.map(r => ({ ...r }))
    };
  }

  constructor() {    
  }

  ngOnInit(): void {    
  }

  // datasource

  updateRows() {
    const rows: TableRow[] = [];
    for (const p of this.params.unidades) {
      rows.push(
        createUnidadesManejosSegurosSecanoTableRow(
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
