import { UtenteCommentoDTO } from "../auth/utente-commento-dto.model";
import { VisualizzaCommentoDTO } from "./visualizza-commento-dto.model";

export interface VisualizzaRispostaDTO {
    id: number,
    testo: string,
    autore: UtenteCommentoDTO;
}