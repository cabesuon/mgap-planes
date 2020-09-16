export enum PadronCoreDepartamento {
  ARTIGAS = 'Artigas',
  CANELONES = 'Canelones',
  CERROLARGO = 'Cerro Largo',
  COLONIA = 'Colonia',
  DURAZNO = 'Durazno',
  FLORES = 'Flores',
  FLORIDA = 'Florida',
  LAVALLEJA = 'Lavalleja',
  MALDONADO = 'Maldonado',
  MONTEVIDEO = 'Montevideo',
  PAYSANDU = 'Paysandu',
  RIONEGRO = 'Rio Negro',
  RIVERA = 'Rivera',
  ROCHA = 'Rocha',
  SALTO = 'Salto',
  SANJOSE = 'San Jose',
  SORIANO = 'Soriano',
  TACUAREMBO = 'Tacuarembo',
  TREINTAYTRES = 'Treinta y Tres'
}

export interface PadronCore {
  padronId: string;
  padronCodigoDepartamento: string;
  padrondDepartamento: string;
  padronAreaHa: number;
}
