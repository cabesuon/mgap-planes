import { Injectable } from '@angular/core';
import {
  getStatusText,
  InMemoryDbService,
  ResponseOptions,
  RequestInfo,
  STATUS,
  RequestInfoUtilities,
  ParsedRequestUrl
} from 'angular-in-memory-web-api';

import { InMemoryDb } from './in-memory-db';
import { createInMemoryDataDefault } from './in-memory-db-data';

import { MockQueryPlanes, MockAddPlanes } from './planes-get-data';
import { MockQueryChacras, MockAddChacras } from './chacras-get-data';
import {
  MockQueryZonasExclusion,
  MockAddZonasExclusion
} from './zonas-exclusion-get-data';

import { MockQueryPadrones } from './padrones-get-data';
import { MockQuerySuelos } from './suelos-get-data';

import { MockQueryPersonas } from './personas-get-data';
import { MockQueryIngenierosAgronomos } from './ingenieros-agronomos-get-data';

import { MockQueryTokens } from './tokens-get-data';

import { MockQueryEmpresas } from './empresas-get-data';

import { MockQueryResponsables } from './responsables-get-data';
import { MockQueryCultivos } from './cultivos-get-data';
import { MockQueryManejos } from './manejos-get-data';
import { MockQueryRendimientos } from './rendimientos-get-data';
import { MockQueryRelacionPerdidaSuelos } from './relacion-perdida-suelos-get-data';
import { MockQueryRotaciones, MockAddRotaciones } from './rotaciones-get-data';
import {
  MockAddComponentes,
  MockQueryComponentes
} from './componentes-get-data';

const getMethodGetDataRepo = {};

const postMethodGetDataRepo = {
  queryPlanes: new MockQueryPlanes(),
  addPlanes: new MockAddPlanes(),
  queryChacras: new MockQueryChacras(),
  addChacras: new MockAddChacras(),
  queryZonasExclusion: new MockQueryZonasExclusion(),
  addZonasExclusion: new MockAddZonasExclusion(),

  queryPadrones: new MockQueryPadrones(),
  querySuelos: new MockQuerySuelos(),

  queryPersonas: new MockQueryPersonas(),
  queryIngenierosAgronomos: new MockQueryIngenierosAgronomos(),
  queryResponsables: new MockQueryResponsables(),
  queryTokens: new MockQueryTokens(),
  queryEmpresas: new MockQueryEmpresas(),

  queryRotaciones: new MockQueryRotaciones(),
  addQueryRotaciones: new MockAddRotaciones(),
  queryRotacionesComponentes: new MockQueryComponentes(),
  addQueryRotacionesComponentes: new MockAddComponentes(),
  queryCultivos: new MockQueryCultivos(),
  queryManejos: new MockQueryManejos(),
  queryRendimientos: new MockQueryRendimientos(),
  queryRelacionPerdidaSuelos: new MockQueryRelacionPerdidaSuelos()
};

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  private db: InMemoryDb;

  createDb(reqInfo?: RequestInfo) {
    this.db = new InMemoryDb(createInMemoryDataDefault());
    return this.db;
  }

  get(reqInfo: RequestInfo) {
    if (getMethodGetDataRepo.hasOwnProperty(reqInfo.collectionName)) {
      return this.handleRequest(reqInfo, getMethodGetDataRepo);
    }
    return undefined;
  }

  post(reqInfo: RequestInfo) {
    if (postMethodGetDataRepo.hasOwnProperty(reqInfo.collectionName)) {
      return this.handleRequest(reqInfo, postMethodGetDataRepo);
    }
    return undefined;
  }

  private handleRequest(reqInfo: RequestInfo, dataRepo: any) {
    return reqInfo.utils.createResponse$(() => {
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
      const data = dataRepo[reqInfo.collectionName].getData(reqInfo, this.db);
      const options: ResponseOptions = data
        ? {
            body: dataEncapsulation ? { data } : data,
            status: STATUS.OK
          }
        : {
            body: { error: `'Internal Server Error` },
            status: STATUS.INTERNAL_SERVER_ERROR
          };
      return this.finishOptions(options, reqInfo);
    });
  }

  private finishOptions(
    options: ResponseOptions,
    { headers, url }: RequestInfo
  ) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }

  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    if (url.endsWith('.json')) {
      return utils.parseRequestUrl(url);
    }

    const splitted = url.split('/');
    const collectionName = splitted[splitted.length - 1];

    const parsed = utils.parseRequestUrl(url);
    parsed.apiBase = splitted.slice(0, splitted.length - 1).join();
    parsed.collectionName = collectionName;
    parsed.resourceUrl = parsed.resourceUrl + parsed.collectionName;
    return parsed;
  }
}
