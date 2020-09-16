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

import {
  InitDbPlanes,
  MockQueryPlanes,
  MockAddPlanes
} from './planes-get-data';
import {
  InitDbChacras,
  MockQueryChacras,
  MockAddChacras
} from './chacras-get-data';
import {
  InitDbZonasExclusion,
  MockQueryZonasExclusion,
  MockAddZonasExclusion
} from './zonas-exclusion-get-data';

import { InitDbPersonas, MockQueryPersonas } from './personas-get-data';
import {
  InitDbIngenierosAgronomos,
  MockQueryIngenierosAgronomos
} from './ingenieros-agronomos-get-data';
import {
  InitDbArrendatariosResponsables,
  MockQueryArrendatariosResponsables,
  InitDbPropietariosResponsables,
  MockQueryPropietariosResponsables
} from './responsables-get-data';

import { InitDbTokens, MockQueryTokens } from './tokens-get-data';

const getMethodGetDataRepo = {};

const postMethodGetDataRepo = {
  queryPlanes: new MockQueryPlanes(),
  addPlanes: new MockAddPlanes(),
  queryChacras: new MockQueryChacras(),
  addChacras: new MockAddChacras(),
  queryZonasExclusion: new MockQueryZonasExclusion(),
  addZonasExclusion: new MockAddZonasExclusion(),

  queryPersonas: new MockQueryPersonas(),
  queryIngenierosAgronomos: new MockQueryIngenierosAgronomos(),
  queryPropietariosResponsables: new MockQueryPropietariosResponsables(),
  queryArrendatariosResponsables: new MockQueryArrendatariosResponsables(),

  queryTokens: new MockQueryTokens()
};

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  private db: InMemoryDb;

  createDb(reqInfo?: RequestInfo) {
    this.db = new InMemoryDb(
      new InitDbTokens().getData(reqInfo),

      new InitDbPersonas().getData(reqInfo),

      new InitDbIngenierosAgronomos().getData(reqInfo),
      new InitDbPropietariosResponsables().getData(reqInfo),
      new InitDbArrendatariosResponsables().getData(reqInfo),

      new InitDbPlanes().getData(reqInfo),
      new InitDbChacras().getData(reqInfo),
      new InitDbZonasExclusion().getData(reqInfo)
    );
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
