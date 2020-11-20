import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

const NOERROR = { error: 'none' };

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor(private logger: NGXLogger) {}

  trace(message: string, source: any, error?: any) {
    this.logger.trace(message, source, error ? error : NOERROR);
  }

  debug(message: string, source: any, error: any) {
    this.logger.debug(message, source, error ? error : NOERROR);
  }

  info(message: string, source: any) {
    this.logger.info(message, source);
  }

  log(message: string, source: any, error?: any) {
    this.logger.log(message, source, error ? error : NOERROR);
  }

  warn(message: string, source: any, error?: any) {
    this.logger.warn(message, source, error ? error : NOERROR);
  }

  error(message: string, source: any, error: any) {
    this.logger.error(message, source, error);
  }

  fatal(message: string, source: any, error: any) {
    this.logger.fatal(message, source, error);
  }
}
