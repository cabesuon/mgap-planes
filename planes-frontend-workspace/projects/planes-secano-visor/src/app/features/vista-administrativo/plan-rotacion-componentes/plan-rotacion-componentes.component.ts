import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';

import { AppState } from '../../../core/core.state';

import {
  FormActionType,
  ConfirmDialogData,
  ConfirmDialogResultType,
  ConfirmDialogComponent
} from 'planes-core-lib';

import {
  PlanSecano,
  RotacionSecano,
  ComponenteSecano,
  CultivoSecano,
  ManejoSecano,
  RendimientoSecano,
  RelacionPerdidaSueloSecano,
  RotacionesSecanoDetailParams,
  ComponentesSecanoDetailParams,
  createEmptyRotacionSecano,
  createEmptyComponenteSecano
} from 'planes-secano-lib';

import { EntityRotacionesDeleteRequestAction } from '../../entity-rotaciones/entity-rotaciones.actions';
import { EntityComponentesDeleteRequestAction } from '../../entity-componentes/entity-componentes.actions';
import {
  EntityRotacionesFormDialogData,
  EntityRotacionesFormDialogComponent
} from '../../entity-rotaciones/entity-rotaciones-form-dialog/entity-rotaciones-form-dialog.component';
import {
  EntityComponentesFormDialogData,
  EntityComponentesFormDialogComponent
} from '../../entity-componentes/entity-componentes-form-dialog/entity-componentes-form-dialog.component';

import { selectRotacionById } from '../../entity-rotaciones/entity-rotaciones.selectors';
import { selectComponentesByRotacionId } from '../../entity-componentes/entity-component.selectors';

const DIALOG_WIDTH = '300px';
const DIALOG_MAX_HEIGHT = '500px';

export interface PlanRotacionComponentesParams {
  plan: PlanSecano;
  cultivos: CultivoSecano[];
  manejos: ManejoSecano[];
  rendimientos: RendimientoSecano[];
  relaciones: RelacionPerdidaSueloSecano[];
  rotaciones: RotacionSecano[];
  componentes: ComponenteSecano[];
}

@Component({
  selector: 'app-plan-rotacion-componentes',
  templateUrl: './plan-rotacion-componentes.component.html',
  styleUrls: ['./plan-rotacion-componentes.component.scss']
})
export class PlanRotacionComponentesComponent implements OnInit {
  private _params: PlanRotacionComponentesParams = null;
  @Input()
  get params(): PlanRotacionComponentesParams {
    return this._params;
  }
  set params(params: PlanRotacionComponentesParams) {
    this._params = params;
    this.update();
  }

  rotacionDetailParams: RotacionesSecanoDetailParams = null;
  componentesDetailParams: ComponentesSecanoDetailParams[] = [];

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.update();
  }

  reset() {
    this.rotacionDetailParams = null;
    this.componentesDetailParams = [];
  }

  update() {
    this.reset();
    if (!this.params || !this.params.plan) {
      return;
    }
    // rotacion
    const rotacion = this.params.rotaciones.find(
      r => r.rotacionPlanId === this.params.plan.planId
    );
    this.componentesDetailParams = [];
    this.rotacionDetailParams = null;
    if (rotacion) {
      this.updateComponentesDetailParams(
        this.params.componentes.filter(
          componente => componente.rotacionId === rotacion.rotacionId
        )
      );
      this.rotacionDetailParams = {
        rotacion,
        componentesDetailParams: []
      };

      this.store
        .pipe(select(selectRotacionById(rotacion.rotacionId)))
        .subscribe(r => (this.rotacionDetailParams.rotacion = r));
      this.store
        .pipe(select(selectComponentesByRotacionId(rotacion.rotacionId)))
        .subscribe(componentes =>
          this.updateComponentesDetailParams(componentes)
        );
    }
  }

  updateComponentesDetailParams(componentes: ComponenteSecano[]) {
    this.componentesDetailParams = componentes.map(componente => {
      const manejo = this.params.manejos.find(
        m => m.manejoId === componente.manejoId
      );
      const rendimiento = this.params.rendimientos.find(
        r => r.rendimientoId === componente.rendimientoId
      );
      return {
        componente,
        cultivoDetailParams: null,
        manejoDetailParams: !!manejo && { manejo },
        rendimientoDetailParams: !!rendimiento && { rendimiento }
      };
    });
  }

  // rotacion

  addRotacion() {
    this.openRotacionDialog(FormActionType.Add, {
      ...createEmptyRotacionSecano(),
      rotacionPlanId: this.params.plan.planId
    });
  }

  updateRotacion() {
    this.openRotacionDialog(
      FormActionType.Update,
      this.rotacionDetailParams.rotacion
    );
  }

  deleteRotacion() {
    this.openConfirmDialog(
      'Eliminar Rotación',
      `Confirma la eliminación de la rotación ${this.rotacionDetailParams.rotacion.rotacionNombre}.`,
      new EntityRotacionesDeleteRequestAction({
        item: { ...this.rotacionDetailParams.rotacion }
      })
    );
  }

  openRotacionDialog(action: FormActionType, rotacion: RotacionSecano) {
    const inData: EntityRotacionesFormDialogData = {
      rotacion,
      action: action
    };
    this.dialog.open(EntityRotacionesFormDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    });
  }

  // componente

  addComponente() {
    this.openComponenteDialog(
      FormActionType.Add,
      {
        ...createEmptyComponenteSecano(),
        rotacionId: this.rotacionDetailParams.rotacion.rotacionId
      },
      'Cultivo'
    );
  }

  updateComponente(componente: ComponenteSecano, section: string) {
    this.openComponenteDialog(FormActionType.Update, componente, section);
  }

  deleteComponente(componente: ComponenteSecano) {
    this.openConfirmDialog(
      'Eliminar Componente',
      `Confirma la eliminación del componente ${componente.componenteNombre}.`,
      new EntityComponentesDeleteRequestAction({
        componente
      })
    );
  }

  openComponenteDialog(
    action: FormActionType,
    componente: ComponenteSecano,
    section: string
  ) {
    const inData: EntityComponentesFormDialogData = {
      componente,
      action,
      section,
      cultivos: this.params.cultivos,
      manejos: this.params.manejos,
      rendimientos: this.params.rendimientos,
      relaciones: this.params.relaciones
    };
    this.dialog.open(EntityComponentesFormDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    });
  }

  // confirm

  openConfirmDialog(title: string, question: string, action: any) {
    const inData: ConfirmDialogData = {
      title,
      question,
      result: ConfirmDialogResultType.Cancel
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: DIALOG_WIDTH,
      maxHeight: DIALOG_MAX_HEIGHT,
      data: inData
    });
    dialogRef.afterClosed().subscribe(outData => {
      if (outData && outData.result === ConfirmDialogResultType.Ok) {
        if (action) {
          this.store.dispatch(action);
        }
      }
    });
  }
}
