import { FormActionType, DibujoCore, SueloCore } from 'planes-core-lib';
import { ChacraSecano } from './chacras-secano.model';

export interface ChacrasSecanoFormInput {
  action: FormActionType;
  chacra: ChacraSecano;
  dibujos: DibujoCore[];
  suelos: SueloCore[];
}
