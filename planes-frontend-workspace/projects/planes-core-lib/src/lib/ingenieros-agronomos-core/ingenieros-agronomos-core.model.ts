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
  contacto: ContactoCore,
  personaId?: string
): IngenieroAgronomoCore {
  return {
    ingenieroAgronomoId: id,
    contacto: contacto || createBaseContactoCore(personaId),
    cjppu: `CJPUU ${personaId}`,
    regionalId: '1'
  };
}
