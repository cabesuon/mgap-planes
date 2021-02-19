import { NgxLoggerLevel } from 'ngx-logger';

const packageJson = require('../../../../package.json');

export const environment = {
  appName: 'PUMRS',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  versions: {
    app: packageJson.version
  },
  apiNucleoUrl: 'http://gliese.renare.gub.uy/nucleo/rest',
  apiSecanoUrl: 'http://gliese.renare.gub.uy/secano_desarrollo/rest',
  sueloMetaUrl:
    'http://web.renare.gub.uy/arcgis/rest/services/TEMATICOS/Coneat_K/MapServer/0',
  useMockServer: false,
  logging: {
    serverLoggingUrl: null,
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.OFF,
    disableConsoleLogging: false
    // , colorScheme: ['purple', 'teal', 'green', 'gray', 'orange', 'amber', 'red']
  }
};
