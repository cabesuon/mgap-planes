import {
  ContactoCore,
  createBaseContactoCore
} from '../contacto-core/contacto-core.model';

export interface ResponsableCore {
  contacto: ContactoCore;
  empresaId: string;
  emailValidado: boolean;
  celularValidado: boolean;
}

export interface ResponsablesCoreQueryResults {
  success: boolean;
  error: { code: number; description: string };
  responsables: ResponsableCore[];
}

export function createBaseResponsableCore(
  personaId: string,
  label: string,
  empresaId: string
): ResponsableCore {
  return {
    contacto: createBaseContactoCore(personaId, label, empresaId),
    empresaId: empresaId,
    emailValidado: true,
    celularValidado: true
  };
}
