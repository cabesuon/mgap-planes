import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatPaginatorModule,
  MatPaginatorIntl
} from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
// font awesome
import {
  FontAwesomeModule,
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
  faFileSignature,
  faFileInvoiceDollar,
  faMap,
  faSearch,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
// planes-core-lib
import {
  PlanesCoreLibModule,
  MatPaginatorIntlCoreService
} from 'planes-core-lib';
// planes-secano-lib
import { ChacrasSecanoDetailComponent } from './chacras-secano/chacras-secano-detail/chacras-secano-detail.component';
import { ChacrasSecanoFormComponent } from './chacras-secano/chacras-secano-form/chacras-secano-form.component';
import { ChacrasSecanoTableComponent } from './chacras-secano/chacras-secano-table/chacras-secano-table.component';
import { PlanesSecanoTableComponent } from './planes-secano/planes-secano-table/planes-secano-table.component';
import { PlanesSecanoFormComponent } from './planes-secano/planes-secano-form/planes-secano-form.component';
import { PlanesSecanoDetailComponent } from './planes-secano/planes-secano-detail/planes-secano-detail.component';

import { ComponentesSecanoDetailComponent } from './componentes-secano/componentes-secano-detail/componentes-secano-detail.component';
import { ComponentesSecanoFormComponent } from './componentes-secano/componentes-secano-form/componentes-secano-form.component';
import { ComponentesSecanoTableComponent } from './componentes-secano/componentes-secano-table/componentes-secano-table.component';

import { RotacionesSecanoFormComponent } from './rotaciones-secano/rotaciones-secano-form/rotaciones-secano-form.component';
import { RotacionesSecanoDetailComponent } from './rotaciones-secano/rotaciones-secano-detail/rotaciones-secano-detail.component';

import { PeriodosSecanoDetailComponent } from './periodos-secano/periodos-secano-detail/periodos-secano-detail.component';
import { PeriodosSecanoTableComponent } from './periodos-secano/periodos-secano-table/periodos-secano-table.component';

import { RelacionesPerdidaSueloSecanoDetailComponent } from './relaciones-perdida-suelo-secano/relaciones-perdida-suelo-secano-detail/relaciones-perdida-suelo-secano-detail.component';
import { ManejosSecanoDetailComponent } from './manejos-secano/manejos-secano-detail/manejos-secano-detail.component';
import { CultivosSecanoDetailComponent } from './cultivos-secano/cultivos-secano-detail/cultivos-secano-detail.component';
import { RendimientosSecanoDetailComponent } from './rendimientos-secano/rendimientos-secano-detail/rendimientos-secano-detail.component';

import { ResponsablesSecanoDetailComponent } from './responsables-secano/responsables-secano-detail/responsables-secano-detail.component';
import { ChatSecanoDetailComponent } from './chat-secano/chat-secano-detail/chat-secano-detail.component';

import { WarnErrorSecanoComponent } from './extras/components/warn-error-secano/warn-error-secano.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ChacrasSecanoDetailComponent,
    ChacrasSecanoFormComponent,
    ChacrasSecanoTableComponent,

    PlanesSecanoTableComponent,
    PlanesSecanoFormComponent,
    PlanesSecanoDetailComponent,
    ComponentesSecanoDetailComponent,
    ComponentesSecanoFormComponent,
    ComponentesSecanoTableComponent,
    RotacionesSecanoFormComponent,
    RotacionesSecanoDetailComponent,
    RelacionesPerdidaSueloSecanoDetailComponent,
    PeriodosSecanoDetailComponent,
    PeriodosSecanoTableComponent,
    ManejosSecanoDetailComponent,
    CultivosSecanoDetailComponent,
    RendimientosSecanoDetailComponent,
    ResponsablesSecanoDetailComponent,
    ChatSecanoDetailComponent,
    WarnErrorSecanoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,

    FontAwesomeModule,

    PlanesCoreLibModule
  ],
  exports: [
    ChacrasSecanoDetailComponent,
    ChacrasSecanoFormComponent,
    ChacrasSecanoTableComponent,
    PlanesSecanoTableComponent,
    PlanesSecanoFormComponent,
    PlanesSecanoDetailComponent,
    ComponentesSecanoDetailComponent,
    ComponentesSecanoFormComponent,
    ComponentesSecanoTableComponent,
    RotacionesSecanoFormComponent,
    RotacionesSecanoDetailComponent,
    RelacionesPerdidaSueloSecanoDetailComponent,
    PeriodosSecanoDetailComponent,
    PeriodosSecanoTableComponent,
    ManejosSecanoDetailComponent,
    CultivosSecanoDetailComponent,
    RendimientosSecanoDetailComponent,
    ResponsablesSecanoDetailComponent,
    WarnErrorSecanoComponent
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlCoreService
    },
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PlanesSecanoLibModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faFileSignature,
      faFileInvoiceDollar,
      faMap,
      faSearch,
      faTrash
    );
  }
}
