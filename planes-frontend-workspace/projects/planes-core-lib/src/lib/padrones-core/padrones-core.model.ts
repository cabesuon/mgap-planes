export enum PadronCoreDepartamento {
  'Artigas' = 1,
  'Canelones' = 2,
  'Cerro Largo' = 3,
  'Colonia' = 4,
  'Durazno' = 5,
  'Flores' = 6,
  'Florida' = 7,
  'Lavalleja' = 8,
  'Maldonado' = 9,
  'Montevideo' = 10,
  'Paysandu' = 11,
  'Rio Negro' = 12,
  'Rivera' = 13,
  'Rocha' = 14,
  'Salto' = 15,
  'San Jose' = 16,
  'Soriano' = 17,
  'Tacuarembo' = 18,
  'Treinta y Tres' = 19
}

export interface PadronCore {
  padronId: string;
  departamentoId: string;
  departamentoNombre: string;
  padronFueSeleccionado: boolean;
  padronArea?: number;
  chacraId?: string;
}

export interface PadronesCoreQueryResults {
  success: boolean;
  error: { code: number; description: string };
  padrones: PadronCore[];
}

export interface DepartamentoCore {
  nombre: string;
  id: string;
}

export function getDepartamentosCore(): DepartamentoCore[] {
  const d = [];
  for (const p in PadronCoreDepartamento) {
    d.push({ id: p, nombre: PadronCoreDepartamento[p] });
  }
  return d;
}
