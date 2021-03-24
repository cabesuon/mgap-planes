import { FormActionType } from '../extras/extras-form';
import { DibujoCore } from '../dibujos-core/dibujos-core.model';
import { ZonaExclusionCore } from './zonas-exclusion-core.model';

export interface ZonasExclusionCoreFormInput {
  action: FormActionType;
  zona: ZonaExclusionCore;
  polygons: DibujoCore[];
}
