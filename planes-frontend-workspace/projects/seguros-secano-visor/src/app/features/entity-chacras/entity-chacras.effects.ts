import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf, from as observableFrom } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import {
  ChacraSegurosSecano,
  ChacrasSegurosSecanoService
  } from 'seguros-secano-lib';
import * as entityChacrasActions from './entity-chacras.actions';
import { createEmptyComponenteProductivoSegurosSecano } from 'seguros-secano-lib';
import { EntityComponentesAddRequestAction, EntityComponentesChangeRequestAction } from '../entity-componentes/entity-componentes.actions';

import { deleteDibujos } from '../entity-dibujos/entity-dibujos.actions';
import { create } from 'domain';
import { ComponenteProductivoSegurosSecano } from 'projects/seguros-secano-lib/src/public-api';

@Injectable()
export class EntityChacrasEffects {
  constructor(
    private chacrasSegurosSecanoService: ChacrasSegurosSecanoService,
    private actions$: Actions
  ) {
    this.chacrasSegurosSecanoService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityChacrasLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasLoadRequestAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.chacrasSegurosSecanoService.getChacrasSegurosSecano().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityChacrasActions.EntityChacrasLoadSuccessAction({
                items: queryResults.chacras
              })
            : new entityChacrasActions.EntityChacrasLoadFailureAction({
                error: 'Error al obtener las chacras.'
              });
        }),
        catchError(error =>
          observableOf(
            new entityChacrasActions.EntityChacrasLoadFailureAction({
              error:
                'Error al obtener las chacras (fallo en conexion a servidor).'
            })
          )
        )
      );
    })
  );

  // add
  @Effect()
  EntityChacrasAddRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasAddRequestAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_ADD_REQUEST
    ),
    map(
      (action: entityChacrasActions.EntityChacrasAddRequestAction) =>
        action.payload
    ),
    switchMap(payload => {
      return this.chacrasSegurosSecanoService
        .addChacrasSegurosSecano(payload.item)
        .pipe(
          map(results => results.addResults),
          map(addResults => {
            return addResults.length === 1 && addResults[0].success
              ? new entityChacrasActions.EntityChacrasAddSuccessAction({
                  item: addResults[0].chacra,
                  dibujosId: payload.dibujosId,
                  componente: payload.componente
                })
              : new entityChacrasActions.EntityChacrasAddFailureAction({
                  error: 'Error al crear la chacra.'
                });
          }),
          catchError(error =>
            observableOf(
              new entityChacrasActions.EntityChacrasAddFailureAction({
                error:
                  'Error al crear la chacra (fallo en conexion a servidor).'
              })
            )
          )
        );
    })
  );

  @Effect()
  EntityChacraAddSuccessEffect$: Observable<any> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasAddSuccessAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_ADD_SUCCESS
    ),
    switchMap((action: entityChacrasActions.EntityChacrasAddSuccessAction) => {
      return [
        deleteDibujos({ ids: action.payload.dibujosId }),
        new EntityComponentesAddRequestAction({
          item: {
            ...action.payload.componente,
            chacraId: action.payload.item.chacraId
            // todo: obtener y agregar los campos por default de unidad
          }
        })
      ];
    })
  );

  // change
  @Effect()
  EntityChacrasChangeRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasChangeRequestAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_CHANGE_REQUEST
    ),
    map(
      (action: entityChacrasActions.EntityChacrasChangeRequestAction) =>
        action.payload
    ),
    switchMap(payload =>
      this.chacrasSegurosSecanoService
        .changeChacrasSegurosSecano(payload.item)
        .pipe(
          map(results => results.updateResults),
          map(updateResults => {
            if (updateResults.length === 1 && updateResults[0].success) {
              const uc: Update<ChacraSegurosSecano> = {
                id: updateResults[0].chacra.chacraId,
                changes: {
                  ...updateResults[0].chacra
                }
              };              
              const comp: ComponenteProductivoSegurosSecano = {                
                ...payload.componente                
              }                            
              return new entityChacrasActions.EntityChacrasChangeSuccessAction({
                item: uc,
                dibujosId: payload.dibujosId,
                componente: comp
              });
            }
            return new entityChacrasActions.EntityChacrasChangeFailureAction({
              error: 'Error al actualizar la chacra.'
            });
          }),
          catchError(error =>
            observableOf(
              new entityChacrasActions.EntityChacrasChangeFailureAction({
                error:
                  'Error al actualizar la chacra (fallo en conexion a servidor).'
              })
            )
          )
        )
    )
  );

  @Effect()
  EntityChacraChangeSuccessEffect$: Observable<any> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasChangeSuccessAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_CHANGE_SUCCESS
    ),    
    switchMap((action: entityChacrasActions.EntityChacrasChangeSuccessAction) => {
      return [
        deleteDibujos({ ids: action.payload.dibujosId }),
        new EntityComponentesChangeRequestAction({
          item: [{
            ...action.payload.componente            
            // todo: obtener y agregar los campos por default de unidad
          }]
        })
      ];
    })
  );

  // delete
  @Effect()
  EntityChacrasDeleteRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasDeleteRequestAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_DELETE_REQUEST
    ),
    map(
      (action: entityChacrasActions.EntityChacrasDeleteRequestAction) =>
        action.payload.item
    ),
    switchMap(item =>
      this.chacrasSegurosSecanoService.deleteChacrasSegurosSecano(item).pipe(
        map(results => results.deleteResults),        
        map(deleteResults =>           
          deleteResults.length === 1 && deleteResults[0].success
            ? new entityChacrasActions.EntityChacrasDeleteSuccessAction({
                item
              })
            : new entityChacrasActions.EntityChacrasDeleteFailureAction({
                error: 'Error al eliminar la chacra.'
              })          
        ),
        catchError(error =>          
          observableOf(
            new entityChacrasActions.EntityChacrasDeleteFailureAction({
              error:
                'Error al eliminar la chacra (fallo en conexion a servidor).'
            })
          )
        )
      )
    )
  );
}
