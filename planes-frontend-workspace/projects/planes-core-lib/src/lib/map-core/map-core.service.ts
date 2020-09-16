import { Injectable } from '@angular/core';

import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import esri = __esri;

import { DibujoCoreType } from '../dibujos-core/dibujos-core.model';

import { EsriModulesService } from './esri-modules.service';

@Injectable({
  providedIn: 'root'
})
export class MapCoreService {
  private _id: number = 1;

  constructor(private esriModulesService: EsriModulesService) {}

  nextId() {
    return this._id++;
  }

  // requests

  importDibujos(name: string, file: any): Observable<any> {
    const params = {
      name,
      targetSR: {
        wkid: 4326
      },
      maxRecordCount: 1000,
      enforceInputFileSizeLimit: true,
      enforceOutputJsonSizeLimit: true
    };

    const content = {
      filetype: 'shapefile',
      publishParameters: JSON.stringify(params),
      f: 'json'
    };

    const form = new FormData();
    form.append('file', file, name);

    return from(this.esriModulesService.load(['esri/request'])).pipe(
      map((modules: any[]) => modules[0]),
      switchMap(request =>
        from(
          request(
            'https://www.arcgis.com/sharing/rest/content/features/generate',
            {
              method: 'post',
              query: content,
              body: form,
              responseType: 'json'
            }
          )
        ).pipe(
          map(
            (response: esri.RequestResponse) =>
              response.data.featureCollection.layers
          ),
          map(layers =>
            layers.reduce(
              (graphics: esri.Graphic[], layer: any) =>
                graphics.concat(
                  layer.featureSet.features
                    .filter(
                      (feature: esri.Graphic) =>
                        'paths' in feature.geometry ||
                        'rings' in feature.geometry
                    )
                    .map((feature: esri.Graphic) => ({
                      DibujoId: this.nextId(),
                      DibujoGeometria: feature.geometry,
                      DibujoTipo:
                        'paths' in feature.geometry
                          ? DibujoCoreType.POLYLINE
                          : DibujoCoreType.POLYGON
                    }))
                ),
              []
            )
          )
        )
      )
    );
  }

  // geometry operations

  geodesicLenght(geometry: esri.Geometry, unit: number): Observable<number> {
    return from(
      this.esriModulesService.load(['esri/geometry/geometryEngine'])
    ).pipe(
      map((modules: any[]) => modules[0]),
      switchMap((geometryEngine: esri.geometryEngine) =>
        of(geometryEngine.geodesicLength(geometry, unit))
      )
    );
  }

  geodesicArea(geometry: esri.Polygon, unit: number): Observable<number> {
    return from(
      this.esriModulesService.load(['esri/geometry/geometryEngine'])
    ).pipe(
      map((modules: any[]) => modules[0]),
      switchMap((geometryEngine: esri.geometryEngine) =>
        of(geometryEngine.geodesicArea(geometry, unit))
      )
    );
  }

  geodesicBuffer(
    geometry: esri.Geometry,
    distance: number,
    unit: number
  ): Observable<esri.Polygon | esri.Polygon[]> {
    return from(
      this.esriModulesService.load(['esri/geometry/geometryEngine'])
    ).pipe(
      map((modules: any[]) => modules[0]),
      switchMap((geometryEngine: esri.geometryEngine) =>
        of(geometryEngine.geodesicBuffer(geometry, distance, unit))
      )
    );
  }

  unionExtents(extents: esri.Extent[]): esri.Extent {
    return extents.reduce((e, c) => e.union(c.extent), extents[0].clone());
  }

  // json

  jsonParse(json: string | Object): Object {
    let obj = json;
    if (typeof json === 'string') {
      obj = JSON.parse(json.replace(/'/g, '"'));
    }
    return obj;
  }

  jsonToPolygon(json: any, toGeographic: boolean): Observable<esri.Polygon> {
    let obj = this.jsonParse(json);
    return from(
      this.esriModulesService.load([
        'esri/geometry/Polygon',
        'esri/geometry/support/webMercatorUtils'
      ])
    ).pipe(
      map((modules: any[]) => [modules[0], modules[1]]),
      switchMap(([Polygon, webMercatorUtils]) => {
        let geom: esri.Polygon = Polygon.fromJSON(obj);
        if (toGeographic && !geom.spatialReference.isWGS84) {
          geom = webMercatorUtils.webMercatorToGeographic(geom);
        }
        return of(geom);
      })
    );
  }

  jsonToPolyline(json: any, toGeographic: boolean): Observable<esri.Polyline> {
    let obj = this.jsonParse(json);
    return from(
      this.esriModulesService.load([
        'esri/geometry/Polyline',
        'esri/geometry/support/webMercatorUtils'
      ])
    ).pipe(
      map((modules: any[]) => [modules[0], modules[1]]),
      switchMap(([Polyline, webMercatorUtils]) => {
        let geom: esri.Polyline = Polyline.fromJSON(obj);
        if (toGeographic && geom.spatialReference.isWGS84) {
          geom = webMercatorUtils.webMercatorToGeographic(geom);
        }
        return of(geom);
      })
    );
  }
}
