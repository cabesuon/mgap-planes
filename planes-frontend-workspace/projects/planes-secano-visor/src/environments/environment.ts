// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgxLoggerLevel } from 'ngx-logger';

const packageJson = require('../../../../package.json');

export const environment = {
  appName: 'PUMRS',
  envName: 'DEV',
  production: false,
  test: false,
  i18nPrefix: '',
  versions: {
    app: packageJson.version
  },
  apiNucleoUrl: 'http://localhost:8001/nucleo/rest',
  apiSecanoUrl: 'http://localhost:8001/dsense_desarrollo/rest',
  sueloMetaUrl:
    'http://web.renare.gub.uy/arcgis/rest/services/TEMATICOS/Coneat_K/MapServer/0',
  useMockServer: false,
  logging: {
    serverLoggingUrl: null,
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.OFF,
    disableConsoleLogging: false
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
