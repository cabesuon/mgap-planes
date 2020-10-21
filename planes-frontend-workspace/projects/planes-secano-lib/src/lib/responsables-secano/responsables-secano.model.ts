import { ContactoCore, createBaseContactoCore } from 'planes-core-lib';

export interface ResponsableSecano {
  contacto: ContactoCore;
  empresaId: string;
  emailValidado: boolean;
  celularValidado: boolean;
}

export interface ResponsablesSecanoQueryResults {
  success: boolean;
  error: { code: number; description: string };
  responsables: ResponsableSecano[];
}

export function createBaseResponsableSecano(
  empresaId: string,
  contacto: ContactoCore
): ResponsableSecano {
  return {
    contacto,
    empresaId,
    emailValidado: true,
    celularValidado: true
  };
}
