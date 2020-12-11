import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { FormActionType, PlanesCoreFormInput, dateToString } from 'planes-core-lib';
import { CultivoSegurosSecano } from '../../cultivos-seguros-secano/cultivos-seguros-secano.model';
import { CicloSegurosSecano } from '../../ciclos-seguros-secano/ciclos-seguros-secano.model';
import { AseguradoraSegurosSecano } from '../../aseguradoras-seguros-secano/aseguradoras-seguros-secano.model';
import { ComponenteProductivoSegurosSecano, ComponenteContratoSeguroZP } from '../componentes-productivos-seguros-secano.model';

export interface ComponentesProductivosSegurosSecanoFormInput {
  action: FormActionType;
  componente: ComponenteProductivoSegurosSecano;
  cultivos: CultivoSegurosSecano[];
  ciclos: CicloSegurosSecano[];
  aseguradoras: AseguradoraSegurosSecano[];
  contratoSeguroZP: ComponenteContratoSeguroZP;     
}

@Component({
  selector: 'lib-componentes-productivos-seguros-secano-form',
  templateUrl: './componentes-productivos-seguros-secano-form.component.html',
  styleUrls: ['./componentes-productivos-seguros-secano-form.component.css']
})
export class ComponentesProductivosSegurosSecanoFormComponent
  implements OnInit {
  @Input() formInput: ComponentesProductivosSegurosSecanoFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<
    ComponenteProductivoSegurosSecano
  >();

  form = this.fb.group({
    cultivoId: [null, [Validators.required]],
    cicloId: [null, [Validators.required]],

    cultivoAntecesorId: [null],

    aseguradoraId: [null],
    polizaId: [null],
    contratoSeguroZPId: [null],

    superficieSembrada: [null],
    superficieCosechada: [null],
    fechaSiembra: [null],
    fechaCosecha: [null],
    porcentajeRiego: [null],
    fertilizacionP2O5: [null],
    fertilizacionK2O: [null],
    fertilizacionN: [null],
    fertilizacionS: [null],
    analisisSueloPBray: [null],
    analisisSueloK: [null],
    rendimiento: [null],

    zafra: [null],
    anio: [null]
  });

  planesCoreFormInput: PlanesCoreFormInput = null;
  chacraAsegurada: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {    
    if (this.formInput.action === FormActionType.Update) {
      this.form.patchValue({
        cultivoId: this.formInput.componente.cultivoId,
        cicloId: this.formInput.componente.cicloId,

        cultivoAntecesorId: this.formInput.componente.cultivoAntecesorId,

        aseguradoraId: this.formInput.componente.aseguradoraId,
        polizaId: this.formInput.componente.polizaId,
        contratoSeguroZPId: this.formInput.componente.contratoSeguroZPId,

        superficieSembrada: this.formInput.componente.superficieSembrada,
        superficieCosechada: this.formInput.componente.superficieCosechada,
        fechaSiembra: this.formInput.componente.fechaSiembra,
        fechaCosecha: this.formInput.componente.fechaCosecha,
        porcentajeRiego: this.formInput.componente.porcentajeRiego,
        fertilizacionP2O5: this.formInput.componente.fertilizacionP2O5,
        fertilizacionK2O: this.formInput.componente.fertilizacionK2O,
        fertilizacionN: this.formInput.componente.fertilizacionN,
        fertilizacionS: this.formInput.componente.fertilizacionS,
        analisisSueloPBray: this.formInput.componente.analisisSueloPBray,
        analisisSueloK: this.formInput.componente.analisisSueloK,
        rendimiento: this.formInput.componente.rendimiento,

        zafra: this.formInput.componente.zafra,
        anio: this.formInput.componente.anio
      });
    }
    this.form.valueChanges.subscribe(_ =>
      this.formValueChanges.emit({
        ...this.formInput.componente,
        ...this.form.value
      })
    );
    this.form.statusChanges.subscribe(v => this.formStatusChanges.emit(v));
  }

  onChangeAsegurada($event){    
    // se agregan los validadores condicionales    
    if($event.value === 'SI') {
      this.chacraAsegurada = true;
      /*this.form.get('numGestion').setValidators(Validators.required);      
      this.form.get('numLote').clearValidators();
      this.form.get('numLote').setValue(null);
      this.form.get('numLote').updateValueAndValidity()*/
    } else {
      this.chacraAsegurada = false;
      /*this.form.get('numGestion').clearValidators();
      this.form.get('numGestion').setValue(null);
      this.form.get('numGestion').updateValueAndValidity()*/
      /*this.form.get('anioGestion').clearValidators();
      this.form.get('anioGestion').setValue(null);
      this.form.get('anioGestion').updateValueAndValidity()*/
      //this.form.get('numLote').setValidators(Validators.required);
    }
  }
  
}
