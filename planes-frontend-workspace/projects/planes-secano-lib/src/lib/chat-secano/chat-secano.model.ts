export interface ChatSecano {
  mensajeId: string;
  mensajeFecha: string;
  personaId: string;
  mensajeContenido: string;
  mensajeLeido: boolean;
  mensajeAdjuntoId: string;
  planId: string;
}

export interface ChatSecanoQueryResults {
  success: boolean;
  error: Error;
  mensajes: ChatSecano[];
}

export function createBaseChatSecano(
  mensajeId: string,
  mensajeFecha: string,
  personaId: string,
  mensajeContenido: string,
  mensajeLeido: boolean,
  mensajeAdjuntoId: string,
  planId: string
): ChatSecano {
  return {
    mensajeId: mensajeId,
    mensajeFecha: mensajeFecha,
    personaId: personaId,
    mensajeContenido: mensajeContenido,
    mensajeLeido: mensajeLeido,
    mensajeAdjuntoId: mensajeAdjuntoId,
    planId: planId
  };
}
