import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
// planes-core-lib components
import { MapCoreControlComponent } from './map-core/map-core-control/map-core-control.component';

import { PlanesCoreTableComponent } from './planes-core/planes-core-table/planes-core-table.component';
import { PlanesCoreFormComponent } from './planes-core/planes-core-form/planes-core-form.component';
import { PlanesCoreDetailComponent } from './planes-core/planes-core-detail/planes-core-detail.component';

import { ChacrasCoreTableComponent } from './chacras-core/chacras-core-table/chacras-core-table.component';
import { ChacrasCoreFormComponent } from './chacras-core/chacras-core-form/chacras-core-form.component';
import { ChacrasCoreDetailComponent } from './chacras-core/chacras-core-detail/chacras-core-detail.component';

import { PersonasCoreDetailComponent } from './personas-core/personas-core-detail/personas-core-detail.component';
import { IngenierosAgronomosCoreDetailComponent } from './ingenieros-agronomos-core/ingenieros-agronomos-core-detail/ingenieros-agronomos-core-detail.component';
import { ContactoCoreDetailComponent } from './contacto-core/contacto-core-detail/contacto-core-detail.component';

import { PadronesCoreDetailComponent } from './padrones-core/padrones-core-detail/padrones-core-detail.component';
import { SuelosCoreDetailComponent } from './suelos-core/suelos-core-detail/suelos-core-detail.component';
import { EmpresasCoreDetailComponent } from './empresas-core/empresas-core-detail/empresas-core-detail.component';

import { DetailComponent } from './extras/components/detail/detail.component';
import { TableComponent } from './extras/components/table/table.component';

// planes-core-lib services
import { MatPaginatorIntlCoreService } from './extras/components/mat-paginator-intl-core.service';

@NgModule({
  declarations: [
    MapCoreControlComponent,

    PlanesCoreTableComponent,
    PlanesCoreFormComponent,
    PlanesCoreDetailComponent,

    ChacrasCoreTableComponent,
    ChacrasCoreFormComponent,
    ChacrasCoreDetailComponent,

    PadronesCoreDetailComponent,
    SuelosCoreDetailComponent,

    PersonasCoreDetailComponent,
    IngenierosAgronomosCoreDetailComponent,
    ContactoCoreDetailComponent,
    EmpresasCoreDetailComponent,

    DetailComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,

    FontAwesomeModule
  ],
  exports: [
    MapCoreControlComponent,

    PlanesCoreTableComponent,
    PlanesCoreFormComponent,
    PlanesCoreDetailComponent,

    ChacrasCoreTableComponent,
    ChacrasCoreFormComponent,
    ChacrasCoreDetailComponent,

    PadronesCoreDetailComponent,
    SuelosCoreDetailComponent,

    PersonasCoreDetailComponent,
    IngenierosAgronomosCoreDetailComponent,
    ContactoCoreDetailComponent,
    EmpresasCoreDetailComponent,

    DetailComponent,
    TableComponent
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlCoreService
    }
  ]
})
export class PlanesCoreLibModule {
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
