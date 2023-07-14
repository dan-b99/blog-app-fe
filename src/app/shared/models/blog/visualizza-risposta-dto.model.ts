import { UtenteCommentoDTO } from "../auth/utente-commento-dto.model";

export interface VisualizzaRispostaDTO {
    id: number,
    testo: string,
    utente: UtenteCommentoDTO
}