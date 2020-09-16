import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import {
  TableParams,
  TableValue,
  TableColumn,
  TableRow,
  TableActionEvent,
  TableValueSource
} from '../table.model';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<TableValue>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // aux
  columns: TableColumn[] = [];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<TableRow> = new MatTableDataSource([]);

  // input
  private _params: TableParams = null;
  @Input()
  set params(params: TableParams) {
    this._params = params;
    this.update();
  }
  get params(): TableParams {
    return this._params;
  }

  // output
  @Output() actioned = new EventEmitter<TableActionEvent>();

  constructor() {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  update() {
    this.columns = this.params.columns;
    this.displayedColumns = this.params.columns
      .filter(c => c.name !== '__source__')
      .map(c => c.name);
    this.dataSource.data = this.params.values;
  }

  actionClick(obj: TableValueSource, value: string) {
    this.actioned.emit({ obj, value });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
