import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

import { EmpresaCore, FormActionType, PlanesCoreFormInput } from 'planes-core-lib';
import { CultivoSegurosSecano } from '../../cultivos-seguros-secano/cultivos-seguros-secano.model';
import { CicloSegurosSecano } from '../../ciclos-seguros-secano/ciclos-seguros-secano.model';

import { UnidadManejoSegurosSecano } from '../unidades-manejos-seguros-secano.model';
import { AseguradoraSegurosSecano } from '../../aseguradoras-seguros-secano/aseguradoras-seguros-secano.model';

export interface UnidadesManejosSegurosSecanoFormInput {
  action: FormActionType;
  unidad: UnidadManejoSegurosSecano;
  cultivos: CultivoSegurosSecano[]; 
  ciclos: CicloSegurosSecano[];
  empresas: EmpresaCore[];
  aseguradoras: AseguradoraSegurosSecano[];
}

export const UnidadesComponenteValidador: ValidatorFn = (fg: FormGroup): ValidationErrors | null => {  
  if (fg.parent && fg.parent.get('superficieSembrada') && fg.value){
    const sS = fg.parent.get('superficieSembrada').value;
    const sC = fg.value;
    return sS !== null && sC !== null && sS <= sC
    ? null
    : { superficieCosechada: true };
  } else {
    return null
  }
  
};

@Component({
  selector: 'lib-unidades-manejos-seguros-secano-form',
  templateUrl: './unidades-manejos-seguros-secano-form.component.html',
  styleUrls: ['./unidades-manejos-seguros-secano-form.component.css']
})
export class UnidadesManejosSegurosSecanoFormComponent implements OnInit {
  @Input() formInput: UnidadesManejosSegurosSecanoFormInput = null;
  @Output() formStatusChanges = new EventEmitter<string>();
  @Output() formValueChanges = new EventEmitter<UnidadManejoSegurosSecano>();

  form = this.fb.group({
    unidadNombre: [null, [Validators.required]],
    empresaId: [null, [Validators.required]],
    cultivoId: [null],
    cicloId: [null],

    cultivoAntecesorId: [null],

    aseguradoraId: [null],
    polizaId: [null],
    contratoSeguroZPId: [null],

    superficieSembrada: [null],
    superficieCosechada: [null, [UnidadesComponenteValidador]],
    fechaSiembra: [null],
    fechaCosecha: [null],
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
  analisisSuelo: boolean;
  ciclosCultivo;
  hoy: String;

  constructor(private fb: FormBuilder) {
    let dHoy = new Date();
    this.hoy = dHoy.getFullYear() + '-' + dHoy.getMonth()+1  + '-' + dHoy.getDate();
  }

  ngOnInit(): void {
    if (this.formInput.action === FormActionType.Update) {
      this.form.patchValue({                
        unidadNombre: this.formInput.unidad.unidadNombre,
        empresaId: this.formInput.unidad.empresaId,
        cultivoId: this.formInput.unidad.cultivoId,
        cicloId: this.formInput.unidad.cicloId,

        cultivoAntecesorId: this.formInput.unidad.cultivoAntecesorId,

        aseguradoraId: this.formInput.unidad.aseguradoraId,
        polizaId: this.formInput.unidad.polizaId,
        contratoSeguroZPId: this.formInput.unidad.contratoSeguroZPId,

        superficieSembrada: this.formInput.unidad.superficieSembrada,
        superficieCosechada: this.formInput.unidad.superficieCosechada,
        fechaSiembra: this.formInput.unidad.fechaSiembra,
        fechaCosecha: this.formInput.unidad.fechaCosecha,
        fertilizacionP2O5: this.formInput.unidad.fertilizacionP2O5,
        fertilizacionK2O: this.formInput.unidad.fertilizacionK2O,
        fertilizacionN: this.formInput.unidad.fertilizacionN,
        fertilizacionS: this.formInput.unidad.fertilizacionS,
        analisisSueloPBray: this.formInput.unidad.analisisSueloPBray,
        analisisSueloK: this.formInput.unidad.analisisSueloK,
        rendimiento: this.formInput.unidad.rendimiento,

        zafra: this.formInput.unidad.zafra,
        anio: this.formInput.unidad.anio
      });

      //chacra asegurada
      if (this.formInput.unidad.aseguradoraId || this.formInput.unidad.polizaId){
        this.onChangeAsegurada({value: "SI"});
      } else {
        this.onChangeAsegurada({value: "NO"});
      }
      //analisis suelo
      if (this.formInput.unidad.analisisSueloPBray || this.formInput.unidad.analisisSueloK){
        this.onChangeAnalisis({value: "SI"});
      } else {
        this.onChangeAnalisis({value: "NO"});
      }
      if (this.formInput.unidad.cultivoId){
        this.onCultivoChange({value:this.formInput.unidad.cultivoId});
      }
    };
    this.form.patchValue({
      empresaId: this.formInput.empresas[0].empresaId
    });
    this.form.valueChanges.subscribe(_ =>
      this.formValueChanges.emit({
        ...this.formInput.unidad,
        ...this.form.value
      })
    );
    this.form.statusChanges.subscribe(v => this.formStatusChanges.emit(v));
  }

  onCultivoChange($event){     
    let c = this.formInput.cultivos.find( c => c.cultivoId === $event.value);    
    this.ciclosCultivo = [];
    c.cultivoCicloId.forEach(cicloId => {
      let ciclo = this.formInput.ciclos.find( ci => ci.cicloId === cicloId );
      this.ciclosCultivo.push(ciclo);
    });        
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

  onChangeAnalisis($event){    
    // se agregan los validadores condicionales    
    if($event.value === 'SI') {
      this.analisisSuelo = true;      
    } else {
      this.analisisSuelo = false;      
    }
  }
}
