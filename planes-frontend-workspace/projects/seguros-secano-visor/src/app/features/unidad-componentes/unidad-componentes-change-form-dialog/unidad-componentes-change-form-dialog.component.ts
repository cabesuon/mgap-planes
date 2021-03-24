import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

@Component({
  selector: 'app-unidad-componentes-change-form-dialog',
  templateUrl: './unidad-componentes-change-form-dialog.component.html',
  styleUrls: ['./unidad-componentes-change-form-dialog.component.scss']
})
export class UnidadComponentesChangeFormDialogComponent implements OnInit {  
  unidad: UnidadManejoSegurosSecano;
  chacras$: Observable<ChacraSegurosSecano[]>;  
  chacras: ChacraSegurosSecano[] = [];  
  componentes: ComponenteProductivoSegurosSecano[];
  selectedOptions;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<UnidadComponentesChangeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any      
  ) {    
  }
 
  ngOnInit(): void {    
    let unidadId = this.data.id;
    this.store.pipe(select(selectUnidadById(unidadId))).subscribe(u => this.unidad = u);      
    this.store.pipe(select(selectAllEntityComponentes)).subscribe(c => this.componentes = c );
    this.store.pipe(select(selectChacrasByUnidadId(unidadId))).subscribe(
      chacras => {
        chacras.forEach(chacra => {
          const componenteChacra = this.componentes.find(comp => comp.chacraId == chacra.chacraId);
          if (componenteChacra.fechaEnviado == null){
            this.chacras = [...this.chacras, chacra]
          }
        });
      }
    );    
    
  }

  onCancel(){
    this.dialogRef.close();
  }

  onSubmit(){    
    let items = [];
    this.selectedOptions.forEach(chacra => {        
        let componente = this.componentes.find( comp => comp.chacraId === chacra.chacraId);                
          // tengo que obtener el componente productivo de la chacra y actualizarlo con la unidad          
        const item = createEmptyComponenteProductivoSegurosSecano();
        for (let key in componente) item[key] = this.unidad.hasOwnProperty(key) ? this.unidad[key] : componente[key];          
        items.push(item);            
    });
    this.store.dispatch(new EntityComponentesChangeRequestAction({ item: items }));
    this.dialogRef.close();
  }

}
