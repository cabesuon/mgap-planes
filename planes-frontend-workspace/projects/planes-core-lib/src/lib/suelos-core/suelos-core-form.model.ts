import { SueloCore } from '../suelos-core/suelos-core.model';

export interface SuelosCoreFormInput {
  suelos: SueloCore[];
}

export interface SuelosCoreFormOutput {
  suelo: SueloCore;
  files: FileList;
}
