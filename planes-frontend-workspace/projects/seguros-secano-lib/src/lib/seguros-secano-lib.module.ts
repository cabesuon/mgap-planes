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

import {
  PlanesCoreLibModule,
  MatPaginatorIntlCoreService
} from 'planes-core-lib';

import { AseguradorasSegurosSecanoDetailComponent } from './aseguradoras-seguros-secano/aseguradoras-seguros-secano-detail/aseguradoras-seguros-secano-detail.component'

import { ChacrasSegurosSecanoDetailComponent } from './chacras-seguros-secano/chacras-seguros-secano-detail/chacras-seguros-secano-detail.component';
import { ChacrasSegurosSecanoFormComponent } from './chacras-seguros-secano/chacras-seguros-secano-form/chacras-seguros-secano-form.component';

import { CiclosSegurosSecanoDetailComponent } from './ciclos-seguros-secano/ciclos-seguros-secano-detail/ciclos-seguros-secano-detail.component';

import { ComponentesProductivosSegurosSecanoDetailComponent } from './componentes-productivos-seguros-secano/componentes-productivos-seguros-secano-detail/componente-productivo-seguros-secano-detail.component';
import { ComponentesProductivosSegurosSecanoFormComponent } from './componentes-productivos-seguros-secano/componentes-productivos-seguros-secano-form/componentes-productivos-seguros-secano-form.component';
import { ComponentesProductivosSegurosSecanoTableComponent } from './componentes-productivos-seguros-secano/componentes-productivos-seguros-secano-table/componentes-productivos-seguros-secano-table.component';

import { CultivosSegurosSecanoDetailComponent } from './cultivos-seguros-secano/cultivos-seguros-secano-detail/cultivos-seguros-secano-detail.component';

import { UnidadesManejosSegurosSecanoDetailComponent } from './unidades-manejos-seguros-secano/unidades-manejos-seguros-secano-detail/unidades-manejos-seguros-secano-detail.component';
import { UnidadesManejosSegurosSecanoFormComponent } from './unidades-manejos-seguros-secano/unidades-manejos-seguros-secano-form/unidades-manejos-seguros-secano-form.component';
import { UnidadesManejosSegurosSecanoTableComponent } from './unidades-manejos-seguros-secano/unidades-manejos-seguros-secano-table/unidades-manejos-seguros-secano-table.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AseguradorasSegurosSecanoDetailComponent,
    ChacrasSegurosSecanoDetailComponent,
    ChacrasSegurosSecanoFormComponent,
    CultivosSegurosSecanoDetailComponent,
    CiclosSegurosSecanoDetailComponent,
    ComponentesProductivosSegurosSecanoDetailComponent,
    ComponentesProductivosSegurosSecanoFormComponent,
    ComponentesProductivosSegurosSecanoTableComponent,
    UnidadesManejosSegurosSecanoDetailComponent,
    UnidadesManejosSegurosSecanoFormComponent,
    UnidadesManejosSegurosSecanoTableComponent
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

    FontAwesomeModule,

    PlanesCoreLibModule
  ],
  exports: [    
    AseguradorasSegurosSecanoDetailComponent,
    ChacrasSegurosSecanoDetailComponent,
    ChacrasSegurosSecanoFormComponent,
    CultivosSegurosSecanoDetailComponent,
    CiclosSegurosSecanoDetailComponent,
    ComponentesProductivosSegurosSecanoDetailComponent,
    ComponentesProductivosSegurosSecanoFormComponent,
    ComponentesProductivosSegurosSecanoTableComponent,
    UnidadesManejosSegurosSecanoDetailComponent,
    UnidadesManejosSegurosSecanoFormComponent,
    UnidadesManejosSegurosSecanoTableComponent
  ]
})
export class SegurosSecanoLibModule {
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
