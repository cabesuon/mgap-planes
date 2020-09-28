export interface ContactoCore {
  personaId: string;
  email: string;
  telefono: string;
  celular: string;
  domicilio: string;
  ciudad: string;
  departamentoId: string;
}

export function createBaseContactoCore(personaId: string): ContactoCore {
  return {
    personaId: personaId,
    email: `Email ${personaId}`,
    telefono: `Tel ${personaId}`,
    celular: `Cel ${personaId}`,
    domicilio: `Domicilio ${personaId}`,
    ciudad: `Ciudad ${personaId}`,
    departamentoId: '1'
  };
}
