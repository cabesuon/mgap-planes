import { randomDate, dateToString } from '../extras/extras-date';

export interface PersonaCore {
  personaId: string;
  personaCedula: string;
  personaNombre: string;
  personaPrimerApellido: string;
  personaSegundoApellido: string;
  personaFechaDeNacimiento: string;
  // for testing
  personaToken?: string;
}

export function namePersonaCore(personaCore: PersonaCore): string {
  return `${personaCore.personaPrimerApellido} ${personaCore.personaNombre}`;
}

export interface PersonasCoreQueryResults {
  success: boolean;
  error: { code: number; description: string };
  personas: PersonaCore[];
}

export function createBasePersonaCore(id: string): PersonaCore {
  return {
    personaId: id,
    personaCedula: id,
    personaNombre: `Nombre ${id}`,
    personaPrimerApellido: `Primer Apellido ${id}`,
    personaSegundoApellido: `Segundo Apellido ${id}`,
    personaFechaDeNacimiento: dateToString(
      randomDate(new Date(1940, 1, 1), new Date(1990, 1, 1))
    )
  };
}
