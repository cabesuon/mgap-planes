import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { LoggerModule } from 'ngx-logger';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { environment } from '../environments/environment';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PlanesCoreLibModule } from 'planes-core-lib';

import { FeaturesModule } from './features/features.module';

import { PlanesSecanoLibModule } from 'planes-secano-lib';
import {
  SegurosSecanoLibModule,
  InMemoryDataService
} from 'seguros-secano-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    LoggerModule.forRoot(environment.logging),

    PlanesCoreLibModule,
    PlanesSecanoLibModule,
    SegurosSecanoLibModule,

    CoreModule,
    SharedModule,
    AppRoutingModule,

    FeaturesModule,

    environment.useMockServer
      ? HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
          passThruUnknownUrl: true
        })
      : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
