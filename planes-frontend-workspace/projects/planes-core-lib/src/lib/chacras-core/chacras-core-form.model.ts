import { AbstractControl } from '@angular/forms';
import { FormActionType } from '../extras/extras-form';
import { ChacraCore } from './chacras-core.model';
import { DibujoCore } from '../dibujos-core/dibujos-core.model';
import { SueloCore } from '../suelos-core/suelos-core.model';
import { PadronCore } from '../padrones-core/padrones-core.model';

export interface ChacrasCoreFormInput {
  action: FormActionType;
  chacra: ChacraCore;
  dibujos: DibujoCore[];
  suelos: SueloCore[];
}

export function ValidatePadrones(control: AbstractControl) {
  if (
    control.value &&
    (control.value as PadronCore[]).find(p => p.padronFueSeleccionado === true)
  ) {
    return { padrones: true };
  }
  return null;
}
