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

import { PlanCore } from '../planes-core.model';
import {
  PlanesCoreTableColumn,
  PlanesCoreTableParams,
  PlanesCoreTableActionValue,
  PLANESCORETABLE_COLUMNS_DEFAULT
} from '../planes-core-table.model';

@Component({
  selector: 'lib-planes-core-table',
  templateUrl: './planes-core-table.component.html',
  styleUrls: ['./planes-core-table.component.css']
})
export class PlanesCoreTableComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<PlanCore>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // aux
  columns: PlanesCoreTableColumn[] = [];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource([]);

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
  @Output() actioned = new EventEmitter<PlanesCoreTableActionValue>();

  update() {
    this.columns = [];
    this.dataSource.data = [];
    this.columns = this.params.columns || PLANESCORETABLE_COLUMNS_DEFAULT;
    this.displayedColumns = [];
    this.displayedColumns.push('GotoVistaMapa');
    this.displayedColumns.push('GotoVistaAdministrativo');
    if (this.columns.length > 0) {
      this.displayedColumns = this.displayedColumns.concat(
        this.columns.map(c => c.name)
      );
    }
    if (this.params.actions) {
      this.displayedColumns.push('EstadoAction');
      this.displayedColumns.push('Descartar');
    }
    this.updateDataSourceData();
  }

  constructor() {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // datasource

  updateDataSourceData() {
    const rows = [];
    for (const p of this.params.sources.planes) {
      rows.push(this.createDataSourceDataRow(p));
    }
    // update datasource
    this.dataSource.data = rows;
  }

  // table features

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // actions

  actionClick(plan: PlanCore, action: string) {
    this.actioned.emit({
      action: action as PlanesCoreTableAction,
      plan
    });
  }
}
