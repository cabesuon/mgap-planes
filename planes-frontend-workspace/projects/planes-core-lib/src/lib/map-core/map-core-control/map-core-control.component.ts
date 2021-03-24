import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { Observable, from } from 'rxjs';

import esri = __esri;

import { ChacraCore } from '../../chacras-core/chacras-core.model';
import { ZonaExclusionCore } from '../../zonas-exclusion-core/zonas-exclusion-core.model';
import {
  DibujoCore,
  geometryTypeToDibujoCoreType,
  DibujoCoreType
} from '../../dibujos-core/dibujos-core.model';

import { EsriModulesService } from '../esri-modules.service';
import {
  FeatureLayerProperties,
  ImageryLayerProperties,
  MapImageLayerProperties,
  MapProperties,
  MapViewProperties,
  CHACRAS_FEATURELAYERPROPERTIES,
  CHACRAS_SYMBOLS,
  PENDIENTES_FEATURELAYERPROPERTIES,
  PENDIENTES_SYMBOLS,
  ZONAS_FEATURELAYERPROPERTIES,
  ZONAS_SYMBOLS,
  DIBUJOS_SYMBOLS,
  CIRCLE_SYMBOLS,
  OBJECTID,
  SKETCH_AVAILABLE_CREATE_TOOLS
} from '../map-core.model';
import { MapCoreService } from '../map-core.service';

const METER = 9001;
const KILOMETER = 9036;

export interface InputFeatureLayer {
  source: Observable<any[]>;
  featureLayerProperties: FeatureLayerProperties;
}

export interface InputImageryLayer {
  imageryLayerProperties: ImageryLayerProperties;
}

export interface InputMapImageLayer {
  mapImageLayerProperties: MapImageLayerProperties;
}

@Component({
  selector: 'lib-map-core-control',
  templateUrl: './map-core-control.component.html',
  styleUrls: ['./map-core-control.component.css']
})
export class MapCoreControlComponent implements OnInit, OnDestroy {
  // node reference
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
  @ViewChild('measurementNode', { static: true })
  private measurementEl: ElementRef;
  @ViewChild('searchPadronNode', { static: true })
  private searchPadronEl: ElementRef;
  // variables
  loaded = false;
  private map: esri.Map = null;
  private view: esri.MapView = null;

  private chacrasFeatureLayer: esri.FeatureLayer = null;
  private lastChacrasAddFeatureEditResults: esri.FeatureEditResult[] = [];
  private zonasFeatureLayer: esri.FeatureLayer = null;
  private lastZonasAddFeatureEditResults: esri.FeatureEditResult[] = [];
  private pendientesFeatureLayer: esri.FeatureLayer = null;
  private lastPendientesAddFeatureEditResults: esri.FeatureEditResult[] = [];

  private padronesGraphicsLayer: esri.GraphicsLayer = null;

  private dibujosGraphicsLayer: esri.GraphicsLayer = null;
  private dicDibujosLabels: { [id: number]: esri.Graphic } = {};
  private circleGraphicsLayer: esri.GraphicsLayer = null;

  private circleRadioLine: esri.Graphic = null;
  private circleRadioText: esri.Graphic = null;

  searchPadronCountResult: number = 0;
  searchPadronTextResult: string = null;

  // esri modules
  private esri = {
    geometry: {
      Extent: null,
      geometryEngine: null,
      Point: null,
      Polygon: null,
      Polyline: null,
      support: { webMercatorUtils: null }
    },
    Graphic: null,
    layers: {
      FeatureLayer: null,
      GraphicsLayer: null,
      ImageryLayer: null,
      MapImageLayer: null,
      support: {
        LabelClass: null
      }
    },
    Map: null,
    symbols: {
      SimpleFillSymbol: null,
      SimpleLineSymbol: null
    },
    tasks: {
      QueryTask: null,
      support: {
        Query: null
      }
    },
    views: { MapView: null },
    widgets: {
      CoordinateConversion: null,
      Expand: null,
      LayerList: null,
      Legend: null,
      Measurement: null,
      ScaleBar: null,
      Sketch: null,
      SketchViewModel: null
    }
  };

  // output
  @Output() loadingEvent = new EventEmitter<boolean>();
  @Output() dibujoCreatedEvent = new EventEmitter<DibujoCore>();
  @Output() dibujosUpdatedEvent = new EventEmitter<DibujoCore[]>();
  @Output() dibujosDeletedEvent = new EventEmitter<number[]>();

  // input properties
  private _mapViewProperties: MapViewProperties = {
    zoom: 7,
    center: [-56, -34],
    popup: {
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: false,
        breakpoint: false
      }
    }
  };

  private _mapProperties: MapProperties = {
    basemap: 'hybrid'
  };

  private _imageryLayers: InputImageryLayer[] = [];

  private _mapImageLayers: InputMapImageLayer[] = [];

  private _featureLayers: InputFeatureLayer[] = [];

  private _chacras: ChacraCore[] = [];

  private _zonas: ZonaExclusionCore[] = [];

  private _dibujos: DibujoCore[] = [];

  private _sketchAvailableCreateTools: string[] = SKETCH_AVAILABLE_CREATE_TOOLS;

  /*
   * INPUTS
   */
  // map and view
  @Input()
  set mapViewProperties(props: MapViewProperties) {
    this._mapViewProperties = props;
  }
  get mapViewProperties(): MapViewProperties {
    return this._mapViewProperties;
  }
  @Input()
  set mapProperties(props: MapProperties) {
    this._mapProperties = props;
  }
  get mapProperties(): MapProperties {
    return this._mapProperties;
  }

  // imagery layers
  @Input()
  set imageryLayers(layers: InputImageryLayer[]) {
    this._imageryLayers = layers;
  }
  get imageryLayers(): InputImageryLayer[] {
    return this._imageryLayers;
  }

  // map image layers
  @Input()
  set mapImageLayers(layers: InputMapImageLayer[]) {
    this._mapImageLayers = layers;
  }
  get mapImageLayers(): InputMapImageLayer[] {
    return this._mapImageLayers;
  }
  // feature layers
  @Input()
  set featureLayers(layers: InputFeatureLayer[]) {
    this._featureLayers = layers;
  }
  get featureLayers(): InputFeatureLayer[] {
    return this._featureLayers;
  }
  // chacras
  @Input()
  set chacrasCore(chacrasCore: ChacraCore[]) {
    this._chacras = chacrasCore || [];
    if (this.chacrasFeatureLayer && this.pendientesFeatureLayer) {
      this.updateChacras();
    }
  }
  get chacrasCore() {
    return this._chacras;
  }
  @Input() chacrasFeatureLayerProperties: any = null;
  @Input() includePendientes: boolean = true;
  // zonas exclusion
  @Input() includeZonasExclusion: boolean = true;
  @Input()
  set zonasExclusionCore(zonasExclusionCore: ZonaExclusionCore[]) {
    this._zonas = zonasExclusionCore || [];
    if (this.zonasFeatureLayer) {
      this.updateZonas();
    }
  }
  get zonasExclusionCore() {
    return this._zonas;
  }
  // dibujos
  @Input()
  set dibujosCore(dibujosCore: DibujoCore[]) {
    this._dibujos = dibujosCore || [];
    if (this.dibujosGraphicsLayer) {
      this.updateDibujos();
    }
  }
  get dibujosCore(): DibujoCore[] {
    return this._dibujos;
  }
  // widgets
  @Input()
  set sketchAvailableCreateTools(tools: string[]) {
    this._sketchAvailableCreateTools = tools || SKETCH_AVAILABLE_CREATE_TOOLS;
  }
  get sketchAvailableCreateTools(): string[] {
    return this._sketchAvailableCreateTools;
  }

  measurement: esri.Measurement = null;

  constructor(
    private esriModulesService: EsriModulesService,
    private mapCoreService: MapCoreService
  ) {}

  initMap() {
    this.map = new this.esri.Map(this.mapProperties);

    const mapViewProperties: esri.MapViewProperties = {
      container: this.mapViewEl.nativeElement,
      map: this.map,
      ...this.mapViewProperties
    };

    this.view = new this.esri.views.MapView(mapViewProperties);
  }

  initImageryLayers() {
    for (const l of this.imageryLayers) {
      this.map.add(new this.esri.layers.ImageryLayer(l));
    }
  }

  initMapImageLayers() {
    for (const l of this.mapImageLayers) {
      this.map.add(new this.esri.layers.MapImageLayer(l));
    }
  }

  initFeatureLayers() {
    // init Chacras
    this.chacrasFeatureLayer = new this.esri.layers.FeatureLayer({
      ...CHACRAS_FEATURELAYERPROPERTIES,
      ...this.chacrasFeatureLayerProperties,
      source: []
    });
    // init Pendientes
    if (this.includePendientes) {
      this.pendientesFeatureLayer = new this.esri.layers.FeatureLayer({
        ...PENDIENTES_FEATURELAYERPROPERTIES,
        source: []
      });
    }

    this.updateChacras();

    this.map.add(this.chacrasFeatureLayer);

    // init Zonas
    if (this.includeZonasExclusion) {
      this.zonasFeatureLayer = new this.esri.layers.FeatureLayer({
        ...ZONAS_FEATURELAYERPROPERTIES,
        source: []
      });
      this.updateZonas();
      this.map.add(this.zonasFeatureLayer);
    }

    if (this.includePendientes) {
      this.map.add(this.pendientesFeatureLayer);
    }
  }

  initGraphicsLayer() {
    this.padronesGraphicsLayer = new this.esri.layers.GraphicsLayer({
      listMode: 'hide'
    });
    this.map.add(this.padronesGraphicsLayer);
    this.circleRadioLine = new this.esri.Graphic({
      symbol: CIRCLE_SYMBOLS.line
    });
    this.circleRadioText = new this.esri.Graphic({
      symbol: CIRCLE_SYMBOLS.text
    });

    this.circleGraphicsLayer = new this.esri.layers.GraphicsLayer({
      listMode: 'hide'
    });
    this.circleGraphicsLayer.addMany([
      this.circleRadioLine,
      this.circleRadioText
    ]);
    this.map.add(this.circleGraphicsLayer);

    this.dibujosGraphicsLayer = new this.esri.layers.GraphicsLayer({
      title: 'Dibujos'
    });
    this.map.add(this.dibujosGraphicsLayer);

    this.updateDibujos();
  }

  initWidgets() {
    const self = this; // <- dumb
    // legend
    const legend = new this.esri.widgets.Legend({
      view: this.view,
      layerInfos: [
        {
          layer: this.chacrasFeatureLayer,
          title: 'Chacras'
        },
        {
          layer: this.zonasFeatureLayer,
          title: 'Zonas de Exclusión'
        },
        {
          layer: this.pendientesFeatureLayer,
          title: 'Pendientes'
        }
      ]
    });
    const legendExpand = new this.esri.widgets.Expand({
      expandIconClass: 'esri-icon-legend',
      view: this.view,
      expandTooltip: 'Ver Leyenda',
      collapseTooltip: 'Ocultar Leyenda',
      content: legend
    });
    this.view.ui.add(legendExpand, 'top-left');
    // layerlist
    const layerList = new this.esri.widgets.LayerList({
      view: this.view,
      listItemCreatedFunction: function(event) {
        if (!event.item.parent) {
          event.item.actionsSections = [
            [
              {
                title: 'Aumentar opacidad',
                className: 'esri-icon-up',
                id: 'increase-opacity'
              },
              {
                title: 'Disminuir opacidad',
                className: 'esri-icon-down',
                id: 'decrease-opacity'
              }
            ]
          ];
        }
      }
    });
    const layerListExpand = new this.esri.widgets.Expand({
      expandIconClass: 'esri-icon-layer-list',
      view: this.view,
      expandTooltip: 'Ver Contenidos',
      collapseTooltip: 'Ocultar Contenidos',
      content: layerList
    });
    this.view.ui.add(layerListExpand, 'top-left');
    layerList.on('trigger-action', function(event) {
      switch (event.action.id) {
        case 'increase-opacity':
          if (event.item.layer.opacity < 1) {
            event.item.layer.opacity += 0.1;
          }
          break;
        case 'decrease-opacity':
          if (event.item.layer.opacity > 0) {
            event.item.layer.opacity -= 0.1;
          }
          break;
      }
    });
    // search padron
    this.view.ui.add(
      new this.esri.widgets.Expand({
        view: this.view,
        expandIconClass: 'esri-icon-search',
        expandTooltip: 'Ver Búsqueda de Padrones',
        collapseTooltip: 'Ocultar Búsqueda de Padrones',
        content: this.searchPadronEl.nativeElement
      }),
      'top-left'
    );
    // coordinate conversion
    const coordinate = new this.esri.widgets.CoordinateConversion({
      view: this.view
    });
    this.view.ui.add(coordinate, 'bottom-left');
    setTimeout(function() {
      coordinate.formats = coordinate.formats.filter(
        f => f.name === 'utm' || f.name === 'xy'
      );
    }, 500);
    // measurement
    const measurement = new this.esri.widgets.Measurement({
      view: this.view
    });
    this.measurement = measurement;
    this.view.ui.add(this.measurement, 'bottom-left');
    const measurementExpand = new this.esri.widgets.Expand({
      expandIconClass: 'esri-icon-measure',
      view: this.view,
      expandTooltip: 'Ver Herramientas de Medición',
      collapseTooltip: 'Ocultar Herramientas de Edición',
      content: this.measurementEl.nativeElement
    });
    this.view.ui.add(measurementExpand, 'top-left');
    this.measurement.viewModel.watch('activeViewModel', function(
      activeViewModel:
        | __esri.DistanceMeasurement2DViewModel
        | __esri.AreaMeasurement2DViewModel
    ) {
      if (!activeViewModel) {
        return;
      }
      if (measurement.activeTool === 'distance') {
        measurement.viewModel.linearUnit = 'kilometers';
        activeViewModel.unitOptions = (activeViewModel.unitOptions as __esri.SystemOrLengthUnit[]).filter(
          u => u === 'meters' || u === 'kilometers'
        );
      } else if (measurement.activeTool === 'area') {
        measurement.viewModel.areaUnit = 'square-kilometers';
        activeViewModel.unitOptions = (activeViewModel.unitOptions as __esri.SystemOrAreaUnit[]).filter(
          u => u === 'square-meters' || u === 'square-kilometers'
        );
      }
    });
    // sketch
    const sketch = new this.esri.widgets.Sketch({
      layer: this.dibujosGraphicsLayer,
      view: this.view,
      availableCreateTools: this.sketchAvailableCreateTools
    });
    const sketchExpand = new this.esri.widgets.Expand({
      expandIconClass: 'esri-icon-edit',
      view: this.view,
      expandTooltip: 'Ver Herramientas de Edición',
      collapseTooltip: 'Ocultar Herramientas de Edición',
      content: sketch
    });
    this.view.ui.add(sketchExpand, 'top-left');
    sketch.on('create', function(event) {
      self.onDibujoCreate(event);
    });
    sketch.on('delete', function(event) {
      self.onDibujoDelete(event);
    });
    sketch.on('update', function(event) {
      self.onDibujoUpdate(event);
    });
    // scalebar
    const scaleBar = new this.esri.widgets.ScaleBar({
      view: this.view,
      unit: 'metric',
      ruler: 'ruler'
    });
    this.view.ui.add(scaleBar, {
      position: 'bottom-left'
    });
  }

  ngOnInit() {
    this.loadingEvent.emit(true);
    this.esriModulesService
      .load([
        'esri/Map',
        'esri/views/MapView',

        'esri/geometry/Extent',
        'esri/geometry/geometryEngine',
        'esri/geometry/Point',
        'esri/geometry/Polygon',
        'esri/geometry/Polyline',
        'esri/geometry/support/webMercatorUtils',

        'esri/Graphic',

        'esri/layers/FeatureLayer',
        'esri/layers/GraphicsLayer',
        'esri/layers/ImageryLayer',
        'esri/layers/MapImageLayer',
        'esri/layers/support/LabelClass',

        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleLineSymbol',

        'esri/tasks/QueryTask',
        'esri/tasks/support/Query',

        'esri/widgets/CoordinateConversion',
        'esri/widgets/Expand',
        'esri/widgets/LayerList',
        'esri/widgets/Legend',
        'esri/widgets/Measurement',
        'esri/widgets/Sketch',
        'esri/widgets/ScaleBar'
      ])
      .subscribe(modules => {
        [
          this.esri.Map,
          this.esri.views.MapView,

          this.esri.geometry.Extent,
          this.esri.geometry.geometryEngine,
          this.esri.geometry.Point,
          this.esri.geometry.Polygon,
          this.esri.geometry.Polyline,
          this.esri.geometry.support.webMercatorUtils,

          this.esri.Graphic,

          this.esri.layers.FeatureLayer,
          this.esri.layers.GraphicsLayer,
          this.esri.layers.ImageryLayer,
          this.esri.layers.MapImageLayer,
          this.esri.layers.support.LabelClass,

          this.esri.symbols.SimpleFillSymbol,
          this.esri.symbols.SimpleLineSymbol,

          this.esri.tasks.QueryTask,
          this.esri.tasks.support.Query,

          this.esri.widgets.CoordinateConversion,
          this.esri.widgets.Expand,
          this.esri.widgets.LayerList,
          this.esri.widgets.Legend,
          this.esri.widgets.Measurement,
          this.esri.widgets.Sketch,
          this.esri.widgets.ScaleBar
        ] = modules;

        this.initMap();
        this.initImageryLayers();
        this.initMapImageLayers();
        this.initFeatureLayers();
        this.initGraphicsLayer();
        this.initWidgets();

        this.view.when(_ => {
          this.loadingEvent.emit(false);
          this.loaded = true;
        });
      });
  }

  ngOnDestroy() {
    if (this.view) {
      this.view.container = null;
    }
  }

  private chacraCoreAttributes(c: ChacraCore): any {
    return {
      chacraId: c.chacraId,
      chacraNro: c.chacraNro,
      chacraNombre: c.chacraNombre,
      chacraLocalidad: c.chacraLocalidad,
      chacraArea: c.chacraArea,
      chacraDicose: c.chacraDicose,

      planId: c.planId,

      padrones: JSON.stringify(c.padrones),

      chacraFactorLSEsManual: c.chacraFactorLSEsManual,
      chacraFactorLSGeometriaAsignado: c.chacraFactorLSGeometriaAsignado,
      chacraFactorLSGeometriaLimitante: c.chacraFactorLSGeometriaLimitante,
      chacraFactorLSAsignado: c.chacraFactorLSAsignado,
      chacraFactorLSLimitante: c.chacraFactorLSLimitante,

      chacraSueloLimitanteFactorK: c.chacraSueloLimitanteFactorK,
      chacraSueloAsignadoId: c.chacraSueloAsignadoId,
      chacraSueloLimitanteId: c.chacraSueloLimitanteId,
      chacraSueloAsignadoDsc: c.chacraSueloAsignadoDsc,
      chacraSueloAsignadoFactorK: c.chacraSueloAsignadoFactorK,
      chacraSueloAsignadoTolerancia: c.chacraSueloAsignadoTolerancia,
      chacraSueloLimitanteDsc: c.chacraSueloLimitanteDsc,
      chacraSueloLimitanteTolerancia: c.chacraSueloLimitanteTolerancia,
      chacraSueloAsignadoSlopeMax: c.chacraSueloAsignadoSlopeMax,
      chacraSueloAsignadoSlopeMin: c.chacraSueloAsignadoSlopeMin,
      chacraSueloLimitanteSlopeMax: c.chacraSueloLimitanteSlopeMax,
      chacraSueloLimitanteSlopeMin: c.chacraSueloLimitanteSlopeMin,

      chacraLargoAsignado: c.chacraLargoAsignado,
      chacraLargoLimitante: c.chacraLargoLimitante,
      chacraPendienteAsignado: c.chacraPendienteAsignado,
      chacraPendienteLimitante: c.chacraPendienteLimitante
    };
  }

  private chacraCoreToGraphic(chacraCore: ChacraCore): esri.Graphic {
    if (!chacraCore) {
      return null;
    }
    const geometry = this.jsonToGeometry(chacraCore.chacraGeometria, true);
    return new this.esri.Graphic({
      geometry,
      attributes: {
        ...this.chacraCoreAttributes(chacraCore),
        OBJECTID: this.mapCoreService.nextId()
      }
    });
  }

  private pendienteCoreToGraphic(chacraCore: ChacraCore): esri.Graphic {
    if (!chacraCore || !chacraCore.chacraFactorLSGeometriaAsignado) {
      return null;
    }
    const geometry = this.jsonToGeometry(
      chacraCore.chacraFactorLSGeometriaAsignado,
      true
    );
    return new this.esri.Graphic({
      geometry,
      // ver atributos que van en feature pendiente
      attributes: { ...chacraCore, OBJECTID: this.mapCoreService.nextId() }
    });
  }

  private updateChacras() {
    if (!this.chacrasCore || !this.chacrasFeatureLayer) {
      return;
    }

    const chacrasAddFeatures = this.chacrasCore.map(c =>
      this.chacraCoreToGraphic(c)
    );

    this.applyEditsFeatureLayer(
      this.chacrasFeatureLayer,
      chacrasAddFeatures,
      [],
      this.lastChacrasAddFeatureEditResults
    ).subscribe(results => {
      this.lastChacrasAddFeatureEditResults = results.addFeatureResults;
      if (
        this.view &&
        this.chacrasCore.length > 0 &&
        this.featureEditResultsToBoolean(results.addFeatureResults) &&
        this.featureEditResultsToBoolean(results.deleteFeatureResults)
      ) {
        const ext = this.mapCoreService.unionExtents(
          chacrasAddFeatures.map(f => {
            return f.geometry.extent;
          })
        );
        if (ext) {
          this.view.extent = this.esri.geometry.support.webMercatorUtils.geographicToWebMercator(
            ext.expand(2)
          );
        }
      }
    });

    if (!this.pendientesFeatureLayer) {
      return;
    }

    const pendientesAddFeatures = this._chacras
      .filter(c => c.chacraFactorLSGeometriaAsignado)
      .map(c => this.pendienteCoreToGraphic(c));

    this.applyEditsFeatureLayer(
      this.pendientesFeatureLayer,
      pendientesAddFeatures,
      [],
      this.lastPendientesAddFeatureEditResults
    ).subscribe(
      results =>
        (this.lastPendientesAddFeatureEditResults = results.addFeatureResults)
    );
  }

  private zonaExclusionCoreToGraphic(
    zonaExclusionCore: ZonaExclusionCore
  ): esri.Graphic {
    if (!zonaExclusionCore) {
      return null;
    }
    const geometry = this.jsonToGeometry(
      zonaExclusionCore.zonaExclusionGeometria,
      true
    );
    return new this.esri.Graphic({
      geometry,
      // ver que atributos van en el feature zona
      attributes: {
        ...zonaExclusionCore,
        OBJECTID: this.mapCoreService.nextId()
      }
    });
  }

  private updateZonas() {
    if (!this.zonasExclusionCore || !this.zonasFeatureLayer) {
      return;
    }

    const zonasAddFeatures = this.zonasExclusionCore.map(c =>
      this.zonaExclusionCoreToGraphic(c)
    );

    this.applyEditsFeatureLayer(
      this.zonasFeatureLayer,
      zonasAddFeatures,
      [],
      this.lastZonasAddFeatureEditResults
    ).subscribe(
      results =>
        (this.lastZonasAddFeatureEditResults = results.addFeatureResults)
    );
  }

  private clearDibujos() {
    this.dibujosGraphicsLayer.graphics.removeAll();
    this.dicDibujosLabels = {};
  }

  private addDibujos() {
    const graphics = [];
    let geometry, symbol, graphic, label;
    for (const d of this.dibujosCore) {
      if (d.dibujoTipo === DibujoCoreType.POLYGON) {
        geometry = this.jsonToGeometry(d.dibujoGeometria, false);
        symbol = DIBUJOS_SYMBOLS.fill;
      } else {
        geometry = this.jsonToGeometry(d.dibujoGeometria, false);
        symbol = DIBUJOS_SYMBOLS.line;
      }
      graphic = new this.esri.Graphic({
        geometry,
        attributes: {
          DibujoId: d.dibujoId,
          OBJECTID: this.mapCoreService.nextId()
        },
        symbol
      });
      graphics.push(graphic);
      label = this.createGraphicText(graphic.geometry, d.dibujoId);
      this.dicDibujosLabels[d.dibujoId] = label;
      graphics.push(label);
    }
    this.dibujosGraphicsLayer.graphics.addMany(graphics);
  }

  private updateDibujos() {
    this.clearDibujos();
    this.addDibujos();
  }

  // graphic operations

  private geometryLabelPoint(geometry: esri.Geometry): esri.Point {
    const buff = this.esri.geometry.geometryEngine.geodesicBuffer(
      geometry,
      100,
      METER,
      true
    ) as esri.Polygon;
    return buff.centroid;
  }

  // sketch operations

  private updateCreatedGraphic(g: esri.Graphic, id: number) {
    // set id
    g.attributes = { DibujoId: id };
    // set symbol
    let symbol;
    switch (g.geometry.type) {
      case 'polygon':
        symbol = { ...DIBUJOS_SYMBOLS.fill };
        delete symbol['type'];
        g.symbol = this.esri.symbols.SimpleFillSymbol();
        break;
      case 'polyline':
        symbol = { ...DIBUJOS_SYMBOLS.line };
        delete symbol['type'];
        g.symbol = this.esri.symbols.SimpleLineSymbol(DIBUJOS_SYMBOLS.line);
        break;
    }
  }

  private createGraphicText(geometry: esri.Geometry, id: number): esri.Graphic {
    return new this.esri.Graphic({
      geometry: this.geometryLabelPoint(geometry),
      symbol: {
        ...DIBUJOS_SYMBOLS.text,
        text: id
      }
    });
  }

  private updateCircleLabel(vertices: number[][]) {
    this.circleRadioLine.geometry = new this.esri.geometry.Polyline({
      paths: [vertices],
      spatialReference: this.view.spatialReference
    });
    // Recalculate the polyline length and buffer polygon
    const length = this.esri.geometry.geometryEngine.geodesicLength(
      this.circleRadioLine.geometry,
      KILOMETER
    );
    // Update label graphic to show the length of the polyline
    this.circleRadioText.geometry = new this.esri.geometry.Point({
      x: vertices[0][0] + (vertices[1][0] - vertices[0][0]) / 2,
      y: vertices[0][1] + (vertices[1][1] - vertices[0][1]) / 2,
      spatialReference: this.view.spatialReference
    });
    (this.circleRadioText.symbol as esri.TextSymbol).text = `${length.toFixed(
      2
    )} km`;
  }

  // sketch events

  onDibujoCreate(event) {
    if (event.state === 'complete') {
      if (event.tool === 'circle') {
        // clear circle
        this.circleRadioLine.geometry = null;
        this.circleRadioText.geometry = null;
        (this.circleRadioText.symbol as esri.TextSymbol).text = '';
      }
      // emit
      const id = this.mapCoreService.nextId();
      this.dibujoCreatedEvent.emit({
        dibujoId: id,
        dibujoGeometria: JSON.stringify(event.graphic.geometry.toJSON()),
        dibujoTipo: geometryTypeToDibujoCoreType(event.graphic.geometry.type)
      });
    } else if (
      event.state === 'active' &&
      event.tool === 'circle' &&
      event.toolEventInfo &&
      event.toolEventInfo.type === 'cursor-update'
    ) {
      this.updateCircleLabel([
        [event.graphic.geometry.centroid.x, event.graphic.geometry.centroid.y],
        event.toolEventInfo.coordinates
      ]);
    }
  }

  onDibujoDelete(event) {
    const deleted = event.graphics.map(
      (g: esri.Graphic) => g.attributes.DibujoId
    );
    this.dibujosGraphicsLayer.graphics.removeMany(
      event.graphics.filter((g: esri.Graphic) =>
        this.dicDibujosLabels.hasOwnProperty(g.attributes.DibujoId)
      )
    );
    this.dibujosDeletedEvent.emit(deleted);
  }

  onDibujoUpdate(event) {
    if (event.state === 'complete' && !event.aborted) {
      if (
        event.tool === 'transform' ||
        event.tool === 'reshape' ||
        event.tool === 'move'
      ) {
        this.dibujosUpdatedEvent.emit(
          event.graphics.map((g: esri.Graphic) => ({
            DibujoId: g.attributes.DibujoId,
            DibujoGeometria: JSON.stringify(g.geometry.toJSON()),
            DibujoTipo: geometryTypeToDibujoCoreType(g.geometry.type)
          }))
        );
      }
    }
  }

  // graphics layer operations

  private clearGraphicsGraphicsLayer(layer: esri.GraphicsLayer) {
    layer.removeAll();
  }

  private addGraphicsGraphicsLayer(
    layer: esri.GraphicsLayer,
    graphics: esri.Graphic[]
  ) {
    layer.addMany(graphics);
  }

  // feature layer operations

  private clearFeaturesFeatureLayer(layer: esri.FeatureLayer): Observable<any> {
    const deleteFeatures: any[] = layer.source
      .toArray()
      .map(f => ({ objectId: f.attributes[OBJECTID] }));
    return from(
      layer.applyEdits({
        deleteFeatures
      })
    );
  }

  private applyEditsFeatureLayer(
    layer: esri.FeatureLayer,
    addFeatures: esri.Graphic[],
    updateFeatures: esri.Graphic[],
    deleteFeatures: esri.Graphic[] | object[]
  ): Observable<any> {
    return from(
      layer.applyEdits({
        addFeatures,
        updateFeatures,
        deleteFeatures
      })
    );
  }

  private featureEditResultsToBoolean(
    results: esri.FeatureEditResult[]
  ): boolean {
    return results.reduce((p, c) => p && !c.error, true);
  }

  private jsonToGeometry(
    json: string | object,
    toGeographic: boolean
  ): esri.Geometry {
    const obj = this.mapCoreService.jsonParse(json);
    if (!obj) {
      return null;
    }
    let geometry: esri.Geometry = null;
    if (obj.hasOwnProperty('rings')) {
      geometry = this.esri.geometry.Polygon.fromJSON(obj);
    } else if (obj.hasOwnProperty('paths')) {
      geometry = this.esri.geometry.Polyline.fromJSON(obj);
    } else {
      geometry = this.esri.geometry.Point.fromJSON(obj);
    }
    if (toGeographic && !geometry.spatialReference.isWGS84) {
      geometry = this.esri.geometry.support.webMercatorUtils.webMercatorToGeographic(
        geometry
      );
    }
    return geometry;
  }

  // measurement operations

  onMeasureDistanceClick() {
    this.measurement.activeTool = 'distance';
  }

  onMeasureAreaClick() {
    this.measurement.activeTool = 'area';
  }

  onClearMeasureClick() {
    this.measurement.clear();
  }

  // search padron

  searchPadronBuscarClick() {
    const d = this.searchPadronEl.nativeElement.querySelector('select');
    const p = this.searchPadronEl.nativeElement.querySelector('input');
    if (d && d.value && p && p.value) {
      this.searchPadronClearClick();
      const qt = new this.esri.tasks.QueryTask({
        url:
          'http://dgrn.mgap.gub.uy/arcgis/rest/services/BASE_GCOM/Administrativo/MapServer/0'
      });
      const q = new this.esri.tasks.support.Query({
        returnGeometry: true,
        outFields: ['*'],
        where: `DEPTO='${d.value}' AND PADRON=${p.value}`,
        outSpatialReference: this.view.spatialReference.clone()
      });
      this.loadingEvent.emit(true);
      qt.execute(q)
        .then(r => {
          if (r.features) {
            r.features.forEach(f => {
              f.symbol = new this.esri.symbols.SimpleFillSymbol({
                color: [0, 0, 255, 0.1],
                outline: {
                  type: 'simple-line',
                  color: '#00ffff',
                  width: '1px'
                }
              });
            });
            this.padronesGraphicsLayer.addMany(r.features);
            this.searchPadronCountResult = r.features.length;
            this.zoomTo(r.features);
          }
          this.searchPadronTextResult =
            r.features.length === 0
              ? `No se encontró el padrón ${p.value} de ${d.text}`
              : null;
          this.loadingEvent.emit(false);
        })
        .catch(_ => {
          this.searchPadronTextResult =
            'El servicio de búsqueda no esta respondiendo, intente nuevamente.';
          this.loadingEvent.emit(false);
        });
    }
  }

  searchPadronClearClick() {
    this.padronesGraphicsLayer.removeAll();
    this.searchPadronCountResult = 0;
    this.searchPadronTextResult = '';
  }

  // zoom to

  private zoomTo(graphics: __esri.Graphic[]) {
    let e: __esri.Extent;
    try {
      e = this.mapCoreService.unionExtents(
        graphics.map(g => g.geometry.extent)
      );
    } catch {
      e = null;
      // intencional
    }
    if (e) {
      this.view.goTo(e);
    }
  }
}
