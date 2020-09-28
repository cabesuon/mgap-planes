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
// import * as mapCoreModel from '../map-core.model';

const METER = 9001;
const KILOMETER = 9036;

export interface InputFeatureLayer {
  source: Observable<any[]>;
  featureLayerProperties: FeatureLayerProperties;
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
  // variables
  private loaded = false;
  private map: esri.Map = null;
  private view: esri.MapView = null;
  private layers = {
    mapImageLayers: [],
    featureLayers: [],
    graphicsLayers: []
  };
  private chacrasFeatureLayer: esri.FeatureLayer = null;
  private lastChacrasAddFeatureEditResults: esri.FeatureEditResult[] = [];
  private zonasFeatureLayer: esri.FeatureLayer = null;
  private lastZonasAddFeatureEditResults: esri.FeatureEditResult[] = [];
  private pendientesFeatureLayer: esri.FeatureLayer = null;
  private lastPendientesAddFeatureEditResults: esri.FeatureEditResult[] = [];

  private dibujosGraphicsLayer: esri.GraphicsLayer = null;
  private dicDibujosLabels: { [id: number]: esri.Graphic } = {};
  private circleGraphicsLayer: esri.GraphicsLayer = null;

  private circleRadioLine: esri.Graphic = null;
  private circleRadioText: esri.Graphic = null;

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
      support: {
        LabelClass: null
      }
    },
    Map: null,
    symbols: {
      SimpleFillSymbol: null,
      SimpleLineSymbol: null
    },
    views: { MapView: null },
    widgets: {
      Expand: null,
      Legend: null,
      ScaleBar: null,
      Sketch: null,
      SketchViewModel: null
    }
  };

  // output
  @Output() mapLoadedEvent = new EventEmitter<boolean>();
  @Output() dibujoCreatedEvent = new EventEmitter<DibujoCore>();
  @Output() dibujosUpdatedEvent = new EventEmitter<DibujoCore[]>();
  @Output() dibujosDeletedEvent = new EventEmitter<number[]>();

  // input properties
  private _mapViewProperties: MapViewProperties = {
    zoom: 7,
    center: [-56, -34]
  };
  private _mapProperties: MapProperties = {
    basemap: 'hybrid'
  };

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
  // zonas exclusion
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

  constructor(
    private esriModulesService: EsriModulesService,
    private mapCoreService: MapCoreService
  ) {}

  initMap() {
    this.map = new this.esri.Map(this.mapProperties);

    const mapViewProperties: esri.MapViewProperties = {
      container: this.mapViewEl.nativeElement,
      center: this.mapViewProperties.center,
      zoom: this.mapViewProperties.zoom,
      map: this.map
    };

    this.view = new this.esri.views.MapView(mapViewProperties);
  }

  initFeatureLayers() {
    // init Chacras
    this.chacrasFeatureLayer = new this.esri.layers.FeatureLayer({
      ...CHACRAS_FEATURELAYERPROPERTIES,
      source: []
    });
    // init Pendientes
    this.pendientesFeatureLayer = new this.esri.layers.FeatureLayer({
      ...PENDIENTES_FEATURELAYERPROPERTIES,
      source: []
    });
    this.updateChacras();

    this.map.add(this.chacrasFeatureLayer);
    this.map.add(this.pendientesFeatureLayer);

    // init Zonas
    this.zonasFeatureLayer = new this.esri.layers.FeatureLayer({
      ...ZONAS_FEATURELAYERPROPERTIES,
      source: []
    });
    this.updateZonas();

    this.map.add(this.zonasFeatureLayer);
  }

  initGraphicsLayer() {
    this.circleRadioLine = new this.esri.Graphic({
      symbol: CIRCLE_SYMBOLS.line
    });
    this.circleRadioText = new this.esri.Graphic({
      symbol: CIRCLE_SYMBOLS.text
    });

    this.circleGraphicsLayer = new this.esri.layers.GraphicsLayer();
    this.circleGraphicsLayer.addMany([
      this.circleRadioLine,
      this.circleRadioText
    ]);
    this.map.add(this.circleGraphicsLayer);

    this.dibujosGraphicsLayer = new this.esri.layers.GraphicsLayer();
    this.map.add(this.dibujosGraphicsLayer);

    this.updateDibujos();
  }

  initWidgets() {
    const self = this; // <- dumb
    // legend
    const legend = new this.esri.widgets.Legend({
      view: this.view
    });
    const legendExpand = new this.esri.widgets.Expand({
      expandIconClass: 'esri-icon-layer-list',
      view: this.view,
      expandTooltip: 'Ver Leyenda',
      collapseTooltip: 'Ocultar Leyenda',
      content: legend
    });
    this.view.ui.add(legendExpand, 'top-left');
    // sketch
    const sketch = new this.esri.widgets.Sketch({
      layer: this.dibujosGraphicsLayer,
      view: this.view,
      availableCreateTools: this.sketchAvailableCreateTools
    });
    const sketchExpand = new this.esri.widgets.Expand({
      expandIconClass: 'esri-icon-edit',
      view: this.view,
      expandTooltip: 'Ver Edición',
      collapseTooltip: 'Ocultar Edición',
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
        'esri/layers/support/LabelClass',

        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleLineSymbol',

        'esri/widgets/Expand',
        'esri/widgets/Legend',
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
          this.esri.layers.support.LabelClass,

          this.esri.symbols.SimpleFillSymbol,
          this.esri.symbols.SimpleLineSymbol,

          this.esri.widgets.Expand,
          this.esri.widgets.Legend,
          this.esri.widgets.Sketch,
          this.esri.widgets.ScaleBar
        ] = modules;

        this.initMap();
        this.initFeatureLayers();
        this.initGraphicsLayer();
        this.initWidgets();

        this.view.when(_ => {
          this.loaded = this.view.ready;
          this.mapLoadedEvent.emit(this.loaded);
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
          chacrasAddFeatures.map(f => f.geometry.extent)
        );
        this.view.extent = this.esri.geometry.support.webMercatorUtils.geographicToWebMercator(
          ext.expand(2)
        );
      }
    });

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
    this.circleRadioLine.geometry = this.esri.geometry.Polyline({
      paths: [vertices],
      spatialReference: this.view.spatialReference
    });
    // Recalculate the polyline length and buffer polygon
    const length = this.esri.geometry.geometryEngine.geodesicLength(
      this.circleRadioLine.geometry,
      KILOMETER
    );
    // Update label graphic to show the length of the polyline
    this.circleRadioText.geometry = this.esri.geometry.Point({
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
    console.log('Delete > ', event);
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
        console.log('Update > ', event);
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
    let geometry: esri.Geometry = null;
    if ('rings' in obj) {
      geometry = this.esri.geometry.Polygon.fromJSON(obj);
    } else if ('paths' in obj) {
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
}
