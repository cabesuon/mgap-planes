import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class MatPaginatorIntlCoreService extends MatPaginatorIntl {
  itemsPerPageLabel = 'Items por Página';
  nextPageLabel = 'Siguiente Página';
  previousPageLabel = 'Página Anterior';
  firstPageLabel = 'Primera Página';
  lastPageLabel = 'Última Página';
}
