import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { combineLatest, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  FormActionType,
  DibujoCoreType,
  ConfirmDialogData,
  ConfirmDialogResultType,
  ConfirmDialogComponent,
  MapCoreService,
  createEmptyZonaExclusionCore,
  CHACRAS_FEATURELAYERPROPERTIES,
  SueloCore
} from 'planes-core-lib';

import {
  ChacraSecano,
  createEmptyChacraSecano,
  PlanSecanoEstado
} from 'planes-secano-lib';

import { AppState } from '../../../core/core.state';
import { NotificationService } from '../../../core/notifications/notification.service';
import { LoggingService } from '../../../core/logging/logging.service';
import { FileService } from '../../../core/file/file.service';

import { PlanSecano } from '../../entity-planes/entity-planes.state';
import { ZonaExclusionCore } from '../../entity-zonas-exclusion/entity-zonas-exclusion.state';
import { DibujoCore } from '../../entity-dibujos/entity-dibujos.state';

import { RotacionSecano } from '../../entity-rotaciones/entity-rotaciones.state';
import { ComponenteSecano } from '../../entity-componentes/entity-componentes.state';
import { CultivoSecano } from '../../entity-cultivos/entity-cultivos.state';
import { ManejoSecano } from '../../entity-manejos/entity-manejos.state';
import { RendimientoSecano } from '../../entity-rendimientos/entity-rendimientos.state';

import { selectAllEntityPlanes } from '../../entity-planes/entity-planes.selectors';
import { selectAllEntityChacras } from '../../entity-chacras/entity-chacras.selectors';
import { selectAllEntityDibujos } from '../../entity-dibujos/entity-dibujos.selectors';

import { selectAllEntityZonasExclusion } from '../../entity-zonas-exclusion/entity-zonas-exclusion.selectors';
import { selectAllEntityRotaciones } from '../../entity-rotaciones/entity-rotaciones.selectors';
import { selectAllEntityComponentes } from '../../entity-componentes/entity-component.selectors';
import { selectAllEntityCultivos } from '../../entity-cultivos/entity-cultivos.selectors';
import { selectAllEntityManejos } from '../../entity-manejos/entity-manejos.selectors';
import { selectAllEntityRendimientos } from '../../entity-rendimientos/entity-rendimientos.selectors';
import { selectAllEntitySuelos } from '../../entity-suelos/entity-suelos.selectors';

import {
  EntityChacrasFormDialogData,
  EntityChacrasFormDialogComponent
} from '../../entity-chacras/entity-chacras-form-dialog/entity-chacras-form-dialog.component';

import { EntityChacrasDeleteRequestAction } from '../../entity-chacras/entity-chacras.actions';

import {
  EntityZonasExclusionFormDialogData,
  EntityZonasExclusionFormDialogComponent
} from '../../entity-zonas-exclusion/entity-zonas-exclusion-form-dialog/entity-zonas-exclusion-form-dialog.component';
import { EntityZonasExclusionDeleteRequestAction } from '../../entity-zonas-exclusion/entity-zonas-exclusion.actions';

import {
  addDibujo,
  addDibujos,
  deleteDibujos,
  updateDibujos
} from '../../entity-dibujos/entity-dibujos.actions';

import { chacraSecanoPopupTemplate } from '../vista-mapa.state';

const DIALOG_WIDTH = '320px';
const DIALOG_MAX_HEIGHT = '500px';

@Component({
  selector: 'app-vista-mapa',
  templateUrl: './vista-mapa.component.html',
  styleUrls: ['./vista-mapa.component.scss']
})
export class VistaMapaComponent implements OnInit, OnDestroy {
  // items
  planes: PlanSecano[] = [];
  chacras: ChacraSecano[] = [];
  zonas: ZonaExclusionCore[] = [];
  polygons: DibujoCore[] = [];
  dibujos: DibujoCore[] = [];
  rotaciones: RotacionSecano[] = [];
  componentes: ComponenteSecano[] = [];
  cultivos: CultivoSecano[] = [];
  manejos: ManejoSecano[] = [];
  rendimientos: RendimientoSecano[] = [];
  suelos: SueloCore[] = [];
  // aux
  subscriptions: Subscription[] = [];
  planId: string = null;
  plan: PlanSecano = null;
  chacrasPlan: ChacraSecano[] = [];
  zonasPlan: ZonaExclusionCore[] = [];
  t = {
    btnAddChacra: false,
    btnUpdateChacra: false,
    btnDeleteChacra: false,
    btnAddZona: false,
    btnUpdateZona: false,
    btnDeleteZona: false,
    btnImportDibujos: false
  };
  imageryLayers = [
    {
      title: 'Elevación de terreno (resolución 30 mts.)',
      opacity: 0.9,
      url:
        'http://dgrn.mgap.gub.uy/arcgis/rest/services/GEOCOM/ModeloDigitalTerreno_color/ImageServer',
      visible: false
    }
  ];
  mapImageLayers = [
    {
      title: 'CONEAT',
      opacity: 0.9,
      url:
        'http://dgrn.mgap.gub.uy/arcgis/rest/services/BASE_GCOM/CONEAT/MapServer',
      visible: false
    },
    {
      title: 'Capas de Suelos',
      opacity: 0.9,
      url:
        'http://dgrn.mgap.gub.uy/arcgis/rest/services/BASE_GCOM/Suelos/MapServer',
      visible: false
    },
    {
      title: 'Capas Administrativas',
      opacity: 0.9,
      url:
        'http://dgrn.mgap.gub.uy/arcgis/rest/services/BASE_GCOM/Administrativo/MapServer',
      visible: false
    }
  ];

  chacrasFeatureLayerPopupTemplate(f: any) {
    const div = document.createElement('div');
    div.innerHTML = chacraSecanoPopupTemplate(
      this.chacras.find(c => c.chacraId === f.graphic.attributes.chacraId)
    );
    return div;
  }

  chacrasFeatureLayerProperties = {
    ...CHACRAS_FEATURELAYERPROPERTIES,
    fields: [
      { name: 'chacraId', alias: 'Id', type: 'string' },
      { name: 'chacraNombre', alias: 'Id', type: 'string' }
    ],
    popupTemplate: {
      title: '{chacraNombre} (chacraId)',
      content: this.chacrasFeatureLayerPopupTemplate.bind(this),
      outFields: ['*']
    }
  };

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private loggingService: LoggingService,
    private fileService: FileService,
    private mapCoreService: MapCoreService,
    private dialog: MatDialog
  ) {
    this.planId = this.route.snapshot.paramMap.get('PlanId');
  }

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest(
        this.store.pipe(
          select(selectAllEntityPlanes),
          filter(planes => !!planes)
        ),
        this.store.pipe(select(selectAllEntityRotaciones)),
        this.store.pipe(select(selectAllEntityComponentes)),
        this.store.pipe(select(selectAllEntityCultivos)),
        this.store.pipe(select(selectAllEntityManejos)),
        this.store.pipe(select(selectAllEntityRendimientos)),
        this.store.pipe(select(selectAllEntitySuelos)),
        (
          planes: PlanSecano[],
          rotaciones: RotacionSecano[],
          componentes: ComponenteSecano[],
          cultivos: CultivoSecano[],
          manejos: ManejoSecano[],
          rendimientos: RendimientoSecano[],
          suelos: SueloCore[]
        ) => ({
          planes,
          rotaciones,
          componentes,
          cultivos,
          manejos,
          rendimientos,
          suelos
        })
      ).subscribe(
        (sources: {
          planes: PlanSecano[];
          rotaciones: RotacionSecano[];
          componentes: ComponenteSecano[];
          cultivos: CultivoSecano[];
          manejos: ManejoSecano[];
          rendimientos: RendimientoSecano[];
          suelos: SueloCore[];
        }) => {
          this.planes = sources.planes;
          this.rotaciones = sources.rotaciones;
          this.componentes = sources.componentes;
          this.cultivos = sources.cultivos;
          this.manejos = sources.manejos;
          this.rendimientos = sources.rendimientos;
          this.suelos = sources.suelos;
          if (this.planId) {
            this.planesChange(this.planes.find(p => p.planId === this.planId));
          }
        }
      )
    );

    this.subscriptions.push(
      this.store.select(selectAllEntityChacras).subscribe(chacras => {
        this.chacras = chacras;
        this.planesChange(this.plan);
      })
    );

    this.subscriptions.push(
      this.store.select(selectAllEntityZonasExclusion).subscribe(zonas => {
        this.zonas = zonas;
        this.planesChange(this.plan);
      })
    );

    this.subscriptions.push(
      this.store.select(selectAllEntityDibujos).subscribe(dibujos => {
        this.dibujos = dibujos;
        this.planesChange(this.plan);
      })
    );
  }

  planesChange(plan: PlanSecano) {
    if (!plan) {
      return;
    }
    this.plan = plan;
    this.chacrasPlan = this.chacras.filter(c => c.planId === this.plan.planId);
    this.zonasPlan = this.zonas.filter(z => this.planId === z.planId);
    this.polygons = this.dibujos.filter(
      d => d.dibujoTipo === DibujoCoreType.POLYGON
    );

    this.updateTemplate();
  }

  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  // handlers

  toolClicked(tool: string, id: string) {
    let item = null;
    if (tool.endsWith('Chacra')) {
      item = this.chacras.find(c => c.chacraId === id);
    } else {
      item = this.zonas.find(z => z.zonaExclusionId === id);
    }
    switch (tool) {
      case 'AddChacra':
        this.openDialogChacra(FormActionType.Add, createEmptyChacraSecano());
        break;
      case 'UpdateChacra':
        this.openDialogChacra(FormActionType.Update, { ...item });
        break;
      case 'DeleteChacra':
        this.openConfirmDialog(
          'Eliminar Chacra',
          `Confirma la eliminación de la chacra ${
            (item as ChacraSecano).chacraNombre
          }.`,
          new EntityChacrasDeleteRequestAction({
            item: { ...item }
          })
        );
        break;
      case 'AddZona':
        this.openDialogZona(FormActionType.Add, createEmptyZonaExclusionCore());
        break;
      case 'UpdateZona':
        this.openDialogZona(FormActionType.Update, { ...item });
        break;
      case 'DeleteZona':
        this.openConfirmDialog(
          'Eliminar Zona de Exclusión',
          `Confirma la eliminación de la zona de exclusión ${
            (item as ZonaExclusionCore).zonaExclusionId
          }.`,
          new EntityZonasExclusionDeleteRequestAction({
            item: { ...item }
          })
        );
        break;
    }
  }

  // dialogs

  openDialogChacra(action: FormActionType, chacra: ChacraSecano) {
    chacra.planId = this.plan.planId;
    const inData: EntityChacrasFormDialogData = {
      chacra,
      action: action,
      dibujos: this.dibujos,
      suelos: this.suelos
    };
    this.dialog.open(EntityChacrasFormDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    });
  }

  openDialogZona(action: FormActionType, zona: ZonaExclusionCore) {
    zona.planId = this.plan.planId;
    const inData: EntityZonasExclusionFormDialogData = {
      zona,
      action: action,
      polygons: this.dibujos
    };
    this.dialog.open(EntityZonasExclusionFormDialogComponent, {
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

  // template parameters

  updateTemplate() {
    const edit = this.plan && this.plan.planEstado === PlanSecanoEstado.EDICION;
    this.t = {
      btnAddChacra: edit && this.polygons && this.polygons.length > 0,
      btnUpdateChacra: edit,
      btnDeleteChacra: edit,
      btnAddZona: edit && this.polygons && this.polygons.length > 0,
      btnUpdateZona: edit,
      btnDeleteZona: edit,
      btnImportDibujos: false
    };
  }
}
