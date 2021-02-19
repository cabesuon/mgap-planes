import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  Validators,
  FormBuilder,
  ValidatorFn,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';

import {
  CultivoSecano,
  PERIODOS_CULTIVOS,
  getPeriodoCultivoMinByName,
  getPeriodoCultivoMaxByName
} from '../../cultivos-secano/cultivos-secano.model';
import { ManejoSecano } from '../../manejos-secano/manejos-secano.model';
import { RendimientoSecano } from '../../rendimientos-secano/rendimientos-secano.model';
import { RelacionPerdidaSueloSecano } from '../../relaciones-perdida-suelo-secano/relaciones-perdida-suelo-secano.model';

import { ComponenteSecano } from '../componentes-secano.model';

import { FormActionType } from 'planes-core-lib';

export interface ComponentesSecanoFormInput {
  action: FormActionType;
  componente: ComponenteSecano;
  section: string;
  cultivos: CultivoSecano[];
  manejos: ManejoSecano[];
  rendimientos: RendimientoSecano[];
  relaciones: RelacionPerdidaSueloSecano[];
}

@Component({
  selector: 'lib-componentes-secano-form',
  templateUrl: './componentes-secano-form.component.html',
  styleUrls: ['./componentes-secano-form.component.css']
})
export class ComponentesSecanoFormComponent implements OnInit {
  @Input() formInput: ComponentesSecanoFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<ComponenteSecano>();

  periodosCultivos = PERIODOS_CULTIVOS.filter(p => p.periodoCultivoId !== 3);
  cultivos: CultivoSecano[] = [];
  manejos: ManejoSecano[] = [];
  rendimientos: RendimientoSecano[] = [];
  sueloResiduosSiembra: number[] = [];
  sueloPeriodo3: number[] = [];
  sueloPeriodo4: number[] = [];
  manejosIdsCultivo: { [cultivoId: string]: Set<string> } = {};

  periodosValidator(mmin: number, mmax: number, pl: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let min = mmin;
      let max = mmax;
      // console.log(`-----> periodos validator min:${min} max:${max}`);
      for (let i = 0; i < pl; i++) {
        if (
          control.value[`p${i}i`] > control.value[`p${i}f`] ||
          control.value[`p${i}i`] < min ||
          control.value[`p${i}f`] > max
        ) {
          // console.log(`-----> incorrect ${i} ${control.value[`p${i}i`]} ${control.value[`p${i}f`]} min:${min} max:${max}`);
          return { mesesPeriodosIncorrectos: true };
        }
        min = control.value[`p${i}i`];
      }
      return null;
    };
  }

  form = this.fb.group({
    // Cultivo
    periodoCultivoId: [null],
    cultivoId: [null],
    manejoId: [null],
    rendimientoId: [null],
    componenteSembradoPorAvion: [false],
    sueloResiduosSiembra: [null],
    sueloPeriodo3: [null],
    sueloPeriodo4: [null],
    // Periodos
    p0i: [null],
    p0f: [null],
    p1i: [null],
    p1f: [null],
    p2i: [null],
    p2f: [null],
    p3i: [null],
    p3f: [null],
    p4i: [null],
    p4f: [null],
    p5i: [null],
    p5f: [null]
  });

  setFormLogic() {
    const min = getPeriodoCultivoMinByName(
      this.formInput.componente.periodoCultivoNombre
    );
    const max = getPeriodoCultivoMaxByName(
      this.formInput.componente.periodoCultivoNombre
    );
    this.form.setValidators([
      this.periodosValidator(
        min,
        max,
        this.formInput.componente.periodos.length
      )
    ]);
    this.form.get('periodoCultivoId').setValidators([Validators.required]);
    this.form.get('cultivoId').setValidators([Validators.required]);
    this.form.get('manejoId').setValidators([Validators.required]);
    this.form.get('rendimientoId').setValidators([Validators.required]);
    this.form
      .get('componenteSembradoPorAvion')
      .setValidators([Validators.required]);
  }

  constructor(private fb: FormBuilder) {}

  initManejosIdsCultivo() {
    for (const r of this.formInput.relaciones) {
      if (!this.manejosIdsCultivo.hasOwnProperty(r.cultivoId)) {
        this.manejosIdsCultivo[r.cultivoId] = new Set();
      }
      this.manejosIdsCultivo[r.cultivoId].add(r.manejoId);
    }
  }

  ngOnInit(): void {
    this.initManejosIdsCultivo();
    if (this.formInput.action === FormActionType.Update) {
      const periodos = {};
      for (let i = 0; i < this.formInput.componente.periodos.length; i++) {
        periodos[`p${i}i`] = this.formInput.componente.periodos[
          i
        ].periodoMesInicial;
        periodos[`p${i}f`] = this.formInput.componente.periodos[
          i
        ].periodoMesFinal;
      }
      this.form.patchValue({
        periodoCultivoId: this.formInput.componente.periodoCultivoId,
        cultivoId: this.formInput.componente.cultivoId,
        manejoId: this.formInput.componente.manejoId,
        rendimientoId: this.formInput.componente.rendimientoId,
        componenteSembradoPorAvion: this.formInput.componente
          .componenteSembradoPorAvion,
        sueloResiduosSiembra: this.formInput.componente.sueloResiduosSiembra,
        sueloPeriodo3: this.formInput.componente.sueloPeriodo3,
        sueloPeriodo4: this.formInput.componente.sueloPeriodo4,
        ...periodos
      });
      this.periodoCultivoChange();
      this.cultivoChange();
      this.manejoChange();
      this.rendimientoChange();
      this.setFormLogic();
    }
    this.form.valueChanges.subscribe(_ => {
      this.formValueChanges.emit({
        ...this.formInput.componente,
        periodoCultivoId: this.form.value.periodoCultivoId,
        cultivoId: this.form.value.cultivoId,
        manejoId: this.form.value.manejoId,
        rendimientoId: this.form.value.rendimientoId,
        componenteSembradoPorAvion: this.form.value.componenteSembradoPorAvion,
        sueloResiduosSiembra: this.form.value.sueloResiduosSiembra,
        sueloPeriodo3: this.form.value.sueloPeriodo3,
        sueloPeriodo4: this.form.value.sueloPeriodo4,
        periodos: this.formInput.componente.periodos.map((v, i) => ({
          ...v,
          periodoMesInicial: this.form.value[`p${i}i`],
          periodoMesFinal: this.form.value[`p${i}f`]
        }))
      });
    });
    this.form.statusChanges.subscribe(v => this.formStatusChanges.emit(v));
  }

  periodoCultivoChange() {
    this.manejos = [];
    this.rendimientos = [];
    this.sueloResiduosSiembra = [];
    this.sueloPeriodo3 = [];
    this.sueloPeriodo4 = [];
    this.cultivos = this.formInput.cultivos.filter(
      v =>
        v.cultivoVisible &&
        (v.periodoCultivoId === this.form.value.periodoCultivoId ||
          (v.periodoCultivoId === 3 &&
            this.form.value.periodoCultivoId === 1) ||
          (v.periodoCultivoId === 3 &&
            this.form.value.periodoCultivoId === 2)) &&
        this.manejosIdsCultivo.hasOwnProperty(v.cultivoId) &&
        this.formInput.manejos.some(
          m =>
            this.manejosIdsCultivo[v.cultivoId].has(m.manejoId) &&
            (m.manejoNombre.toLowerCase() === 'siembra directa' ||
              m.manejoNombre.toLowerCase() ===
                'siembra directa (laboreo de verano con cober. invern pastoreada y herbicida)' ||
              m.manejoNombre.toLowerCase() === 'no aplica')
        )
    );
  }

  cultivoChange() {
    this.rendimientos = [];
    this.sueloResiduosSiembra = [];
    this.sueloPeriodo3 = [];
    this.sueloPeriodo4 = [];
    const rs = this.formInput.relaciones.filter(
      r => r.cultivoId === this.form.value.cultivoId
    );
    this.manejos = this.formInput.manejos.filter(v =>
      rs.some(r => r.manejoId === v.manejoId)
    );
  }

  manejoChange() {
    this.sueloResiduosSiembra = [];
    this.sueloPeriodo3 = [];
    this.sueloPeriodo4 = [];
    const rs = this.formInput.relaciones.filter(
      r =>
        r.cultivoId === this.form.value.cultivoId &&
        r.manejoId === this.form.value.manejoId
    );
    this.rendimientos = this.formInput.rendimientos.filter(v =>
      rs.some(r => r.rendimientoId === v.rendimientoId)
    );
  }

  rendimientoChange() {
    const rs = this.formInput.relaciones.filter(
      r =>
        r.cultivoId === this.form.value.cultivoId &&
        r.manejoId === this.form.value.manejoId &&
        r.rendimientoId === this.form.value.rendimientoId
    );
    let ss = new Set<number>(),
      s3 = new Set<number>(),
      s4 = new Set<number>();
    for (const r of rs) {
      ss.add(r.rpsSueloResiduosSiembra);
      if (r.rpsPeriodo === 3) {
        s3.add(r.rpsSueloAereaPeriodo);
      } else if (r.rpsPeriodo === 4) {
        s4.add(r.rpsSueloAereaPeriodo);
      }
    }
    ss.delete(0);
    s3.delete(0);
    s4.delete(0);
    this.sueloResiduosSiembra = [...ss].sort();
    if (this.sueloResiduosSiembra.length > 0) {
      this.form.get('sueloResiduosSiembra').enable();
    } else {
      this.form.get('sueloResiduosSiembra').disable();
    }
    this.sueloPeriodo3 = [...s3].sort();
    if (this.sueloPeriodo3.length > 0) {
      this.form.get('sueloPeriodo3').enable();
    } else {
      this.form.get('sueloPeriodo3').disable();
    }
    this.sueloPeriodo4 = [...s4].sort();
    if (this.sueloPeriodo4.length > 0) {
      this.form.get('sueloPeriodo4').enable();
    } else {
      this.form.get('sueloPeriodo4').disable();
    }
  }
}
