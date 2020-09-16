import {
  ContactoCore,
  createBaseContactoCore
} from '../contacto-core/contacto-core.model';

export const ingenieroAgronomolabel: string = 'Ing.Agr.';

export interface IngenieroAgronomoCore {
  ingenieroAgronomoId: string;
  contacto: ContactoCore;
  cjppu: string;
  regionalId: string;
}

export interface IngenierosAgronomosCoreQueryResults {
  success: boolean;
  error: { code: number; description: string };
  ingenierosAgronomos: IngenieroAgronomoCore[];
}

export function createBaseIngenieroAgronomoCore(
  id: string,
  personaId: string
): IngenieroAgronomoCore {
  return {
    ingenieroAgronomoId: id,
    contacto: createBaseContactoCore(personaId, ingenieroAgronomolabel, id),
    cjppu: `CJPUU ${ingenieroAgronomolabel} ${id}`,
    regionalId: id
  };
}
