export interface PeriodoSecano {
  rotacionId: string;
  componenteId: string;
  periodoId: string;
  periodoNumero: number;
  periodoMesInicial: number;
  periodoMesFinal: number;
  periodoEI30: number;
  periodoRPS: number;
  periodoERP: number;
  periodoC: number;
  periodoA: number;
  rspPeriodo: number;
}

export function createBasePeriodoSecano(
  rotacionId: string,
  componenteId: string,
  periodoId: string
): PeriodoSecano {
  return {
    rotacionId,
    componenteId,
    periodoId,
    periodoNumero: Number(periodoId),
    periodoMesInicial: 0,
    periodoMesFinal: 0,
    periodoEI30: 0,
    periodoRPS: 0,
    periodoERP: 0,
    periodoC: 0,
    periodoA: 0,
    rspPeriodo: 0
  };
}
