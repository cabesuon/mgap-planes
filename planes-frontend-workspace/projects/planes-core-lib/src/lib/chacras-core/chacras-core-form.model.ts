import { FormActionType } from '../extras/extras-form';
import { ChacraCore } from './chacras-core.model';
import { DibujoCore } from '../dibujos-core/dibujos-core.model';

export interface ChacrasCoreFormInput {
  action: FormActionType;
  chacra: ChacraCore;
  dibujos: DibujoCore[];
}
