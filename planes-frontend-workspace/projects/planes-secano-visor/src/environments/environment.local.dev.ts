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
  apiUrl: 'http://localhost:8001/secano/rest',
  useMockServer: false,
  logging: {
    serverLoggingUrl: null,
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.OFF,
    disableConsoleLogging: false
    // , colorScheme: ['purple', 'teal', 'green', 'gray', 'orange', 'amber', 'red']
  }
};
