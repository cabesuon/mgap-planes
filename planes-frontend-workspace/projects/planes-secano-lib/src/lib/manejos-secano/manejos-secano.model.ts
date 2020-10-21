export interface ManejoSecano {
  manejoId: string;
  manejoNombre: string;
}

export interface ManejosSecanoQueryResults {
  success: boolean;
  error: Error;
  manejos: ManejoSecano[];
}

export function createBaseManejoSecano(manejoId: string): ManejoSecano {
  return {
    manejoId,
    manejoNombre: `Manejo ${manejoId}`
  };
}
