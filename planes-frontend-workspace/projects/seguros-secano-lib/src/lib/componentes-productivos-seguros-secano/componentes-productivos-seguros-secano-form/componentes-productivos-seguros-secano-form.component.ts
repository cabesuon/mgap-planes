import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

import { FormActionType, PlanesCoreFormInput, dateToString } from 'planes-core-lib';
import { CultivoSegurosSecano } from '../../cultivos-seguros-secano/cultivos-seguros-secano.model';
import { CicloSegurosSecano } from '../../ciclos-seguros-secano/ciclos-seguros-secano.model';
import { AseguradoraSegurosSecano } from '../../aseguradoras-seguros-secano/aseguradoras-seguros-secano.model';
import { ComponenteProductivoSegurosSecano, ComponenteContratoSeguroZP } from '../componentes-productivos-seguros-secano.model';
import { UnidadesComponenteValidador } from '../../unidades-manejos-seguros-secano/unidades-manejos-seguros-secano-form/unidades-manejos-seguros-secano-form.component';

export interface ComponentesProductivosSegurosSecanoFormInput {
  action: FormActionType;
  componente: ComponenteProductivoSegurosSecano; 
  cultivos: CultivoSegurosSecano[];
  ciclos: CicloSegurosSecano[];
  aseguradoras: AseguradoraSegurosSecano[];
  contratoSeguroZP: ComponenteContratoSeguroZP;     
}

export const ComponenteSueloValidador: ValidatorFn = (fg: FormGroup): ValidationErrors | null => {  
  let ret = null;
  if (!(fg.parent && (fg.parent.get('analisisSueloPBray') || fg.parent.get('analisisSueloK')))){    
    ret = { analisisSuelo: true };
  } 
  return ret    
};

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
    tipoSeguro: [null],
    contratoSeguroZPId: [null, [Validators.required]],

    superficieSembrada: [null, [Validators.required]],
    superficieCosechada: [null, [Validators.required, UnidadesComponenteValidador]],
    fechaSiembra: [null, [Validators.required]],
    fechaCosecha: [null, [Validators.required]],
    porcentajeRiego: [null],
    fertilizacionP2O5: [null, [Validators.required]],
    fertilizacionK2O: [null, [Validators.required]],
    fertilizacionN: [null, [Validators.required]],
    fertilizacionS: [null, [Validators.required]],
    analisisSueloPBray: [null],
    analisisSueloK: [null],
    rendimiento: [null, [Validators.required]],

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
    this.hoy = dHoy.getFullYear() + '-' + (dHoy.getMonth()+1).toString().padStart(2,"0")  + '-' + dHoy.getDate().toString().padStart(2,"0");    
  }

  ngOnInit(): void {        
    if (this.formInput.action === FormActionType.Update) {
      this.form.patchValue({
        cultivoId: this.formInput.componente.cultivoId,
        cicloId: this.formInput.componente.cicloId,

        cultivoAntecesorId: this.formInput.componente.cultivoAntecesorId,

        aseguradoraId: this.formInput.componente.aseguradoraId,
        polizaId: this.formInput.componente.polizaId,
        tipoSeguro: this.formInput.componente.tipoSeguro,
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
      
      //chacra asegurada
      if (this.formInput.componente.aseguradoraId || this.formInput.componente.polizaId){
        this.onChangeAsegurada({value: "SI"});
      } else {
        this.onChangeAsegurada({value: "NO"});
      }

      //analisis suelo
      if (this.formInput.componente.analisisSueloPBray || this.formInput.componente.analisisSueloK){
        this.onChangeAnalisis({value: "SI"});
      } else {
        this.onChangeAnalisis({value: "NO"});
      }

      if (this.formInput.componente.cultivoId){
        this.onCultivoChange({value:this.formInput.componente.cultivoId});
      }

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
      this.form.get('aseguradoraId').setValidators(Validators.required);            
      this.form.get('polizaId').setValidators(Validators.required);    
      this.form.get('tipoSeguro').setValidators(Validators.required);   
    } else {
      this.chacraAsegurada = false;
      this.form.get('aseguradoraId').clearValidators();
      this.form.get('aseguradoraId').setValue(null);
      this.form.get('aseguradoraId').updateValueAndValidity()
      this.form.get('polizaId').clearValidators();
      this.form.get('polizaId').setValue(null);
      this.form.get('polizaId').updateValueAndValidity();      
      this.form.get('tipoSeguro').clearValidators();
      this.form.get('tipoSeguro').setValue(null);
      this.form.get('tipoSeguro').updateValueAndValidity();      
    }     
  }

  onChangeAnalisis($event){    
    // se agregan los validadores condicionales    
    if($event.value === 'SI') {
      this.analisisSuelo = true;
      this.form.get('analisisSueloPBray').setValidators(ComponenteSueloValidador);
      this.form.get('analisisSueloK').setValidators(ComponenteSueloValidador);
    } else {
      this.analisisSuelo = false;     
      this.form.get('analisisSueloPBray').clearValidators();
      this.form.get('analisisSueloPBray').setValue(null);
      this.form.get('analisisSueloPBray').updateValueAndValidity(); 
      this.form.get('analisisSueloK').clearValidators();
      this.form.get('analisisSueloK').setValue(null);
      this.form.get('analisisSueloK').updateValueAndValidity();  
    }
  }

  onCultivoChange($event){     
    let c = this.formInput.cultivos.find( c => c.cultivoId === $event.value);    
    this.ciclosCultivo = [];
    c.cultivoCicloId.forEach(cicloId => {
      let ciclo = this.formInput.ciclos.find( ci => ci.cicloId === cicloId );
      this.ciclosCultivo.push(ciclo);
    });        
  }
  
}
