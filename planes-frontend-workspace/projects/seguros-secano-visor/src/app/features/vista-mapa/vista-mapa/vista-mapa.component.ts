import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
  FormActionType,
  createEmptyChacraCore,
  DibujoCoreType,
  EmpresaCore
} from 'planes-core-lib';

import {
  ChacraSegurosSecano,
  createEmptyChacraSegurosSecano,
  UnidadManejoSegurosSecano
} from 'seguros-secano-lib';

import { MapCoreService } from 'projects/planes-core-lib/src/lib/map-core/map-core.service';

import { AppState } from '../../../core/core.state';
import { NotificationService } from '../../../core/notifications/notification.service';
import { LoggingService } from '../../../core/logging/logging.service';
import { FileService } from '../../../core/file/file.service';

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
  selectChacrasByEmpresaId
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

const DIALOG_WIDTH = '300px';
const DIALOG_MAX_HEIGHT = '500px';

@Component({
  selector: 'app-vista-mapa',
  templateUrl: './vista-mapa.component.html',
  styleUrls: ['./vista-mapa.component.scss']
})
export class VistaMapaComponent implements OnInit {
  empresaId: string = null;
  empresas$: Observable<EmpresaCore[]>;

  unidades: UnidadManejoSegurosSecano[] = [];

  chacras$: Observable<ChacraSegurosSecano[]>;

  polygons$: Observable<DibujoCore[]>;
  dibujos: DibujoCore[];

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private loggingService: LoggingService,
    private fileService: FileService,
    private mapCoreService: MapCoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.empresaId = this.route.snapshot.paramMap.get('EmpresaId');

    this.empresas$ = this.empresaId
      ? this.store.pipe(
          select(selectEmpresaById(this.empresaId)),
          map(p => [p])
        )
      : this.store.pipe(select(selectAllEntityEmpresas));

    this.chacras$ = this.empresaId
      ? this.store.pipe(select(selectChacrasByEmpresaId(this.empresaId)))
      : this.store.pipe(select(selectAllEntityChacras));

    this.polygons$ = this.store.pipe(
      select(selectAllEntityDibujosByTipo(DibujoCoreType.POLYGON))
    );

    this.store
      .pipe(select(selectAllEntityDibujos))
      .subscribe(dibujos => (this.dibujos = dibujos));

    this.store
      .pipe(select(selectUnidadesManejosByEmpresaId(this.empresaId)))
      .subscribe(unidades => (this.unidades = unidades));
  }

  toolClicked(tool: string, chacraId: number) {
    switch (tool) {
      case 'AddChacra':
        this.openDialogChacra(FormActionType.Add);
        break;
      case 'UpdateChacra':
        this.notificationService.default(
          `[No implementado] Update Chacra ${chacraId}`
        );
        break;
      case 'DeleteChacra':
        this.notificationService.default(
          `[No implementado] Delete Chacra ${chacraId}`
        );
        break;
    }
  }

  // dialogs

  openDialogChacra(action: FormActionType) {
    const chacra = createEmptyChacraSegurosSecano();
    chacra.empresaId = this.empresaId;
    const inData: EntityChacrasFormDialogData = {
      chacra,
      action: action,
      dibujos: this.dibujos,
      unidades: this.unidades
    };
    this.dialog.open(EntityChacrasFormDialogComponent, {
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
    console.log(ids);
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
