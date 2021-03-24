import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { FormActionType } from '../../extras/extras-form';
import {
  DibujoCore,
  DibujoCoreType
} from '../../dibujos-core/dibujos-core.model';

import { ChacraCore } from '../chacras-core.model';
import { ChacrasCoreFormInput } from '../chacras-core-form.model';

import {
  DepartamentoCore,
  getDepartamentosCore,
  PadronCore
} from '../../padrones-core/padrones-core.model';
@Component({
  selector: 'lib-chacras-core-form',
  templateUrl: './chacras-core-form.component.html',
  styleUrls: ['./chacras-core-form.component.css']
})
export class ChacrasCoreFormComponent implements OnInit {
  @Input() formInput: ChacrasCoreFormInput = null;
  @Input() includePendientes: boolean = true;
  @Input() includePadrones: boolean = true;
  @Input() includeSuelos: boolean = true;

  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<ChacraCore>();

  _polygons: DibujoCore[];
  _polylines: DibujoCore[];

  isUpdate: boolean = false;

  form = this.fb.group({
    chacraNombre: [null, [Validators.required]],

    actualizarGeometria: [false, null],
    chacraGeometria: [null, null],

    utilizarAutomatica: [false, null],
    pendienteIngresoManual: [false, null],
    chacraFactorLSGeometriaAsignado: { value: null, disabled: true },
    chacraPendienteAsignado: { value: null, disabled: true },
    chacraLargoAsignado: { value: null, disabled: true },

    padrones: [[], null],
    padronIngresoManual: [false, null],
    padronId: { value: null, disabled: true },
    departamento: { value: null, disabled: true },

    chacraSueloAsignadoId: [null, null],
    sueloIngresoManual: [false, null],
    suelo: { value: null, disabled: true },
    files: { value: null, disabled: true }
  });

  setFormLogic() {
    const chacraGeometria = this.form.get('chacraGeometria');
    const pendienteIngresoManual = this.form.get('pendienteIngresoManual');
    const chacraFactorLSGeometriaAsignado = this.form.get(
      'chacraFactorLSGeometriaAsignado'
    );
    const chacraPendienteAsignado = this.form.get('chacraPendienteAsignado');
    const padronId = this.form.get('padronId');
    const departamento = this.form.get('departamento');
    const suelo = this.form.get('suelo');
    const files = this.form.get('files');
    this.form.get('actualizarGeometria').valueChanges.subscribe(v => {
      if (v) {
        chacraGeometria.enable();
        chacraGeometria.setValidators([Validators.required]);
      } else {
        chacraGeometria.disable();
        chacraGeometria.setValidators(null);
      }
    });
    this.form.get('utilizarAutomatica').valueChanges.subscribe(v => {
      if (!v) {
        pendienteIngresoManual.enable();
        chacraFactorLSGeometriaAsignado.enable();
        chacraPendienteAsignado.enable();
      } else {
        pendienteIngresoManual.disable();
        chacraFactorLSGeometriaAsignado.disable();
        chacraFactorLSGeometriaAsignado.setValidators(null);
        chacraPendienteAsignado.disable();
        chacraPendienteAsignado.setValidators(null);
      }
    });
    this.form.get('pendienteIngresoManual').valueChanges.subscribe(v => {
      if (!v) {
        chacraFactorLSGeometriaAsignado.disable();
        chacraFactorLSGeometriaAsignado.setValidators(null);
        chacraPendienteAsignado.disable();
        chacraPendienteAsignado.setValidators(null);
      } else {
        chacraFactorLSGeometriaAsignado.enable();
        chacraFactorLSGeometriaAsignado.setValidators([Validators.required]);
        chacraPendienteAsignado.enable();
        chacraPendienteAsignado.setValidators([Validators.required]);
      }
    });
    this.form.get('padronIngresoManual').valueChanges.subscribe(v => {
      if (!v) {
        padronId.disable();
        padronId.setValidators(null);
        departamento.disable();
        departamento.setValidators(null);
        this.addPadronEnabled = false;
      } else {
        padronId.enable();
        padronId.setValidators([Validators.required]);
        departamento.enable();
        departamento.setValidators([Validators.required]);
      }
    });
    this.form.get('padronId').valueChanges.subscribe(_ => {
      this.addPadronEnabled = padronId.value;
    });
    this.form.get('sueloIngresoManual').valueChanges.subscribe(v => {
      this.addSueloFilesEnabled = v;
      if (!v) {
        suelo.disable();
        suelo.setValidators(null);
        files.disable();
        files.setValidators(null);
        this.addSueloEnabled = false;
      } else {
        suelo.enable();
        suelo.setValidators([Validators.required]);
        files.enable();
        files.setValidators([Validators.required]);
      }
    });
    this.form.get('suelo').valueChanges.subscribe(_ => {
      this.addSueloEnabled = suelo.value && files.value;
    });
    this.form.get('files').valueChanges.subscribe(_ => {
      this.addSueloEnabled = suelo.value && files.value;
    });
  }

  addPadronEnabled: boolean = false;
  departamentos: DepartamentoCore[] = getDepartamentosCore();
  addSueloEnabled: boolean = false;
  sueloFiles: any;
  addSueloFilesEnabled: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this._polygons = this.formInput.dibujos.filter(
      d => d.dibujoTipo === DibujoCoreType.POLYGON
    );
    this._polylines = this.formInput.dibujos.filter(
      d => d.dibujoTipo === DibujoCoreType.POLYLINE
    );
    this.setFormLogic();
    this.generalSet(); // after geometries split
    this.isUpdate = this.formInput.action === FormActionType.Update;
    this.isUpdate ? this.updateSet() : this.createSet();
    // emit
    this.form.valueChanges.subscribe(_ =>
      this.formValueChanges.emit(this.finalValue())
    );
    this.form.statusChanges.subscribe(v => this.formStatusChanges.emit(v));
  }

  generalSet() {
    if (this._polygons.length === 0) {
      this.form.get('actualizarGeometria').disable();
      this.form.get('chacraGeometria').disable();
      this.form.get('chacraGeometria').setValidators(null);
    }
    if (this._polylines.length === 0) {
      this.form.get('pendienteIngresoManual').disable();
      this.form.get('chacraFactorLSGeometriaAsignado').disable();
      this.form.get('chacraFactorLSGeometriaAsignado').setValidators(null);
      this.form.get('chacraPendienteAsignado').disable();
      this.form.get('chacraPendienteAsignado').setValidators(null);
    }
  }

  createSet() {
    this.form.patchValue({
      actualizarGeometria: true
    });
  }

  updateSet() {
    this.form.patchValue({
      chacraNombre: this.formInput.chacra.chacraNombre,
      utilizarAutomatica:
        this.formInput.chacra.chacraFactorLSGeometriaAsignado ===
        this.formInput.chacra.chacraFactorLSGeometriaLimitante,
      padrones: this.formInput.chacra.padrones.filter(
        p => p.padronFueSeleccionado
      ),
      chacraSueloAsignadoId: this.formInput.chacra.chacraSueloAsignadoId
    });
  }

  finalValue() {
    const value: ChacraCore = {
      ...this.formInput.chacra,
      chacraNombre: this.form.value.chacraNombre,
      padrones: this.form.value.padrones,
      chacraFactorLSEsManual: this.form.value.pendienteIngresoManual
    };
    if (this.form.value.actualizarGeometria) {
      value.chacraGeometria = this.form.value.chacraGeometria;
    }
    if (this.form.value.utilizarAutomatica) {
      value.chacraFactorLSGeometriaAsignado =
        value.chacraFactorLSGeometriaLimitante;
      value.chacraFactorLSEsManual = false;
    } else {
      if (this.form.value.pendienteIngresoManual) {
        value.chacraFactorLSGeometriaAsignado = this.form.value.chacraFactorLAsignado;
        value.chacraPendienteAsignado = this.form.value.chacraPendienteAsignado;
        value.chacraLargoAsignado = this.form.value.chacraLargoAsignado;
        value.chacraFactorLSEsManual = true;
      }
    }
    if (
      this.form.value.chacraSueloAsignadoId !==
      this.formInput.chacra.chacraSueloAsignadoId
    ) {
      const s = this.formInput.suelos.find(
        ss => ss.sueloId === this.form.value.chacraSueloAsignadoId
      );
      if (s) {
        value.chacraSueloAsignadoId = s.sueloId;
        value.chacraSueloAsignadoDsc = s.sueloDesc;
        value.chacraSueloAsignadoFactorK = s.sueloFactorK;
        value.chacraSueloAsignadoSlopeMin = s.sueloSlopeMin;
        value.chacraSueloAsignadoSlopeMax = s.sueloSlopeMax;
        value.chacraSueloAsignadoTolerancia = s.sueloTolerancia;
      }
    }
    return value;
  }

  // padrones

  addPadron() {
    if (
      !this.form.value.padronId ||
      !this.formInput.chacra.padrones.some(
        (p: PadronCore) =>
          p.padronId === this.form.value.padronId &&
          p.departamentoId === this.form.value.departamentoId
      )
    ) {
      return;
    }
    this.formInput.chacra.padrones.push({
      padronId: this.form.value.padronId,
      departamentoId: this.form.value.departamentoId,
      departamentoNombre: this.departamentos.find(
        d => d.id === this.form.value.departamentoId
      ).nombre,
      padronFueSeleccionado: true,
      chacraId: this.formInput.chacra.chacraId
    });
  }

  // suelos

  addSuelo() {
    if (!this.form.value.suelo || !this.form.value.files) {
      return;
    }
    this.formInput.chacra.suelos.push(this.form.value.suelo);
    this.sueloFiles = this.form.value.files;
    this.form.patchValue({
      chacraSueloAsignadoId: this.form.value.suelo.sueloId
    });
  }

  importSueloFiles(event: any) {
    const filename = event.target.value.toLowerCase();
    if (filename.indexOf('.pdf') === -1) {
      return;
    }
    this.form.patchValue({ files: event.target.files });
  }
}
