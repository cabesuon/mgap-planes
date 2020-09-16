import { NgModule } from '@angular/core';
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
// planes-core-lib
import { MatPaginatorIntlCoreService } from 'planes-core-lib';
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
import { RotacionesSecanoTableComponent } from './rotaciones-secano/rotaciones-secano-table/rotaciones-secano-table.component';
import { RotacionesSecanoFormComponent } from './rotaciones-secano/rotaciones-secano-form/rotaciones-secano-form.component';
import { RotacionesSecanoDetailComponent } from './rotaciones-secano/rotaciones-secano-detail/rotaciones-secano-detail.component';

@NgModule({
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

    RotacionesSecanoTableComponent,
    RotacionesSecanoFormComponent,
    RotacionesSecanoDetailComponent
  ],
  imports: [
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
    ChacrasSecanoDetailComponent,
    ChacrasSecanoFormComponent,
    ChacrasSecanoTableComponent,

    PlanesSecanoTableComponent,
    PlanesSecanoFormComponent,
    PlanesSecanoDetailComponent,

    ComponentesSecanoDetailComponent,
    ComponentesSecanoFormComponent,
    ComponentesSecanoTableComponent,

    RotacionesSecanoTableComponent,
    RotacionesSecanoFormComponent,
    RotacionesSecanoDetailComponent
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlCoreService
    }
  ]
})
export class PlanesSecanoLibModule {}
