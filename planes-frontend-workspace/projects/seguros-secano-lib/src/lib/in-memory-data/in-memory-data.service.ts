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

import { MockQueryChacras, MockAddChacras } from './chacras-get-data';
import { MockQueryPersonas } from './personas-get-data';
import { MockQueryTokens } from './tokens-get-data';
import { MockQueryEmpresas } from './empresas-get-data';
import { MockQueryCultivos } from './cultivos-get-data';
import { MockQueryCiclos } from './ciclos-get-data';
import { MockQueryAseguradoras } from './aseguradoras-get-data';

import { MockQueryUnidades, MockAddUnidades } from './unidades-get-data';
import {
  MockAddComponentes,
  MockQueryComponentes
} from './componentes-get-data';

const getMethodGetDataRepo = {};

const postMethodGetDataRepo = {
  queryUnidades: new MockQueryUnidades(),
  addUnidades: new MockAddUnidades(),
  queryChacras: new MockQueryChacras(),
  addChacras: new MockAddChacras(),
  queryComponentes: new MockQueryComponentes(),
  addQueryComponentes: new MockAddComponentes(),

  queryPersonas: new MockQueryPersonas(),
  queryTokens: new MockQueryTokens(),
  queryEmpresas: new MockQueryEmpresas(),
  queryAseguradoras: new MockQueryAseguradoras(),
  queryCultivos: new MockQueryCultivos(),
  queryCiclos: new MockQueryCiclos()
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
