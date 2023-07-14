import { UtenteCommentoDTO } from "../auth/utente-commento-dto.model";
import { VisualizzaRispostaDTO } from "./visualizza-risposta-dto.model";

export interface VisualizzaCommentoDTO {
    id: number;
    testo: string;
    autore: UtenteCommentoDTO;
    risposte: VisualizzaRispostaDTO[];
}