import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Store, select, ActionsSubject } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ofType } from '@ngrx/effects';

import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { EntityComponentesActionTypes } from '../../entity-componentes/entity-componentes.actions';

import {
  FormActionType,
  createEmptyChacraCore,
  DibujoCoreType,
  EmpresaCore,
  ConfirmDialogData,
  ConfirmDialogResultType,
  ConfirmDialogComponent
} from 'planes-core-lib';

import {
  ChacraSegurosSecano,
  createEmptyChacraSegurosSecano,
  UnidadManejoSegurosSecano,
  ComponenteContratoSeguroZP,
  ComponenteProductivoSegurosSecano
} from 'seguros-secano-lib';

import { MapCoreService } from 'projects/planes-core-lib/src/lib/map-core/map-core.service';

import { AppState } from '../../../core/core.state';
import { NotificationService } from '../../../core/notifications/notification.service';
import { LoggingService } from '../../../core/logging/logging.service';
import { FileService } from '../../../core/file/file.service';

import { 
  EntityComponentesFormDialogData, 
  EntityComponentesFormDialogComponent 
} from '../../entity-componentes/entity-componentes-form-dialog/entity-componentes-form-dialog.component';

import {
  selectAllEntityEmpresas,
  selectEmpresaById
} from '../../entity-empresas/entity-empresas.selectors';
import {
  selectAllEntityUnidadesManejos,
  selectUnidadesManejosByEmpresaId
} from '../../entity-unidades/entity-unidades.selectors';

import {
  selectAllEntityChacras,
  selectChacrasByEmpresaId,
  selectChacrasByUnidadId
} from '../../entity-chacras/entity-chacras.selectors';
import {
  EntityChacrasFormDialogData,
  EntityChacrasFormDialogComponent
} from '../../entity-chacras/entity-chacras-form-dialog/entity-chacras-form-dialog.component';

import { DibujoCore } from '../../entity-dibujos/entity-dibujos.state';
import {
  selectAllEntityDibujosByTipo,
  selectAllEntityDibujos
} from '../../entity-dibujos/entity-dibujos.selectors';
import {
  addDibujo,
  addDibujos,
  deleteDibujos,
  updateDibujos
} from '../../entity-dibujos/entity-dibujos.actions';

import { CultivoSegurosSecano } from '../../entity-cultivos/entity-cultivos.state';
import { CicloSegurosSecano } from '../../entity-ciclos/entity-ciclos.state';
import { AseguradoraSegurosSecano } from '../../entity-aseguradoras/entity-aseguradoras.state';

import { selectAllEntityCultivos } from '../../entity-cultivos/entity-cultivos.selectors';
import { selectAllEntityCiclos } from '../../entity-ciclos/entity-ciclos.selectors';
import { selectAllEntityAseguradoras } from '../../entity-aseguradoras/entity-aseguradoras.selectors';

import { EntityChacrasDeleteRequestAction } from '../../entity-chacras/entity-chacras.actions';
import { selectAllEntityComponentes } from '../../entity-componentes/entity-component.selectors';

const DIALOG_WIDTH = '300px';
const DIALOG_MAX_HEIGHT = '500px';

@Component({
  selector: 'app-vista-mapa',
  templateUrl: './vista-mapa.component.html',
  styleUrls: ['./vista-mapa.component.scss']
})
export class VistaMapaComponent implements OnInit, OnDestroy {
  empresaId: string = null;
  empresas$: Observable<EmpresaCore[]>;

  unidades: UnidadManejoSegurosSecano[] = [];
  cultivos: CultivoSegurosSecano[] = [];
  ciclos: CicloSegurosSecano[] = [];
  aseguradoras: AseguradoraSegurosSecano[] = [];
  contratoSeguroZP: ComponenteContratoSeguroZP;

  unidadesCombobox$ = []; 
  chacras$: Observable<ChacraSegurosSecano[]>;
  chacras: ChacraSegurosSecano[];
  componentes: ComponenteProductivoSegurosSecano[];

  polygons$: Observable<DibujoCore[]>;
  dibujos: DibujoCore[];
  dibujosTypes: String[];
  includePendientes: boolean = false;
  includeZonasExclusion: boolean = false;

  subsc: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private loggingService: LoggingService,
    private fileService: FileService,
    private mapCoreService: MapCoreService,
    private dialog: MatDialog,
    private actionsSubj: ActionsSubject
  ) {    
    //this.subsc = new Subscription();    
    this.subsc = this.actionsSubj.pipe(
      ofType(EntityComponentesActionTypes.ENTITYCOMPONENTES_ADD_SUCCESS)
    ).subscribe((data: any ) => {          
        this.openDialogComponente(FormActionType.Update, data.payload.item);
     });
  }

  ngOnInit(): void {    
    this.dibujosTypes = ['polygon', 'circle']
    this.empresaId = this.route.snapshot.paramMap.get('EmpresaId');
    
    this.empresas$ = /*this.empresaId
      ? this.store.pipe(
          select(selectEmpresaById(this.empresaId)),
          map(p => [p])
        ) 
      : */ this.store.pipe(select(selectAllEntityEmpresas));

    this.chacras$ = this.empresaId
      ? this.store.pipe(select(selectChacrasByEmpresaId(this.empresaId)))
      : this.store.pipe(select(selectAllEntityChacras));
    this.chacras$.subscribe( chacras => 
      this.chacras = chacras      
    );
    this.store.pipe(select(selectAllEntityComponentes)).subscribe(
      componentes => this.componentes = componentes
    )
    

    this.polygons$ = this.store.pipe(
      select(selectAllEntityDibujosByTipo(DibujoCoreType.POLYGON))
    );

    this.store
      .pipe(select(selectAllEntityDibujos))
      .subscribe(dibujos => (this.dibujos = dibujos));

    if (this.empresaId){
      this.store
        .pipe(select(selectUnidadesManejosByEmpresaId(this.empresaId)))
        .subscribe(unidades => {
          this.unidades = unidades;
          this.unidadesCombobox$ = [{unidadId:-1, unidadNombre:'Todos'}, ...unidades];        
        });
    }

    this.store
      .pipe(select(selectAllEntityAseguradoras))
      .subscribe(aseguradoras => (this.aseguradoras = aseguradoras));

    this.store
      .pipe(select(selectAllEntityCiclos))
      .subscribe(ciclos => (this.ciclos = ciclos));    

    this.store
      .pipe(select(selectAllEntityCultivos))
      .subscribe(cultivos => (this.cultivos = cultivos));    

    if (!this.empresaId){
      // si no tengo empresa selecciono la primera
      this.store.pipe(select(selectAllEntityEmpresas)).subscribe( empresas => {                  
        if (empresas.length>0){
          this.onChangeEmpresa(empresas[0].empresaId)
        }
      })      
    } else {
      this.onChangeEmpresa(this.empresaId)
    }
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }

  toolClicked(tool: string, chacraId: string) {
    const item = this.chacras.find(c => c.chacraId == chacraId);
    switch (tool) {
      case 'AddChacra':
        this.openDialogChacra(FormActionType.Add, null);
        break;
        case 'UpdateChacra':
          this.openDialogChacra(FormActionType.Update, { ...item });
          break;
        case 'DeleteChacra':
          this.openConfirmDialog(
            'Eliminar Chacra',
            `Confirma la eliminación de la chacra ${
              (item as ChacraSegurosSecano).chacraNombre
            }.`,
            new EntityChacrasDeleteRequestAction({
              item: { ...item }
            })
          );
          break;
    }
  }

  onChangeUnidad(unidadId){    
    if (unidadId === -1){
      this.chacras$ = this.empresaId
      ? this.store.pipe(select(selectChacrasByEmpresaId(this.empresaId)))
      : this.store.pipe(select(selectAllEntityChacras));
    } else {
      this.chacras$ = this.store.pipe(select(selectChacrasByUnidadId(unidadId)));            
    }

  }

  onChangeEmpresa(empresaId){
    this.empresaId = empresaId;
    this.chacras$ = this.empresaId
      ? this.store.pipe(select(selectChacrasByEmpresaId(this.empresaId)))
      : this.store.pipe(select(selectAllEntityChacras));

    this.polygons$ = this.store.pipe(
      select(selectAllEntityDibujosByTipo(DibujoCoreType.POLYGON))
    );

    this.store
      .pipe(select(selectAllEntityDibujos))
      .subscribe(dibujos => (this.dibujos = dibujos));

    if (this.empresaId){
      this.store
        .pipe(select(selectUnidadesManejosByEmpresaId(this.empresaId)))
        .subscribe(unidades => {
          this.unidades = unidades;
          this.unidadesCombobox$ = [{unidadId:-1, unidadNombre:'Todos'}, ...unidades];        
        });
    }
  }

  // dialogs

  openDialogChacra(action: FormActionType, chacra: ChacraSegurosSecano) {
    if (!chacra){
      chacra = createEmptyChacraSegurosSecano();
      chacra.empresaId = this.empresaId;
    }     
    const inData: EntityChacrasFormDialogData = {
      chacra,
      action: action,
      dibujos: this.dibujos,
      unidades: this.unidades,
      componentes: this.componentes
    };
    this.dialog.open(EntityChacrasFormDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    });    
  }  

  openConfirmDialog(title: string, question: string, action: any) {
    const inData: ConfirmDialogData = {
      title,
      question,
      result: ConfirmDialogResultType.Cancel
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    });
    dialogRef.afterClosed().subscribe(outData => {
      if (outData && outData.result === ConfirmDialogResultType.Ok) {
        if (action) {
          this.store.dispatch(action);
        }
      }
    });
  }

  openDialogComponente(action: FormActionType, componente) {
    const inData: EntityComponentesFormDialogData = {
      action: action,
      componente: componente,
      ciclos: this.ciclos,
      cultivos: this.cultivos,
      aseguradoras: this.aseguradoras,
      contratoSeguroZP: this.contratoSeguroZP
    };
    this.dialog.open(EntityComponentesFormDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    }); 
  }

  // dibujos

  dibujoCreatedEvent(dibujo: DibujoCore) {
    this.store.dispatch(addDibujo({ dibujo }));
  }

  dibujosDeletedEvent(ids: number[]) {    
    this.store.dispatch(deleteDibujos({ ids }));
  }

  dibujosUpdatedEvent(dibujos: DibujoCore[]) {
    const updates: Update<DibujoCore>[] = dibujos.map(d => ({
      id: d.dibujoId,
      changes: {
        dibujoGeometria: d.dibujoGeometria
      }
    }));
    this.store.dispatch(updateDibujos({ updates }));
  }

  // file

  importDibujos(event: any) {
    const filename = event.target.value.toLowerCase();
    if (filename.indexOf('.zip') === -1) {
      return;
    }
    let name = filename.split('.');
    name = name[0].replace('c:\\fakepath\\', '');
    this.mapCoreService
      .importDibujos(name, event.target.files[0])
      .subscribe(dibujos =>
        dibujos.length > 0
          ? this.store.dispatch(addDibujos({ dibujos }))
          : this.notificationService.warn(
              'No se pudieron cargar las geometrías del archivo seleccionado.'
            )
      );
  }
}
