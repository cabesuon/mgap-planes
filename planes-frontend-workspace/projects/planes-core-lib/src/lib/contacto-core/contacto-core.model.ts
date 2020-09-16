export interface ContactoCore {
  personaId: string;
  email: string;
  telefono: string;
  celular: string;
  domicilio: string;
  ciudad: string;
  departamentoId: string;
}

export function createBaseContactoCore(
  personaId: string,
  label: string,
  id: string
): ContactoCore {
  return {
    personaId: personaId,
    email: `Email ${label} ${id}`,
    telefono: `Tel ${label} ${id}`,
    celular: `Cel ${label} ${id}`,
    domicilio: `Domicilio ${label} ${id}`,
    ciudad: `Ciudad ${label} ${id}`,
    departamentoId: id
  };
}
