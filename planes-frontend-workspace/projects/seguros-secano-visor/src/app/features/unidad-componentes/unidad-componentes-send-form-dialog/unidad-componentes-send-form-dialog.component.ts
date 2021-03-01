import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { selectUnidadById } from '../../entity-unidades/entity-unidades.selectors';
import { selectChacrasByUnidadId } from '../../entity-chacras/entity-chacras.selectors';
import { selectComponenteByChacraId, selectAllEntityComponentes } from '../../entity-componentes/entity-component.selectors';
import { EntityComponentesChangeRequestAction } from '../../entity-componentes/entity-componentes.actions';
import { UnidadManejoSegurosSecano, ChacraSegurosSecano, ComponenteProductivoSegurosSecano } from 'seguros-secano-lib';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { createEmptyComponenteProductivoSegurosSecano } from 'projects/seguros-secano-lib/src/public-api';
import { ComponentesProductivosSegurosSecanoService } from 'projects/seguros-secano-lib/src/lib/componentes-productivos-seguros-secano/componentes-productivos-seguros-secano.service';
import { TableValueType, TableValueAction, TableActionEvent, TableParams, TableRow, TableColumn } from 'planes-core-lib';

export function formatNull(v: any): string {
  if (!v) {
    return '';
  }
  return v;
}

export interface UnidadComponentesValidacionTableColumn
  extends TableColumn {
  literalFormat?: (v: any) => string;  
}

@Component({
  selector: 'app-unidad-componentes-send-form-dialog',
  templateUrl: './unidad-componentes-send-form-dialog.component.html',
  styleUrls: ['./unidad-componentes-send-form-dialog.component.scss']
})
export class UnidadComponentesSendFormDialogComponent implements OnInit {  
  unidad: UnidadManejoSegurosSecano;
  chacras: ChacraSegurosSecano[];  
  componentes: ComponenteProductivoSegurosSecano[];  
  chacrasNoValidadas = [];

  columns = [];
  rows: TableRow[] = [];
  tableParams: TableParams = {
    columns: [],
    values: []
  };
  
  // input
  private _params = null;
  @Input()
  set params(params) {
    this._params = params;
    this.update();
  }
  get params(){
    return this._params;
  }

  displayedColumns: string[] = ['chacra', 'validado'];  
  dataSource = []; 
  dHoy = new Date();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private componenteProductivoService: ComponentesProductivosSegurosSecanoService,
    public dialogRef: MatDialogRef<UnidadComponentesSendFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any      
  ) {    
  }
 
  ngOnInit(): void {    
    this.unidad = this.data;    
    //let unidadId = this.data.id;
    //this.store.pipe(select(selectUnidadById(unidadId))).subscribe(u => this.unidad = u);    
    this.store.pipe(select(selectChacrasByUnidadId(this.unidad.unidadId))).subscribe( c => {
      this.chacras = c;
      this.store.pipe(select(selectAllEntityComponentes)).subscribe(comp => {
        this.componentes = comp;
        this.chacras.forEach(chacra => {
          let componente = this.componentes.find( comp => comp.chacraId === chacra.chacraId );
          // tengo que verificar que el componente es valido o no y agregarlo a la tabla          
          const v = this.verificarComponente(componente);
          this.dataSource.push({chacra: chacra.chacraNombre, validado: v, componente: componente});
          if (v == 'No'){
            this.chacrasNoValidadas.push(chacra);
          }          
        });        
        this.update();  
      });
    });       
  }

  verificarComponente(c: ComponenteProductivoSegurosSecano){
    const v = this.componenteProductivoService.isValidComponenteProductivo(c);
    if (v){
      return 'Sí'
    } else {
      return 'No'
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

  updateRows() {
    const rows: TableRow[] = [];
    for (const r of this.dataSource) {
      rows.push(
        r
      );
    }
    this.rows = rows;
  }

  update() {
    this.columns = [{
      type: TableValueType.LITERAL,
      name: 'chacra',
      label: 'Chacra',
      sort: true,
      filter: true,
      literalFormat: formatNull
    },
    {
      type: TableValueType.LITERAL,
      name: 'validado',
      label: 'Validado',
      sort: true,
      filter: true,
      literalFormat: formatNull      
    }];    
    this.updateRows();
    this.tableParams = {
      columns: this.columns.map(c => ({ ...c })),
      values: this.rows.map(r => ({ ...r })),
      filter: false,
      pagination: false
    };
  }

  onSubmit(){    
    let items = [];
    this.dataSource.forEach(element => {                
        const c = {...element.componente , fechaEnviado: this.dHoy}
        items.push(c);            
    });
    this.store.dispatch(new EntityComponentesChangeRequestAction({ item: items }));
    this.dialogRef.close();
  }

}
