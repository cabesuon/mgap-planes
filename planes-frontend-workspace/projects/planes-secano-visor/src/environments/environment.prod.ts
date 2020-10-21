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
  apiUrl: 'http://gliese.renare.gub.uy/nucleo/rest',
  useMockServer: true,
  logging: {
    serverLoggingUrl: null,
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.OFF,
    disableConsoleLogging: false
    // , colorScheme: ['purple', 'teal', 'green', 'gray', 'orange', 'amber', 'red']
  }
};
